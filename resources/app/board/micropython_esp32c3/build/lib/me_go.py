"""
ME GO -Onboard resources

MicroPython library for the ME GO (Smart Car base for MixGo ME)
=======================================================

#Preliminary composition                       20220625

dahanzimin From the Mixly Team
"""

import time,gc,math
from machine import Pin,SoftI2C,ADC

'''i2c-onboard'''
i2c=SoftI2C(scl = Pin(7), sda = Pin(6), freq = 400000)

'''TM1931-Expand'''    
try :
    from tm1931 import TM1931
except Exception as e:
    print(e)

class CAR(TM1931):
    '''Infrared line patrol obstacle avoidance mode'''
    CL=0                    #Turn off infrared to reduce power consumption
    OA=1                    #Obstacle avoidance mode only
    LP=2                    #Line patrol mode only
    AS=3                    #Automatic mode switching

    '''TM1931 port corresponding function definition'''
    OAOU=5                            #obstacle avoidance  
    LPOU=4                            #Line patrol control
    CCOU=3                            #Extended control
    WLED=12                            #Headlamp port
    GLED=[17,8,6,15]                #Green LED port
    RLED=[16,7,9,18]                #Red LED port
    UCOU=[1,2]                        #Typec external port
    MOTO=[[13,14],[10,11],[1,2]]    #Motor port

    def __init__(self, i2c_bus):
        super().__init__(i2c_bus)
        self._mode=self.CL
        
        self.adc0 = ADC(Pin(0))
        self.adc1 = ADC(Pin(1))
        self.adc2 = ADC(Pin(2))
        self.adc3 = ADC(Pin(3))
        
        self.adc0.atten(ADC.ATTN_11DB)
        self.adc1.atten(ADC.ATTN_11DB)
        self.adc2.atten(ADC.ATTN_11DB)
        self.adc3.atten(ADC.ATTN_11DB)        
        
    def ir_mode(self,select=0):
        '''Infrared line patrol obstacle avoidance mode'''
        self._mode=select
        if select==self.CL:
            self.pwm(self.OAOU,0)
            self.pwm(self.LPOU,0)
        if select==self.OA:
            self.pwm(self.OAOU,255)
            self.pwm(self.LPOU,0)
        if select==self.LP:
            self.pwm(self.OAOU,0)
            self.pwm(self.LPOU,255)
        time.sleep_ms(2)
            
    def obstacle(self):
        '''Read the obstacle avoidance sensor'''
        if self._mode==self.AS:
            self.pwm(self.OAOU,255)
            self.pwm(self.LPOU,0)
            time.sleep_ms(2)
        if self._mode==self.OA or self._mode==self.AS :
            return self.adc2.read(),self.adc1.read(),self.adc0.read(),self.adc3.read()
        else:
            raise ValueError('In line patrol mode, obstacle avoidance data cannot be read')

    def patrol(self):
        '''Read the line patrol sensor'''
        if self._mode==self.AS:
            self.pwm(self.OAOU,0)
            self.pwm(self.LPOU,255)
            time.sleep_ms(2)
        if self._mode==self.LP or self._mode==self.AS:
            return self.adc3.read(),self.adc2.read(),self.adc1.read(),self.adc0.read()    
        else:
            raise ValueError('In obstacle avoidance mode, line patrol data cannot be read')

    def motor(self,index,action,speed=0):
        if action=="N":
            self.pwm(index[0],255)
            self.pwm(index[1],255)
        elif action=="P":
            self.pwm(index[0],0)
            self.pwm(index[1],0)
        elif action=="CW":
            self.pwm(index[0],speed*255//100)
            self.pwm(index[1],0)
        elif action=="CCW":
            self.pwm(index[0],0)
            self.pwm(index[1],speed*255//100)
        else:
            raise ValueError('Invalid input, valid are "N","P","CW","CCW"')
            
    def move(self,action,speed):
        if action=="N":
            self.motor(self.MOTO[0],"N")
            self.motor(self.MOTO[1],"N")
        elif action=="P":
            self.motor(self.MOTO[0],"P")
            self.motor(self.MOTO[1],"P")
        elif action=="F":
            self.motor(self.MOTO[0],"CCW",speed)
            self.motor(self.MOTO[1],"CW",speed)
        elif action=="B":
            self.motor(self.MOTO[0],"CW",speed)
            self.motor(self.MOTO[1],"CCW",speed)
        elif action=="L":
            self.motor(self.MOTO[0],"CW",speed)
            self.motor(self.MOTO[1],"CW",speed)
        elif action=="R":
            self.motor(self.MOTO[0],"CCW",speed)
            self.motor(self.MOTO[1],"CCW",speed)
        else:
            raise ValueError('Invalid input, valid are "N","P","F","B","L","R"')    

    def setbrightness(self,index,val):
        if not 0 <= val <= 100:
            raise ValueError("Brightness must be in the range: 0-100%")
        self.pwm(index,val)
        
    def getrightness(self,index):
        return self.duty(index)

    def setonoff(self,index,val):
        if(val == -1):
            if self.getrightness(index) < 50:
                self.setbrightness(index,100)
            else:
                self.setbrightness(index,0)
        elif(val == 1):
            self.setbrightness(index,100)
        elif(val == 0):
            self.setbrightness(index,0)
            
    def getonoff(self,index):
        return True if self.getrightness(index)>0 else False

car=CAR(i2c) #Including LED,motor,patrol,obstacle

'''2Hall_HEP'''
class HALL:
    def __init__(self, pin):
        self._pin = Pin(pin, Pin.IN)
        self._pulse = 0
        self.turns = 0
        self.distance=0
        
    def _receive_cb(self, event_source):
            if self._on_receive:
                self._pulse+=1
                self.turns=round(self._pulse/400,2)
                self.distance=round(self._pulse/400*math.pi*4.4,2)
                self._on_receive(self.turns,self.distance)
    
    def irq_cb(self, callback):
        self._on_receive = callback
        if callback:
            self.irq(handler=self._receive_cb)
        
    def irq(self, handler, trigger=(Pin.IRQ_RISING | Pin.IRQ_FALLING)):
        self._pin.irq(handler = handler, trigger = trigger)
        
hall_A = HALL(20)
hall_B = HALL(21)

'''Reclaim memory'''
gc.collect()