'use strict';

goog.provide('Blockly.Blocks.actuator');
goog.require('Blockly.Blocks');

Blockly.Blocks.actuator.HUE = 100

//music
Blockly.Blocks.esp32_music_stop = {
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_NOTONE)
            .appendField(Blockly.MIXLY_PIN)
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks.actuator_extern_led_bright = {
  init: function() {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_SETTING)
        .appendField(Blockly.MIXLY_EXTERN_LED)
    this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_PIN)
            .setCheck(Number);
    this.appendValueInput('bright')
    .appendField(Blockly.MIXLY_PULSEIN_STAT)  
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_ESP32_EXTERN_LED_SETONOFF);
  }
};

Blockly.Blocks.actuator_extern_get_led_bright = {
  init: function() {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET)
        .appendField(Blockly.MIXLY_EXTERN_LED)
    this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_PIN)
            .setCheck(Number);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_BRIGHTNESS)  
    this.setOutput(true);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_ESP32_EXTERN_LED_GETONOFF);
  }
};

Blockly.Blocks.actuator_extern_led_brightness = {
  init: function() {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_SETTING)
        .appendField(Blockly.MIXLY_EXTERN_LED)
    this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_PIN)
            .setCheck(Number);
    this.appendValueInput('bright')
    .appendField(Blockly.MIXLY_BRIGHTNESS)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_ESP32_EXTERN_LED_SETBRIGHT);
  }
};

//Servo
Blockly.Blocks.servo_init = {
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendValueInput("VAR")
            .appendField(Blockly.MIXLY_SETUP+Blockly.MIXLY_SERVO)
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_PIN )
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};

Blockly.Blocks.servo_move = {
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendValueInput("VAR")
            .appendField(Blockly.MIXLY_SERVO)
        this.appendValueInput("DEGREE", Number)
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_DEGREE_0_180);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_SERVO_MOVE);
    }
};

Blockly.Blocks.servo_speed_360 = {
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendValueInput("VAR")
            .appendField("360°"+Blockly.MIXLY_SERVO)
        this.appendValueInput("SPEED", Number)
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_SETTING+Blockly.blockpy_turtle_rotate+Blockly.MIXLY_SPEED+" (-10~10)");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_SERVO_360_TOOLTIP);
    }
};

Blockly.Blocks.actuator_ms32006_init = {
    init: function () {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendValueInput('SUB')
            .appendField("初始化")
            .setCheck("var");
        this.appendDummyInput()
            .appendField("电机驱动");           
        this.appendDummyInput()
            .appendField("地址")
            .appendField(new Blockly.FieldDropdown([['A', 'ms32006.ADDRESS_A'], ['B', 'ms32006.ADDRESS_B']]), 'mode');          
        this.appendValueInput('SUB1')
            .setCheck("var")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("通信");             
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip("初始化MS32006电机驱动，使用I2C通信");
    }
};

Blockly.Blocks.actuator_ms32006_dcmotor = {
  init: function() {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendValueInput('SUB')
        .appendField("直流电机")
        .setCheck("var");
  this.appendDummyInput()
      .appendField(Blockly.MIXLY_MICROBIT_Direction)
              .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.CLOCKWISE, "ms32006.MOT_CW"],
        [Blockly.Msg.ANTI_CLOCKWISE, "ms32006.MOT_CCW"],
        [Blockly.MOTOR_N, "ms32006.MOT_N"],
        [Blockly.MOTOR_P, "ms32006.MOT_P"]
        ]), "direction");
  this.appendValueInput('speed')
      .setCheck(Number)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.MIXLY_STEPPER_SET_SPEED);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip("设置直流电机的状态及转速(0-100)");
  }
};



Blockly.Blocks.actuator_ms32006_stepper = {
  init: function() {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendValueInput('SUB')
        .appendField("步进电机")
        .setCheck("var");
    this.appendDummyInput()
        .appendField("选择")
        .appendField(new Blockly.FieldDropdown([['A', 'ms32006.MOT_A'], ['B', 'ms32006.MOT_B']]), 'mode');      
  this.appendDummyInput()
      .appendField(Blockly.MIXLY_MICROBIT_Direction)
              .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.CLOCKWISE, "ms32006.MOT_CW"],
        [Blockly.Msg.ANTI_CLOCKWISE, "ms32006.MOT_CCW"]
        ]), "direction");
  this.appendValueInput('speed')
      .setCheck(Number)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("转速");
  this.appendValueInput('steps')
      .setCheck(Number)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("步数");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip("设置步进电机的状态、转速、步数(0-2047)");
  }
};

