'use strict';

goog.provide('Blockly.Python.display');
goog.require('Blockly.Python');

Blockly.Python.display_matrix_use_i2c_init = function () {
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var iv = Blockly.Python.valueToCode(this, 'I2CSUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue("key");
    var code;
    if (key=='12x32 Matrix') {
      Blockly.Python.definitions_['import_matrix32x12'] = 'import matrix32x12';
      code = v + ' = matrix32x12.Matrix(' + iv+ ')\n';
    }else if (key=='TM1637') {
      Blockly.Python.definitions_['import_tm1637'] = 'import tm1637';
      code = v + ' = tm1637.' + key + "("+ iv+ ')\n';
    }
    return code;
};



Blockly.Python.display_onoff = function () {
    var code = (this.getFieldValue('ONOFF') == 'ON') ? '1' : '0';
    return [code, Blockly.Python.ORDER_ATOMIC];
};



Blockly.Python.display_tm_use_i2c_init = function () {
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var iv = Blockly.Python.valueToCode(this, 'I2CSUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue("key");
    var code;
    if (key=='TM1650') {
      Blockly.Python.definitions_['import_tm1650'] = 'import tm1650';
      code = v + ' = tm1650.' + key + "("+ iv+ ')\n';
    }else if (key=='TM1637') {
      Blockly.Python.definitions_['import_tm1637'] = 'import tm1637';
      code = v + ' = tm1637.' + key + "("+ iv+ ')\n';
    }
    return code;
};

Blockly.Python.display_tm1650_power = function () {
    // var type = this.getFieldValue("TYPE");
    var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var stat = this.getFieldValue("STAT");
    var code = v + '.' + stat +"()\n";
    return code;
};

Blockly.Python.display_tm1650_show_num = function () {
    // var type = this.getFieldValue("TYPE");
    var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var val = Blockly.Python.valueToCode(this, 'VALUE', Blockly.Python.ORDER_ATOMIC);
    var code = v + ".shownum(" + val +")\n";
    return code;
};

Blockly.Python.display_tm1650_show_dot = function () {
    // var type = this.getFieldValue("TYPE");
    var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var n = Blockly.Python.valueToCode(this, 'NO', Blockly.Python.ORDER_ATOMIC);
    var stat = Blockly.Python.valueToCode(this, 'STAT', Blockly.Python.ORDER_ATOMIC);
    var code = v + '.showDP(' + n +", "+stat+")\n";
    return code;
};

Blockly.Python.display_tm1650_set_brightness = function () {
    // var type = this.getFieldValue("TYPE");
    var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var val = Blockly.Python.valueToCode(this, 'VALUE', Blockly.Python.ORDER_ATOMIC);
    var code = v + ".intensity(" + val +")\n";
    return code;
};



