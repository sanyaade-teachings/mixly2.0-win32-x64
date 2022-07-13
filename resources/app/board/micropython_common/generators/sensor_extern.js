'use strict';

goog.provide('Blockly.Python.sensor');

goog.require('Blockly.Python');

Blockly.Python.sensor_mixgo_extern_button_is_pressed = function(){
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var dropdown_stat = Blockly.Python.valueToCode(this, 'STAT', Blockly.Python.ORDER_ATOMIC);
    var code =  'mixgo.Button('+pin + ').is_pressed(' + dropdown_stat + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.sensor_mixgo_extern_button_was_pressed = function(){
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var dropdown_stat = Blockly.Python.valueToCode(this, 'STAT', Blockly.Python.ORDER_ATOMIC);
    var code =  'mixgo.Button('+pin + ').was_pressed(' + dropdown_stat + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mixgo_extern_button_get_presses = function(){
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var argument = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
    var code =  'mixgo.Button('+pin + ').get_presses(' + argument + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mixgo_extern_button_attachInterrupt = function () {
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    var atta = Blockly.Python.valueToCode(this, 'DO', Blockly.Python.ORDER_ATOMIC);
    var code = 'mixgo.Button('+pin + ').irq' + '(handler = ' + atta + ', trigger = ' + dropdown_mode + ')\n'
    return code;
};

Blockly.Python.sensor_mixgo_pin_pressed = function(){
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var pin = Blockly.Python.valueToCode(this, 'button', Blockly.Python.ORDER_ATOMIC);
    var code = 'mixgo.'+pin+'.is_touched()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mpu9250_attachGestureInterrupt = function(){
    Blockly.Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var gesture = this.getFieldValue('gesture');
    var branch = Blockly.Python.statementToCode(this, 'DO');
    var d=branch || Blockly.Python.PASS;
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    if (v == "mpu")
        Blockly.Python.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';
    var code = 'if '+v+'.mpu9250_is_gesture("' + gesture + '"):\n' + d;
    return code;
}




Blockly.Python.sensor_distance_hrsc04= function(){
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    Blockly.Python.setups_['class_hrsc04'] =
    'class HCSR04:\n'+
    '    def __init__(self, tpin=pin15, epin=pin14, spin=pin13):\n'+
    '        self.trigger_pin = tpin\n'+
    '        self.echo_pin = epin\n'+
    '        self.sclk_pin = spin\n'+
    '\n'+
    '    def distance_mm(self):\n'+
    '        spi.init(baudrate=125000, sclk=self.sclk_pin,\n'+
    '                 mosi=self.trigger_pin, miso=self.echo_pin)\n'+
    '        pre = 0\n'+
    '        post = 0\n'+
    '        k = -1\n'+
    '        length = 500\n'+
    '        resp = bytearray(length)\n'+
    '        resp[0] = 0xFF\n'+
    '        spi.write_readinto(resp, resp)\n'+
    '        # find first non zero value\n'+
    '        try:\n'+
    '            i, value = next((ind, v) for ind, v in enumerate(resp) if v)\n'+
    '        except StopIteration:\n'+
    '            i = -1\n'+
    '        if i > 0:\n'+
    '            pre = bin(value).count("1")\n'+
    '            # find first non full high value afterwards\n'+
    '            try:\n'+
    '                k, value = next((ind, v)\n'+
    '                                for ind, v in enumerate(resp[i:length - 2]) if resp[i + ind + 1] == 0)\n'+
    '                post = bin(value).count("1") if k else 0\n'+
    '                k = k + i\n'+
    '            except StopIteration:\n'+
    '                i = -1\n'+
    '        dist= -1 if i < 0 else round((pre + (k - i) * 8. + post) * 8 * 0.172)\n'+
    '        return dist\n'+
    '\n'+
    'sonar=HCSR04()\n'
    return ['sonar.distance_mm()/10.0', Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.RTC_get_time = function () {
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  if (v == "rtc")
    Blockly.Python.definitions_['import_mixgo_rtc'] = 'from mixgo import rtc';  
  var code = v+'.datetime()';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.RTC_set_time = function () {
  Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
  var hour = Blockly.Python.valueToCode(this, "hour", Blockly.Python.ORDER_ASSIGNMENT);
  var minute = Blockly.Python.valueToCode(this, "minute", Blockly.Python.ORDER_ASSIGNMENT);
  var second = Blockly.Python.valueToCode(this, "second", Blockly.Python.ORDER_ASSIGNMENT);
  Blockly.Python.setups_['class_DS1307'] = Blockly.Python.CLASS_DS1307_INIT;
  var code ='str(ds.Hour('+hour+'))+ str(ds.Minute('+minute+')) +str(ds.Second('+second+'))\n';
  return code;
};

Blockly.Python.RTC_set_date = function () {
  Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
  var year = Blockly.Python.valueToCode(this, "year", Blockly.Python.ORDER_ASSIGNMENT);
  var month = Blockly.Python.valueToCode(this, "month",Blockly.Python.ORDER_ASSIGNMENT);
  var day = Blockly.Python.valueToCode(this, "day",Blockly.Python.ORDER_ASSIGNMENT);
  Blockly.Python.setups_['class_DS1307'] = Blockly.Python.CLASS_DS1307_INIT;
  var code ='str(ds.Year('+year+'))+ str(ds.Month('+month+')) +str(ds.Day('+day+'))\n';
  return code;
};



Blockly.Python.sensor_mixgo_extern_light= function(){
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var code = 'mixgo.get_brightness(' + pin + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mixgo_extern_sound= function(){
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var code = 'mixgo.get_soundlevel(' + pin + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.sensor_mixgo_extern_pin_near = function(){
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var direction = this.getFieldValue('direction');
    var code = 'mixgo.'+'infrared_'+ direction +'.near()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.RTC_set_datetime= function () {
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  var year = Blockly.Python.valueToCode(this, "year", Blockly.Python.ORDER_ASSIGNMENT);
  var month = Blockly.Python.valueToCode(this, "month",Blockly.Python.ORDER_ASSIGNMENT);
  var day = Blockly.Python.valueToCode(this, "day",Blockly.Python.ORDER_ASSIGNMENT);
  var hour = Blockly.Python.valueToCode(this, "hour", Blockly.Python.ORDER_ASSIGNMENT);
  var minute = Blockly.Python.valueToCode(this, "minute",Blockly.Python.ORDER_ASSIGNMENT);
  var second = Blockly.Python.valueToCode(this, "second",Blockly.Python.ORDER_ASSIGNMENT);
  var week = Blockly.Python.valueToCode(this, "weekday", Blockly.Python.ORDER_ASSIGNMENT);
  var millisecond = Blockly.Python.valueToCode(this, "millisecond",Blockly.Python.ORDER_ASSIGNMENT);
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  if (v == "rtc")
    Blockly.Python.definitions_['import_mixgo_rtc'] = 'from mixgo import rtc';  
  var code = v+'.datetime(('+year+','+month+','+day+','+week+','+hour+','+minute+','+second+','+millisecond+'))\n';
  return code;
};

Blockly.Python.sensor_rtc_init=function(){
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var code = v + ' = machine.RTC()\n';
    return code;
};

Blockly.Python.sensor_use_i2c_init=function(){
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var iv = Blockly.Python.valueToCode(this, 'I2CSUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var code;
    if (key=='MPU9250') {
      Blockly.Python.definitions_['import_mpu9250'] = 'import mpu9250';
       code = v + ' = mpu9250.' + key + "("+ iv+ ')\n';
    }else if (key=='BMP280') {
      Blockly.Python.definitions_['import_bmp280'] = 'import bmp280';
      code = v + ' = bmp280.' + key + "("+ iv+ ')\n';
    }else if (key=='SHT20') {
      Blockly.Python.definitions_['import_sht20'] = 'import sht20';
      code = v + ' = sht20.' + key + "("+ iv+ ')\n';
    }else if (key=='ADXL345') {
      Blockly.Python.definitions_['import_adxl345'] = 'import adxl345';
      code = v + ' = adxl345.' + key + "("+ iv+ ')\n';
    }
    return code;
};

Blockly.Python.sensor_bmp=function(){
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_bmp280'] = 'import bmp280';
    var code = v + '.' + key;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_sht=function(){
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_sht20'] = 'import sht20';
    var code = v + '.' + key;
    return [code, Blockly.Python.ORDER_ATOMIC];
};
