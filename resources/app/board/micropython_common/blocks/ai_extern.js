'use strict';

goog.provide('Blockly.Blocks.ai_extern');

goog.require('Blockly.Blocks');

Blockly.Blocks.ai_extern.HUE = '#ff9f06';

Blockly.Blocks.huskylens_use_i2c_init = {
    init: function () {
        this.setColour(Blockly.Blocks.ai_extern.HUE);
        this.appendValueInput('SUB')
            .appendField('HuskyLens')
            .setCheck("var");
        this.appendValueInput('I2CSUB')
            .appendField(Blockly.Msg.CONTROLS_FOR_INPUT_WITH+"I2C")
            .setCheck("var");        
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_SETUP)            
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.huskylens_request_algorthim = {
    init: function () {
        this.setColour(Blockly.Blocks.ai_extern.HUE);
        this.appendValueInput('SUB')
            .appendField('HuskyLens')
            .setCheck("var");
        
        this.appendDummyInput("")
            .appendField(Blockly.MICROPYTHON_HUSKYLENS_CHANGE_ALGORTHIM) 
            .appendField(new Blockly.FieldDropdown([[Blockly.MICROPYTHON_HUSKYLENS_ALGORITHM_OBJECT_TRACKING, "ALGORITHM_OBJECT_TRACKING"],
                                                     [Blockly.MIXLY_AipFace, "ALGORITHM_FACE_RECOGNITION"],
                                                     [Blockly.MICROPYTHON_HUSKYLENS_ALGORITHM_OBJECT_RECOGNITION, "ALGORITHM_OBJECT_RECOGNITION"],
                                                     [Blockly.MICROPYTHON_HUSKYLENS_ALGORITHM_LINE_TRACKING, "ALGORITHM_LINE_TRACKING"],
                                                     [MSG.catImage_Color, "ALGORITHM_COLOR_RECOGNITION"],
                                                     [Blockly.MICROPYTHON_HUSKYLENS_ALGORITHM_TAG_RECOGNITION, "ALGORITHM_TAG_RECOGNITION"],
                                                     [Blockly.MICROPYTHON_HUSKYLENS_ALGORITHM_OBJECT_CLASSIFICATION, "ALGORITHM_OBJECT_CLASSIFICATION"],
                                                     [Blockly.MICROPYTHON_HUSKYLENS_ALGORITHM_QR_CODE_RECOGNTITION, "ALGORITHM_QR_CODE_RECOGNTITION"],                       
                                                     [Blockly.MICROPYTHON_HUSKYLENS_ALGORITHM_BARCODE_RECOGNTITION, "ALGORITHM_BARCODE_RECOGNTITION"]
                                                    ]),'CTYPE')        
            .appendField(Blockly.MICROPYTHON_HUSKYLENS_UNTIL_SUCCESS)                                            
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.huskylens_command_request = {
    init: function () {
        this.setColour(Blockly.Blocks.ai_extern.HUE);
        this.appendValueInput('SUB')
            .appendField('HuskyLens')
            .setCheck("var");          
        this.appendDummyInput("")
            .appendField(Blockly.MICROPYTHON_HUSKYLENS_COMMAND_REQUEST)            
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.huskylens_read_learned_id_count = {
    init: function () {
        this.setColour(Blockly.Blocks.ai_extern.HUE);
        this.appendValueInput('SUB')
            .appendField('HuskyLens')
            .setCheck("var");          
        this.appendDummyInput("")
            .appendField(Blockly.MICROPYTHON_HUSKYLENS_GET_FROM_RESULT)
            .appendField(Blockly.MICROPYTHON_HUSKYLENS_READ_LEART_ID_COUNT)              
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

Blockly.Blocks.huskylens_is_appear_direct = {
    init: function () {
        this.setColour(Blockly.Blocks.ai_extern.HUE);
        this.appendValueInput('SUB')
            .appendField('HuskyLens')
            .setCheck("var");          
        this.appendDummyInput("")
            .appendField(Blockly.MICROPYTHON_HUSKYLENS_GET_FROM_RESULT)
            .appendField(new Blockly.FieldDropdown([[Blockly.blockpy_turtle_shape_square, "blocks"],                                                       
                                                    [Blockly.blockpy_turtle_shape_arrow, "arrows"]
                                                    ]),'CTYPE') 
            .appendField(Blockly.MICROPYTHON_HUSKYLENS_IS_APPEAR)            
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

Blockly.Blocks.huskylens_read_block_center_parameter_direct = {
    init: function () {
        this.setColour(Blockly.Blocks.ai_extern.HUE);
        this.appendValueInput('SUB')
            .appendField('HuskyLens')
            .setCheck("var");          
        this.appendDummyInput("")
            .appendField(Blockly.MICROPYTHON_HUSKYLENS_GET_FROM_RESULT)
            .appendField(new Blockly.FieldDropdown([[Blockly.blockpy_turtle_shape_square, "blocks"],                                                       
                                                    [Blockly.blockpy_turtle_shape_arrow, "arrows"]
                                                    ]),'CTYPE') 
            .appendField(Blockly.MICROPYTHON_HUSKYLENS_IS_APPEAR)            
        this.setInputsInline(true);
        this.setOutput(true);
    }
};


Blockly.Blocks.huskylens_is_learned_id = {
    init: function () {
        this.setColour(Blockly.Blocks.ai_extern.HUE);
        this.appendValueInput('SUB')
            .appendField('HuskyLens')
            .setCheck("var");          
        this.appendDummyInput("")
            .appendField(Blockly.MICROPYTHON_HUSKYLENS_GET_FROM_RESULT)
        this.appendValueInput('ID') 
            .setCheck(Number)   
            .appendField('ID')    
        this.appendDummyInput("")
            .appendField(Blockly.MICROPYTHON_HUSKYLENS_IS_LEARNED)              
        this.setInputsInline(true);
        this.setOutput(true);
    }
};


    Blockly.Blocks.huskylens_read_block_center_parameter_direct = {
        init: function () {
            this.setColour(Blockly.Blocks.ai_extern.HUE);
            this.appendValueInput('SUB')
            .appendField('HuskyLens')
            .setCheck("var");
            this.appendDummyInput('DUMMY_TYPE')
            .appendField(Blockly.MICROPYTHON_HUSKYLENS_GET_FROM_RESULT)
                .appendField(Blockly.MICROPYTHON_HUSKYLENS_NEAR_CENTERED);
            this.appendDummyInput('DUMMY_FUNC')
                .appendField(Blockly.MIXLY_BELONG);           
            this.setOutput(true, null);
            this.setInputsInline(true);
            this.setTooltip("");
            this.setHelpUrl("");
            this.updateShape(false);
        },
        mutationToDom: function () {
            var container = Blockly.utils.xml.createElement('mutation');
            let sensorType = this.getFieldValue('TYPE');
            container.setAttribute('sensor-type', sensorType);
            return container;
        },
        domToMutation: function (xmlElement) {
            let sensorType = xmlElement.getAttribute('sensor-type');
            this.updateShape(sensorType);
        },
        updateShape: function (type) {
            let dummyTypeObj = this.getInput('DUMMY_TYPE');
            let dummyFuncObj = this.getInput('DUMMY_FUNC');
            dummyTypeObj.removeField('TYPE', true);
            dummyFuncObj.removeField('BME_TYPE', true);
            dummyTypeObj.appendField(new Blockly.FieldDropdown([[Blockly.blockpy_turtle_shape_square, "blocks"],                                                       
                                                    [Blockly.blockpy_turtle_shape_arrow, "arrows"]],
                function (value) {
                    if (value !== type) {
                        var block = this.getSourceBlock();
                        block.updateShape(value);
                        block.setFieldValue(value, 'TYPE');
                        return null;
                    }
                    return undefined;
                }
            ), 'TYPE');
            if (type === 'arrows') {
                dummyFuncObj.appendField(new Blockly.FieldDropdown([
                    [Blockly.MICROPYTHON_HUSKYLENS_X_ORIGIN, "xOrigin"],
                    [Blockly.MICROPYTHON_HUSKYLENS_Y_ORIGIN, "yOrigin"],
                    [Blockly.MICROPYTHON_HUSKYLENS_X_TARGET, "xTarget"],
                    [Blockly.MICROPYTHON_HUSKYLENS_Y_TARGET, "yTarget"]
                ]), "BME_TYPE");
            } else {
                dummyFuncObj.appendField(new Blockly.FieldDropdown([
                    ['ID', "id"],
                    [Blockly.MICROPYTHON_HUSKYLENS_X_CENTERED, "xCenter"],
                    [Blockly.MICROPYTHON_HUSKYLENS_Y_CENTERED, "yCenter"],
                    [Blockly.MIXLY_WIDTH, "width"],
                    [Blockly.MIXLY_HEIGHT, "height"]
                ]), "BME_TYPE");
            }
        }
    };

Blockly.Blocks.huskylens_is_appear_id = {
    init: function () {
        this.setColour(Blockly.Blocks.ai_extern.HUE);
        this.appendValueInput('SUB')
            .appendField('HuskyLens')
            .setCheck("var");   
        this.appendValueInput('ID')
            .appendField(Blockly.MICROPYTHON_HUSKYLENS_GET_FROM_RESULT)
            .appendField('ID')             
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([[Blockly.blockpy_turtle_shape_square, "blocks"],                                                       
                                                    [Blockly.blockpy_turtle_shape_arrow, "arrows"]
                                                    ]),'CTYPE') 
            .appendField(Blockly.MICROPYTHON_HUSKYLENS_IS_APPEAR)            
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

    Blockly.Blocks.huskylens_read_block_id_parameter_direct = {
        init: function () {
            this.setColour(Blockly.Blocks.ai_extern.HUE);
            this.appendValueInput('SUB')
            .appendField('HuskyLens')
            .setCheck("var");
            this.appendValueInput('ID')
            .appendField(Blockly.MICROPYTHON_HUSKYLENS_GET_FROM_RESULT)
            .appendField('ID') 
            this.appendValueInput('NUM')
            .appendField(Blockly.MICROPYTHON_HUSKYLENS_ORDER)  
            this.appendDummyInput()
            .appendField(Blockly.MICROPYTHON_HUSKYLENS_ORDER_END) 
            this.appendDummyInput('DUMMY_TYPE');

            this.appendDummyInput('DUMMY_FUNC')
                .appendField(Blockly.MIXLY_BELONG);           
            this.setOutput(true, null);
            this.setInputsInline(true);
            this.setTooltip("");
            this.setHelpUrl("");
            this.updateShape(false);
        },
        mutationToDom: function () {
            var container = Blockly.utils.xml.createElement('mutation');
            let sensorType = this.getFieldValue('TYPE');
            container.setAttribute('sensor-type', sensorType);
            return container;
        },
        domToMutation: function (xmlElement) {
            let sensorType = xmlElement.getAttribute('sensor-type');
            this.updateShape(sensorType);
        },
        updateShape: function (type) {
            let dummyTypeObj = this.getInput('DUMMY_TYPE');
            let dummyFuncObj = this.getInput('DUMMY_FUNC');
            dummyTypeObj.removeField('TYPE', true);
            dummyFuncObj.removeField('BME_TYPE', true);
            dummyTypeObj.appendField(new Blockly.FieldDropdown([[Blockly.blockpy_turtle_shape_square, "blocks"],                                                       
                                                    [Blockly.blockpy_turtle_shape_arrow, "arrows"]],
                function (value) {
                    if (value !== type) {
                        var block = this.getSourceBlock();
                        block.updateShape(value);
                        block.setFieldValue(value, 'TYPE');
                        return null;
                    }
                    return undefined;
                }
            ), 'TYPE');
            if (type === 'arrows') {
                dummyFuncObj.appendField(new Blockly.FieldDropdown([
                    [Blockly.MICROPYTHON_HUSKYLENS_X_ORIGIN, "xOrigin"],
                    [Blockly.MICROPYTHON_HUSKYLENS_Y_ORIGIN, "yOrigin"],
                    [Blockly.MICROPYTHON_HUSKYLENS_X_TARGET, "xTarget"],
                    [Blockly.MICROPYTHON_HUSKYLENS_Y_TARGET, "yTarget"]
                ]), "BME_TYPE");
            } else {
                dummyFuncObj.appendField(new Blockly.FieldDropdown([
                    ['ID', "id"],
                    [Blockly.MICROPYTHON_HUSKYLENS_X_CENTERED, "xCenter"],
                    [Blockly.MICROPYTHON_HUSKYLENS_Y_CENTERED, "yCenter"],
                    [Blockly.MIXLY_WIDTH, "width"],
                    [Blockly.MIXLY_HEIGHT, "height"]
                ]), "BME_TYPE");
            }
        }
    };

Blockly.Blocks.huskylens_read_count = {
    init: function () {
        this.setColour(Blockly.Blocks.ai_extern.HUE);
        this.appendValueInput('SUB')
            .appendField('HuskyLens')
            .setCheck("var");       
        this.appendValueInput('ID')
            .appendField(Blockly.MICROPYTHON_HUSKYLENS_GET_FROM_RESULT)
            .appendField('ID')        
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([[Blockly.blockpy_turtle_shape_square, "blocks"],                                                       
                                                    [Blockly.blockpy_turtle_shape_arrow, "arrows"]
                                                    ]),'CTYPE') 
            .appendField(Blockly.MICROPYTHON_HUSKYLENS_SUM )            
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

    Blockly.Blocks.huskylens_read_blocks_arrows_parameter_direct = {
        init: function () {
            this.setColour(Blockly.Blocks.ai_extern.HUE);
            this.appendValueInput('SUB')
            .appendField('HuskyLens')
            .setCheck("var");
            this.appendValueInput('NUM')
            .appendField(Blockly.MICROPYTHON_HUSKYLENS_GET_FROM_RESULT)
            .appendField(Blockly.MICROPYTHON_HUSKYLENS_ORDER)  
            this.appendDummyInput()
            .appendField(Blockly.MICROPYTHON_HUSKYLENS_ORDER_END)    
            this.appendDummyInput('DUMMY_TYPE');

            this.appendDummyInput('DUMMY_FUNC')
                .appendField(Blockly.MIXLY_BELONG);           
            this.setOutput(true, null);
            this.setInputsInline(true);
            this.setTooltip("");
            this.setHelpUrl("");
            this.updateShape(false);
        },
        mutationToDom: function () {
            var container = Blockly.utils.xml.createElement('mutation');
            let sensorType = this.getFieldValue('TYPE');
            container.setAttribute('sensor-type', sensorType);
            return container;
        },
        domToMutation: function (xmlElement) {
            let sensorType = xmlElement.getAttribute('sensor-type');
            this.updateShape(sensorType);
        },
        updateShape: function (type) {
            let dummyTypeObj = this.getInput('DUMMY_TYPE');
            let dummyFuncObj = this.getInput('DUMMY_FUNC');
            dummyTypeObj.removeField('TYPE', true);
            dummyFuncObj.removeField('BME_TYPE', true);
            dummyTypeObj.appendField(new Blockly.FieldDropdown([[Blockly.blockpy_turtle_shape_square, "blocks"],                                                       
                                                    [Blockly.blockpy_turtle_shape_arrow, "arrows"]],
                function (value) {
                    if (value !== type) {
                        var block = this.getSourceBlock();
                        block.updateShape(value);
                        block.setFieldValue(value, 'TYPE');
                        return null;
                    }
                    return undefined;
                }
            ), 'TYPE');
            if (type === 'arrows') {
                dummyFuncObj.appendField(new Blockly.FieldDropdown([
                    [Blockly.MICROPYTHON_HUSKYLENS_X_ORIGIN, "xOrigin"],
                    [Blockly.MICROPYTHON_HUSKYLENS_Y_ORIGIN, "yOrigin"],
                    [Blockly.MICROPYTHON_HUSKYLENS_X_TARGET, "xTarget"],
                    [Blockly.MICROPYTHON_HUSKYLENS_Y_TARGET, "yTarget"]
                ]), "BME_TYPE");
            } else {
                dummyFuncObj.appendField(new Blockly.FieldDropdown([
                    ['ID', "id"],
                    [Blockly.MICROPYTHON_HUSKYLENS_X_CENTERED, "xCenter"],
                    [Blockly.MICROPYTHON_HUSKYLENS_Y_CENTERED, "yCenter"],
                    [Blockly.MIXLY_WIDTH, "width"],
                    [Blockly.MIXLY_HEIGHT, "height"]
                ]), "BME_TYPE");
            }
        }
    };

Blockly.Blocks.huskylens_command_request_learn_once = {
    init: function () {
        this.setColour(Blockly.Blocks.ai_extern.HUE);
        this.appendValueInput('SUB')
            .appendField('HuskyLens')
            .setCheck("var");          
        this.appendDummyInput("")
            .appendField(Blockly.MICROPYTHON_HUSKYLENS_LEARN_ONCE)
        this.appendValueInput('ID') 
            .setCheck(Number)   
            .appendField('ID')              
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.huskylens_command_request_forget = {
    init: function () {
        this.setColour(Blockly.Blocks.ai_extern.HUE);
        this.appendValueInput('SUB')
            .appendField('HuskyLens')
            .setCheck("var");          
        this.appendDummyInput("")
            .appendField(Blockly.MICROPYTHON_HUSKYLENS_FORGET)
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.huskylens_command_request_customnames = {
    init: function () {
        this.setColour(Blockly.Blocks.ai_extern.HUE);
        this.appendValueInput('SUB')
            .appendField('HuskyLens')
            .setCheck("var");          
        this.appendDummyInput("")
            .appendField(Blockly.MICROPYTHON_HUSKYLENS_SET_CURRENT)
        this.appendValueInput('ID') 
            .setCheck(Number)   
            .appendField('ID')
        this.appendValueInput('NAME') 
            .setCheck(String)    
            .appendField(Blockly.MICROPYTHON_HUSKYLENS_NAME)            
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.huskylens_command_request_custom_text = {
    init: function () {
        this.setColour(Blockly.Blocks.ai_extern.HUE);
        this.appendValueInput('SUB')
            .appendField('HuskyLens')
            .setCheck("var");  
        this.appendValueInput('NAME') 
            .setCheck(String)    
            .appendField(Blockly.MICROPYTHON_HUSKYLENS_SCREEN_TEXT)            
        this.appendValueInput('x')
            .setCheck(Number)
            .appendField('x')
        this.appendValueInput('y') 
            .setCheck(Number)   
            .appendField('y')
                    
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.huskylens_command_request_clear_text = {
    init: function () {
        this.setColour(Blockly.Blocks.ai_extern.HUE);
        this.appendValueInput('SUB')
            .appendField('HuskyLens')
            .setCheck("var");  
        this.appendDummyInput("")
            .appendField(Blockly.MICROPYTHON_HUSKYLENS_SCREEN_CLEAR)
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.huskylens_command_request_photo_screenshot = {
    init: function () {
        this.setColour(Blockly.Blocks.ai_extern.HUE);
        this.appendValueInput('SUB')
            .appendField('HuskyLens')
            .setCheck("var");  
        this.appendDummyInput("")
            .appendField(Blockly.MICROPYTHON_HUSKYLENS_TRIGGER)
            .appendField(new Blockly.FieldDropdown([[Blockly.MICROPYTHON_HUSKYLENS_PHOTO, "photo"],                                                       
                                                    [Blockly.MICROPYTHON_HUSKYLENS_SCREENSHOT, "screenshot"]
                                                    ]),'CTYPE') 
            .appendField(Blockly.MICROPYTHON_HUSKYLENS_SAVE_SDCARD)
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.huskylens_save_load_model_to_SD_card = {
    init: function () {
        this.setColour(Blockly.Blocks.ai_extern.HUE);
        this.appendValueInput('SUB')
            .appendField('HuskyLens')
            .setCheck("var");  
        this.appendDummyInput("")            
            .appendField(new Blockly.FieldDropdown([[Blockly.MICROPYTHON_HUSKYLENS_SAVE_AS, "save"],                                                       
                                                    [Blockly.MICROPYTHON_HUSKYLENS_LOAD, "load"]
                                                    ]),'CTYPE') 
        this.appendValueInput('num')
            .setCheck(Number)    
            .appendField(Blockly.MICROPYTHON_HUSKYLENS_SDCARD_MODEL)
        this.appendDummyInput("")    
            .appendField(Blockly.MICROPYTHON_HUSKYLENS_MODEL_NUM)
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};