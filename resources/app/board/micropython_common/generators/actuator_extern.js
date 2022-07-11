'use strict';

goog.provide('Blockly.Python.actuator');
goog.require('Blockly.Python');

Blockly.Python.actuator_extern_led_bright = function() {
    Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
    var pin = Blockly.Python.valueToCode(this,'PIN', Blockly.Python.ORDER_ATOMIC).replace("IO", "");
    var bright = Blockly.Python.valueToCode(this,'bright', Blockly.Python.ORDER_ATOMIC);
    // var bright = this.getFieldValue('bright');
    var code = "mixgoce.Led(board.IO" + pin + ").setonoff("+bright+")\n";
    return code;
};

Blockly.Python.actuator_extern_get_led_bright = function() {
    Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
    var pin = Blockly.Python.valueToCode(this,'PIN', Blockly.Python.ORDER_ATOMIC).replace("IO", "");
    var code = "mixgoce.Led(board.IO" + pin + ").getonoff("+")";
    return [code, Blockly.Python.ORDER_ATOMIC];;
};

Blockly.Python.actuator_extern_led_brightness = function() {
    Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
    var pin = Blockly.Python.valueToCode(this,'PIN', Blockly.Python.ORDER_ATOMIC).replace("IO", "");
    var flag = Blockly.Python.valueToCode(this,'bright', Blockly.Python.ORDER_ATOMIC);
    var code = 'mixgoce.Led(board.IO'+pin+').setbrightness('+flag+')\n';
    return code;
};

Blockly.Python.servo_init = function() {
  Blockly.Python.definitions_['import_servo'] = 'import servo';
  Blockly.Python.definitions_['import_board'] = 'import board';
  var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN',Blockly.Python.ORDER_ATOMIC);
  var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code = v+' = servo.Servo(board.'+dropdown_pin+')\n';
  return code;
};

Blockly.Python.servo_move = function() {
  var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var value_degree = Blockly.Python.valueToCode(this, 'DEGREE', Blockly.Python.ORDER_ATOMIC);
  var code = v+'.write_angle('+value_degree+')\n';
  return code;
};

Blockly.Python.servo_speed_360 = function() {
  var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var speed = Blockly.Python.valueToCode(this, 'SPEED', Blockly.Python.ORDER_ATOMIC);
  var code = v+'.set_speed('+speed+')\n';
  return code;
};

Blockly.Python.actuator_ms32006_init = function () {
  Blockly.Python.definitions_['import ms32006'] = 'import ms32006';
  var address =this.getFieldValue('mode')
  var sub =Blockly.Python.valueToCode(this, 'SUB',Blockly.Python.ORDER_ATOMIC);
  var sub1 =Blockly.Python.valueToCode(this, 'SUB1',Blockly.Python.ORDER_ATOMIC);
  var code = sub+'=ms32006.MS32006('+ sub1+',addr='+ address +')\n';
    return code;
};

Blockly.Python.actuator_ms32006_dcmotor = function () {
  Blockly.Python.definitions_['import ms32006'] = 'import ms32006';
  var direction =this.getFieldValue('direction')
  var sub =Blockly.Python.valueToCode(this, 'SUB',Blockly.Python.ORDER_ATOMIC);
  var speed =Blockly.Python.valueToCode(this, 'speed',Blockly.Python.ORDER_ATOMIC);
  var code = sub+'.dc_motor('+ direction+','+ speed +')\n';
    return code;
};

Blockly.Python.actuator_ms32006_stepper = function () {
  Blockly.Python.definitions_['import ms32006'] = 'import ms32006';
  var mode =this.getFieldValue('mode')
  var direction =this.getFieldValue('direction')
  var sub =Blockly.Python.valueToCode(this, 'SUB',Blockly.Python.ORDER_ATOMIC);
  var speed =Blockly.Python.valueToCode(this, 'speed',Blockly.Python.ORDER_ATOMIC);
  var steps =Blockly.Python.valueToCode(this, 'steps',Blockly.Python.ORDER_ATOMIC);
  var code = sub+'.move('+ mode+','+ direction+','+ speed +','+ steps +')\n';
    return code;
};

