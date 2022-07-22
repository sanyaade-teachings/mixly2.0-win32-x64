'use strict';

goog.provide('Blockly.Python.ai_extern');

goog.require('Blockly.Python');

Blockly.Python.huskylens_use_i2c_init=function(){
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var iv = Blockly.Python.valueToCode(this, 'I2CSUB', Blockly.Python.ORDER_ATOMIC);
    var code = '';    
    Blockly.Python.definitions_['import_huskylens'] = 'import huskylens';
    code = v + ' = huskylens.HuskyLens('+ iv+ ')\n';
    return code;
};

Blockly.Python.huskylens_request_algorthim=function(){
    var ctype = this.getFieldValue('CTYPE');
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var code = '';    
    Blockly.Python.definitions_['import_huskylens'] = 'import huskylens';
    code = v + '.command_request_algorthim("'+ ctype+ '")\n';
    return code;
};

Blockly.Python.huskylens_command_request=function(){
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var code = '';    
    Blockly.Python.definitions_['import_huskylens'] = 'import huskylens';
    code = v + '.command_request()\n';
    return code;
};

Blockly.Python.huskylens_read_learned_id_count=function(){
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var code = '';    
    Blockly.Python.definitions_['import_huskylens'] = 'import huskylens';
    code = v + '.read_learned_id_count()';
    return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.huskylens_is_appear_direct=function(){
    var ctype = this.getFieldValue('CTYPE');
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var code = '';    
    Blockly.Python.definitions_['import_huskylens'] = 'import huskylens';
    code = v + '.is_appear_direct("' +ctype+ '")';
    return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.huskylens_read_block_center_parameter_direct=function(){
    var type = this.getFieldValue('TYPE');
    var args = this.getFieldValue('BME_TYPE');
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var code = '';    
    Blockly.Python.definitions_['import_huskylens'] = 'import huskylens';
    code = v + '.read_block_center_parameter_direct("' +type+ '").'+args;
    return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.huskylens_is_learned_id=function(){
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);    
    var id = Blockly.Python.valueToCode(this, 'ID', Blockly.Python.ORDER_ATOMIC);
    var code = '';    
    Blockly.Python.definitions_['import_huskylens'] = 'import huskylens';
    code = v + '.is_learned('+id+')';
    return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.huskylens_is_appear_id=function(){
    var ctype = this.getFieldValue('CTYPE');
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var id = Blockly.Python.valueToCode(this, 'ID', Blockly.Python.ORDER_ATOMIC);
    var code = '';    
    Blockly.Python.definitions_['import_huskylens'] = 'import huskylens';
    code = v + '.is_appear('+ id + ',"' +ctype+ '")';
    return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.huskylens_read_block_id_parameter_direct=function(){
    var type = this.getFieldValue('TYPE');
    var args = this.getFieldValue('BME_TYPE');
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var id = Blockly.Python.valueToCode(this, 'ID', Blockly.Python.ORDER_ATOMIC);
    var num = Blockly.Python.valueToCode(this, 'NUM', Blockly.Python.ORDER_ATOMIC);
    var code = '';    
    Blockly.Python.definitions_['import_huskylens'] = 'import huskylens';
    code = v + '.read_blocks_arrows_parameter('+ id + ','+ num + ',"' +type+ '").'+args;
    return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.huskylens_read_count=function(){
    var ctype = this.getFieldValue('CTYPE');
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var id = Blockly.Python.valueToCode(this, 'ID', Blockly.Python.ORDER_ATOMIC);
    var code = '';    
    Blockly.Python.definitions_['import_huskylens'] = 'import huskylens';
    code = v + '.read_count('+ id + ',"' +ctype+ '")';
    return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.huskylens_read_blocks_arrows_parameter_direct=function(){
    var type = this.getFieldValue('TYPE');
    var args = this.getFieldValue('BME_TYPE');
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);   
    var num = Blockly.Python.valueToCode(this, 'NUM', Blockly.Python.ORDER_ATOMIC);
    var code = '';    
    Blockly.Python.definitions_['import_huskylens'] = 'import huskylens';
    code = v + '.read_blocks_arrows_parameter_direct('+ num + ',"' +type+ '").'+args;
    return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.huskylens_command_request_learn_once=function(){
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);    
    var id = Blockly.Python.valueToCode(this, 'ID', Blockly.Python.ORDER_ATOMIC);
    var code = '';    
    Blockly.Python.definitions_['import_huskylens'] = 'import huskylens';
    code = v + '.command_request_learn_once('+id+')\n';
    return code;
};

Blockly.Python.huskylens_command_request_forget=function(){
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);  
    var code = '';    
    Blockly.Python.definitions_['import_huskylens'] = 'import huskylens';
    code = v + '.command_request_forget()\n';
    return code;
};

Blockly.Python.huskylens_command_request_customnames=function(){
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);    
    var id = Blockly.Python.valueToCode(this, 'ID', Blockly.Python.ORDER_ATOMIC);
    var name = Blockly.Python.valueToCode(this, 'NAME', Blockly.Python.ORDER_ATOMIC);
    var code = '';    
    Blockly.Python.definitions_['import_huskylens'] = 'import huskylens';
    code = v + '.command_request_customnames('+name + ','+id+')\n';
    return code;
};

Blockly.Python.huskylens_command_request_custom_text=function(){
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);    
    var x = Blockly.Python.valueToCode(this, 'x', Blockly.Python.ORDER_ATOMIC);
    var y = Blockly.Python.valueToCode(this, 'y', Blockly.Python.ORDER_ATOMIC);
    var name = Blockly.Python.valueToCode(this, 'NAME', Blockly.Python.ORDER_ATOMIC);
    var code = '';    
    Blockly.Python.definitions_['import_huskylens'] = 'import huskylens';
    code = v + '.command_request_custom_text('+name + ','+x+ ','+y+')\n';
    return code;
};

Blockly.Python.huskylens_command_request_clear_text=function(){
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);      
    var code = '';    
    Blockly.Python.definitions_['import_huskylens'] = 'import huskylens';
    code = v + '.command_request_clear_text()\n';
    return code;
};

Blockly.Python.huskylens_command_request_photo_screenshot=function(){
    var ctype = this.getFieldValue('CTYPE');
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);      
    var code = '';    
    Blockly.Python.definitions_['import_huskylens'] = 'import huskylens';
    code = v + '.command_request_'+ctype+'()\n';
    return code;
};

Blockly.Python.huskylens_save_load_model_to_SD_card=function(){
    var ctype = this.getFieldValue('CTYPE');
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);   
    var num = Blockly.Python.valueToCode(this, 'num', Blockly.Python.ORDER_ATOMIC);      
    var code = '';    
    Blockly.Python.definitions_['import_huskylens'] = 'import huskylens';
    code = v + '.command_request_'+ctype+'_model_to_SD_card('+num+')\n';
    return code;
};