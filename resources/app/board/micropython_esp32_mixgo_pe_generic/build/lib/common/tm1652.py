"""
TM1652-framebuf

Micropython library for the TM1652 Matrix8x5
=======================================================

#Preliminary composition            20220614
#单次发两遍数据，考虑使用UART       20220619

dahanzimin From the Mixly Team
"""

import time
import framebuf
from machine import Pin
from micropython import const

_TM1652_REG_ADD      = const(0x08)      #Display address command
_TM1652_REG_CMD      = const(0x18)      #Display control command
_TM1652_SET_CUR      = const(0x08)      #LED current setting 2/8 

class TM1652(framebuf.FrameBuffer):
    def __init__(self, pin, brightness=0.5):
        self.pin=Pin(pin,Pin.OUT)
        self.pin.on()   
        self._buffer = bytearray(5) 
        super().__init__(self._buffer, 8, 5, framebuf.MONO_HMSB)    
        
        self.brightness = brightness
        self._brightness = None
        self.set_brightness(brightness)
        time.sleep_ms(5)
        
    def _write_cmd(self, val):
        '''Serial write command'''
        falg=0
        #起始位
        self.pin.off()      
        time.sleep_us(45)
        #数据位        
        for i in range(8):      
            if (val >> i) & 0x01:
                self.pin.on()
                falg+=1
            else:
                self.pin.off()
            time.sleep_us(45)
        #校验位
        self.pin.on() if  falg%2==0  else self.pin.off()
        time.sleep_us(45)
        #停止位
        self.pin.on()           
        time.sleep_us(45)
            
    def get_brightness(self):
        return self.brightness

    def set_brightness(self, brightness):
        if not 0.0 <= brightness <= 1.0:
            raise ValueError("Brightness must be a decimal number in the range: 0.0-1.0")
        self.brightness = brightness
        xbright = round(15 * brightness) 
        xbright = ((xbright & 0xA) >>1) | ((xbright & 0x5) <<1)
        xbright = ((xbright & 0xC) >>2) | ((xbright & 0x3) <<2)
        self._brightness = (xbright << 4) | _TM1652_SET_CUR     #高四位倒序|驱动电流

    def show(self):
        """Refresh the display and show the changes."""
        for _ in range(2):
            self._write_cmd(_TM1652_REG_ADD)
            for i in range(5):
                self._write_cmd(self._buffer[i])
            time.sleep_ms(2)
            self._write_cmd(_TM1652_REG_CMD)
            self._write_cmd(self._brightness)
            time.sleep_ms(2)
        
    def set_buffer(self, buffer):
        for i in range(min(len(buffer),len(self._buffer))):
            self._buffer[i] = self._buffer[i] | buffer[i]

    def get_buffer(self):
        return self._buffer 
