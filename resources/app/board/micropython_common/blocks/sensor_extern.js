'use strict';

goog.provide('Blockly.Blocks.sensor');

goog.require('Blockly.Blocks');

Blockly.Blocks.sensor.HUE = 40//'#9e77c9'//40;


Blockly.Blocks['sensor_mixgo_extern_button_is_pressed'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_BUTTON)
            .appendField(Blockly.MIXLY_PIN)
            .setCheck(Number);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_IS_PRESSED);
        this.appendValueInput("STAT")
            .appendField(Blockly.MIXLY_ELECLEVEL);    
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_SENOR_IS_PRESSED);
    }
};

Blockly.Blocks['sensor_mixgo_extern_button_was_pressed'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_BUTTON)
            .appendField(Blockly.MIXLY_PIN)
            .setCheck(Number);
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_WAS_PRESSED);
        this.appendValueInput("STAT")
            .appendField(Blockly.MIXLY_ELECLEVEL); 
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_SENOR_WAS_PRESSED);
    }
};

Blockly.Blocks['sensor_mixgo_extern_button_get_presses'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_BUTTON)
            .appendField(Blockly.MIXLY_PIN)
            .setCheck(Number);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_GET_PRESSES);
        this.appendValueInput('VAR')
            .setCheck(Number)    
            .appendField(Blockly.MIXLY_GET_PRESSES_TIME);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN+Blockly.MIXLY_BUTTON+Blockly.MIXLY_GET_PRESSES);
    }
};

Blockly.Blocks.sensor_mixgo_extern_button_attachInterrupt = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_BUTTON)
            .appendField(Blockly.MIXLY_PIN)
            .setCheck(Number);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MODE)
    .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_RISING, "machine.Pin.IRQ_RISING"], [Blockly.MIXLY_FALLING, "machine.Pin.IRQ_FALLING"], [Blockly.MIXLY_CHANGE, "(machine.Pin.IRQ_RISING | machine.Pin.IRQ_FALLING)"]]), "mode");
    this.appendValueInput('DO')
    .appendField(Blockly.MIXLY_DO)
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_INOUT_ATTACHINTERRUPT);
}
};


Blockly.Blocks.sensor_mpu9250_attachGestureInterrupt = {
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendValueInput('SUB')
        .appendField("MPU9250")
        .setCheck("var");
        this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MICROBIT_JS_CURRENT_GESTURE)
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MICROBIT_shake, "shake"], [Blockly.MIXLY_UP, "up"], [Blockly.MIXLY_DOWN, "down"], [Blockly.MIXLY_LEFT, "left"], [Blockly.MIXLY_RIGHT, "right"], [Blockly.MIXLY_MICROBIT_face_up, "face up"], [Blockly.MIXLY_MICROBIT_face_down, "face down"], [Blockly.MIXLY_MICROBIT_freefall, "freefall"], ["3g", "3g"], ["6g", "6g"], ["8g", "8g"]]), "gesture");
        this.appendStatementInput('DO')
        .appendField(Blockly.MIXLY_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('gesture');
            var mode0 = Blockly.MIXLY_MICROBIT_JS_CURRENT;
            var mode1 = MSG.catSensor;
            var mode2 = Blockly.MIXLY_MICROBIT_JS_STATE;
            var mode3 = Blockly.MIXLY_MICROBIT_PERFORMANCE
            var TOOLTIPS = {
                'shake': Blockly.MIXLY_MICROBIT_shake,
                'up': Blockly.MIXLY_UP,
                'down':Blockly.MIXLY_DOWN,
                'left':Blockly.MIXLY_LEFT,
                'right':Blockly.MIXLY_RIGHT,
                'face up': Blockly.MIXLY_MICROBIT_face_up,
                'face down': Blockly.MIXLY_MICROBIT_face_down,
                'freefall':Blockly.MIXLY_MICROBIT_freefall,
                '3g': '3g',
                '6g': '6g',
                '8g': '8g'
            };
            return mode0 +mode1+mode2+ TOOLTIPS[mode]+mode3;
        });
    }
};


Blockly.Blocks['sensor_adxl345_get_acceleration'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendValueInput('SUB')
        .appendField(Blockly.MIXLY_ADXL345)
        .setCheck("var");
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_JS_ACCELERATION)
        .appendField(new Blockly.FieldDropdown([
            ["x", "x"],
            ["y", "y"],
            ["z", "z"],
            ["(x,y,z)", "values"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_MICROBIT_JS_ACCELERATION);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('key');
            var mode0 = Blockly.MIXLY_MICROBIT_PY_STORAGE_GET;
            var mode1 = Blockly.MIXLY_MICROBIT_Direction;
            var mode2 = Blockly.MIXLY_MICROBIT_JS_ACCELERATION1;
            var TOOLTIPS = {
                'x': 'x',
                'y': 'y',
                'z': 'z',
                '(x,y,z)':Blockly.MIXLY_MICROBIT_Shiliang_Direction,
            };
            return mode0 +TOOLTIPS[mode]+mode1+mode2;
        });
    }
};



Blockly.Blocks['sensor_light_level'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_JS_LIGHT_LEVEL)
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_SENSOR_LIGHT_LEVEL_TOOLTIP);
    }
};



Blockly.Blocks.sensor_dht11 = {
    init: function () {
        var WHAT = [[Blockly.MIXLY_GETTEMPERATUE, 'temperature'], [Blockly.MIXLY_GETHUMIDITY, 'relative_humidity'], [Blockly.MIXLY_DHT11_T_H, 'tempandhum']];
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendValueInput("PIN", Number)
        .appendField(new Blockly.FieldDropdown([['DHT11', 'dht11']
                , ['DHT22', 'dht22']//, ['DHT21', '21'], ['DHT33', '33'], ['DHT44', '44']
                ]), 'TYPE')
        .appendField(Blockly.MIXLY_PIN)
        .setCheck(Number);
        this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown(WHAT), "WHAT");
        this.setOutput(true, Number);
        var thisBlock = this;
        this.setTooltip(function () {
            var op = thisBlock.getFieldValue('WHAT');
            var TOOLTIPS = {
                'temperature': Blockly.MIXLY_TOOLTIP_BLOCKGROUP_GET_TEM,
                'relative_humidity': Blockly.MIXLY_TOOLTIP_BLOCKGROUP_GET_HUM,
                'tempandhum': Blockly.MIXLY_TOOLTIP_BLOCKGROUP_GET_TEM_HUM
            };
            return TOOLTIPS[op];
        });
    }
};


Blockly.Blocks['sensor_mixgo_extern_light'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_ESP32_EXTERN_LIGHT);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_PIN)
            .setCheck(Number);   
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_ESP32_EXTERN_VALUE);     
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.ESP32_SENSOR_NIXGO_LIGHT_TOOLTIP);
    }
};

Blockly.Blocks['sensor_mixgo_extern_sound'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_ESP32_EXTERN_SOUND);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_PIN)
            .setCheck(Number);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_ESP32_EXTERN_VALUE);    
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.ESP32_SENSOR_NIXGO_SOUND_TOOLTIP);
    }
};



Blockly.Blocks['sensor_mixgo_extern_pin_near'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.TEXT_TRIM_LEFT, "left"], [Blockly.Msg.TEXT_TRIM_RIGHT, "right"]]), "direction")
        .appendField(Blockly.MIXLY_ESP32_NEAR);
        this.setOutput(true,Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('direction');
            var mode0 = Blockly.MIXLY_ESP32_SENSOR_MIXGO_PIN_NEAR_TOOLTIP;
            var mode1 = Blockly.MIXLY_ESP32_NEAR;
            var TOOLTIPS = {
                'left':Blockly.Msg.TEXT_TRIM_LEFT,
                'right':Blockly.Msg.TEXT_TRIM_RIGHT,
            };
            return mode0 +TOOLTIPS[mode] + mode1
        });
    }
};

Blockly.Blocks.sensor_use_i2c_init = {
    init: function () {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendValueInput('I2CSUB')
        .appendField(Blockly.Msg.CONTROLS_FOR_INPUT_WITH+"I2C")
        .setCheck("var");
        this.appendValueInput('SUB')
        .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_MAKE)
        .setCheck("var");
        this.appendDummyInput("")
        .appendField(Blockly.MIXLY_SETUP + Blockly.Msg.LISTS_SET_INDEX_INPUT_TO)
        .appendField(new Blockly.FieldDropdown([
            ["MPU9250", "MPU9250"],
            ["BMP280", "BMP280"],
            ["SHT20", "SHT20"],
            ["ADXL345","ADXL345"]
            ]), "key");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setFieldValue("MPU9250","key");
        var thisBlock = this;
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('key');
            var mode0 = Blockly.MIXLY_ESP32_SENSOR_USE_I2C_TOOLTIP;
            var mode1 = Blockly.MIXLY_ESP32_NEAR;
            var TOOLTIPS = {
                "MPU9250": "MPU9250",
                "SHT20": "SHT20",
                "BMP280": "BMP280",
                "ADXL345": "ADXL345"
            };
            return mode0 +TOOLTIPS[mode]
        });
    }
};

Blockly.Blocks['sensor_bmp'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendValueInput('SUB')
        .appendField("BMP280")
        .setCheck("var");
        this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([
            [Blockly.MIXLY_GETTEMPERATUE, "get_BMP_temperature()"],
            [Blockly.MIXLY_GETPRESSURE, "get_BMP_pressure()"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('key');
            var TOOLTIPS = {
                "get_BMP_temperature()":Blockly.MIXLY_MICROBIT_SENSOR_BMP_temperature_TOOLTIP,
                "get_BMP_pressure()":Blockly.MIXLY_MICROBIT_SENSOR_BMP_press_TOOLTIP,
            };
            return TOOLTIPS[mode]
        });
    }
};

Blockly.Blocks['sensor_sht'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendValueInput('SUB')
        .appendField("SHT20")
        .setCheck("var");
        this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([
            [Blockly.MIXLY_GETTEMPERATUE, "get_SHT_temperature()"],
            [Blockly.MIXLY_GETHUMIDITY, "get_SHT_relative_humidity()"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('key');
            var TOOLTIPS = {
                "get_SHT_temperature()":Blockly.MIXLY_MICROBIT_SENSOR_SHT_temperature_TOOLTIP,
                "get_SHT_relative_humidity()":Blockly.MIXLY_MICROBIT_SENSOR_SHT_HUM_TOOLTIP,
            };
            return TOOLTIPS[mode]
        });
    }
};

Blockly.Blocks.sensor_ds18x20 = {
 init: function () {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendValueInput("PIN", Number)
    .appendField("DS18x20 "+Blockly.MIXLY_PIN)
    .setCheck(Number);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_GETTEMPERATUE);
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_MICROBIT_SENSOR_DS18X20_TOOLTIP);
}
};



Blockly.Blocks['sensor_lm35'] = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("")
    .appendField("LM35"+Blockly.MIXLY_TEMP);
    this.appendValueInput("PIN", Number)
    .appendField(Blockly.MIXLY_PIN)
    .setCheck(Number);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_GETTEMPERATUE);
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_LM35);
  }
};
