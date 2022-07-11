'use strict';

goog.provide('Blockly.Python.sensor');

goog.require('Blockly.Python');

Blockly.Python.sensor_mixgo_button_is_pressed = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version] = 'import '+version;
    var btn = Blockly.Python.valueToCode(this, 'btn', Blockly.Python.ORDER_ATOMIC);
    var code =  version + '.'+btn + '.is_pressed()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.sensor_mixgo_button_was_pressed = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version] = 'import '+version;
    var btn = Blockly.Python.valueToCode(this, 'btn', Blockly.Python.ORDER_ATOMIC);
    var code =  version + '.'+btn + '.was_pressed()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mixgo_button_get_presses = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version] = 'import '+version;
    var btn = Blockly.Python.valueToCode(this, 'btn', Blockly.Python.ORDER_ATOMIC);
    var argument = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
    var code =   version + '.'+btn + '.get_presses(' + argument + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mixgo_button_attachInterrupt = function () {
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version] = 'import '+version;
    var dropdown_btn = Blockly.Python.valueToCode(this, 'btn', Blockly.Python.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    var atta = Blockly.Python.valueToCode(this, 'DO', Blockly.Python.ORDER_ATOMIC);
    var code =  version + '.' + dropdown_btn + '.irq' + '(handler = ' + atta + ', trigger = ' + dropdown_mode + ')\n'
    return code;
};
//ok


Blockly.Python.HCSR04 = function () {
    Blockly.Python.definitions_['import_sonar'] = 'import sonar';
    var dropdown_pin1 = Blockly.Python.valueToCode(this, "PIN1", Blockly.Python.ORDER_ASSIGNMENT);
    var dropdown_pin2 = Blockly.Python.valueToCode(this, "PIN2", Blockly.Python.ORDER_ASSIGNMENT);
    var code = 'sonar.Sonar(' + dropdown_pin1 + ', ' + dropdown_pin2 + ').checkdist()';
    return [code, Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.sensor_dht11 = function () {
    Blockly.Python.definitions_['import_dhtx'] = 'import dhtx';
    var sensor_type = this.getFieldValue('TYPE');
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var what = this.getFieldValue('WHAT');
    var code ='dhtx.get_dht_'+what+"('"+sensor_type+"', "+dropdown_pin+')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mixgo_light= function(){
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    return ['mixgo.get_brightness()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mixgo_sound= function(){
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    return ['mixgo.get_soundlevel()', Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.number1 = function(){
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var code = this.getFieldValue('op');
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mixgo_pin_pressed = function(){
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var pin = Blockly.Python.valueToCode(this, 'button', Blockly.Python.ORDER_ATOMIC);
    var code = 'mixgo.'+pin+'.is_touched()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mixgo_pin_near = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version+'_onboard_ltr553als'] = "from "+version+" import onboard_ltr553als";
    var code = 'onboard_ltr553als.ps_nl()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_ds18x20=function(){
    Blockly.Python.definitions_['import_ds18x20x'] = 'import ds18x20x';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var code ='ds18x20x.get_ds18x20_temperature('+dropdown_pin+')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_lm35 = function() {
  Blockly.Python.definitions_['import_lm35'] = 'import lm35';
  var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
  var code = 'lm35.get_LM35_temperature(' + dropdown_pin + ')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_LTR308 = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version+'_onboard_ltr553als'] = "from "+version+" import onboard_ltr553als";
    var sub = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var code = 'onboard_ltr553als.als_vis()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_sound = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version+'_onboard_sound'] = 'from '+version+' import onboard_sound';
    var sub = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var code = 'onboard_sound.read()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_hp203=function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var sub = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_'+version+'_onboard_hp203x'] = "from "+version+" import onboard_hp203x";
    var code = 'onboard_hp203x.' + key;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_aht11=function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var sub = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_'+version+'_onboard_ahtx0'] = "from "+version+" import onboard_ahtx0";
    var code = 'onboard_ahtx0.' + key + '()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.rfid_readid=function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_'+version+'_onboard_rc522'] = "from "+version+" import onboard_rc522";
    var code = 'onboard_rc522.read_card(0, x="id")';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.rfid_readcontent=function(){    
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var sector = Blockly.Python.valueToCode(this, 'SECTOR', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_'+version+'_onboard_rc522'] = "from "+version+" import onboard_rc522";
    var code =  'onboard_rc522.read_card('+sector+', x="content")';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.rfid_write=function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    var sector = Blockly.Python.valueToCode(this, 'SECTOR', Blockly.Python.ORDER_ATOMIC);
    var cnt = Blockly.Python.valueToCode(this, 'CONTENT', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_'+version+'_onboard_rc522'] = "from "+version+" import onboard_rc522";
    var code = 'onboard_rc522.write_card('+cnt+','+sector+')\n';
    return code;
};

Blockly.Python.sensor_get_acceleration = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version+'_onboard_mxc6655xa'] = "from "+version+" import onboard_mxc6655xa";
    var key = this.getFieldValue('key');
    var code;
    if (key=='x') {
        code = 'onboard_mxc6655xa.acceleration()[0]';
    }else if (key=='y') {
        code = 'onboard_mxc6655xa.acceleration()[1]';
    }else if (key=='z') {
        code = 'onboard_mxc6655xa.acceleration()[2]';
    }else if (key=='values') {
        code = 'onboard_mxc6655xa.acceleration()';
    }
    return [code, Blockly.Python.ORDER_ATOMIC];
};

//mixgo_me onboard_sensor generators:




Blockly.Python.sensor_mixgome_temperature=function(){
    Blockly.Python.definitions_['import_mixgo_me_onboard_mxc6655xa'] = "from mixgo_me import onboard_mxc6655xa";
    var code = 'onboard_mxc6655xa.temperature()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};




Blockly.Python.sensor_button_is_pressed=Blockly.Python.sensor_mixgo_button_is_pressed;
Blockly.Python.sensor_button_was_pressed=Blockly.Python.sensor_mixgo_button_was_pressed;
Blockly.Python.sensor_button_get_presses=Blockly.Python.sensor_mixgo_button_get_presses;
Blockly.Python.sensor_pin_pressed=Blockly.Python.sensor_mixgo_pin_pressed;
Blockly.Python.sensor_pin_near=Blockly.Python.sensor_mixgo_pin_near;
Blockly.Python.sensor_light=Blockly.Python.sensor_mixgo_light;
//Blockly.Python.sensor_sound=Blockly.Python.sensor_mixgo_sound;
//Blockly.Python.sensor_get_acceleration=Blockly.Python.sensor_mixgo_get_acceleration;
Blockly.Python.dht11=Blockly.Python.sensor_dht11
