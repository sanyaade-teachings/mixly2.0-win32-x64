'use strict';

goog.provide('Blockly.Python.communicate');
goog.require('Blockly.Python');

Blockly.Python.communicate_i2c_init = function () {
	Blockly.Python.definitions_['import_machine'] = 'import machine';
	var dropdown_pin1 = Blockly.Python.valueToCode(this, 'RX',Blockly.Python.ORDER_ATOMIC);
    var dropdown_pin2 = Blockly.Python.valueToCode(this, 'TX',Blockly.Python.ORDER_ATOMIC);
    var freq = Blockly.Python.valueToCode(this, 'freq', Blockly.Python.ORDER_ATOMIC);
    var sub = Blockly.Python.valueToCode(this, 'SUB',Blockly.Python.ORDER_ATOMIC);
    return ""+sub+" = machine.SoftI2C(scl = machine.Pin(" + dropdown_pin2 + "), sda = machine.Pin(" + dropdown_pin1 + "), freq = " + freq + ")\n";
};

Blockly.Python.communicate_i2c_read = function(){
    var name = Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var address = Blockly.Python.valueToCode(this, 'address', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
   	return [""+name+".readfrom(" + address + ", " + data +  ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communicate_i2c_write = function(){
    var name = Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var address = Blockly.Python.valueToCode(this, 'address', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    return ""+name+".writeto("+ address + ", " + data + ")\n";
};

Blockly.Python.communicate_i2c_scan = function(){
    var name = Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    return [""+name+".scan()", Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.communicate_i2c_master_read = function () {
    var name = Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var code = ""+name+".read()";
    return [code, Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.communicate_i2c_available = function () {
   
    var name = Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var code = ""+name+".available()";
    return [code, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.i2c_slave_onreceive = function () {
    var pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.setups_['setup_i2c_' + pin] = 'Wire.begin(' + pin + ');';
    Blockly.Python.setups_['setup_i2c_onReceive_' + pin] = 'Wire.onReceive(i2cReceiveEvent_' + pin + ');';
    var funcName = 'i2cReceiveEvent_' + pin;
    var branch = Blockly.Python.statementToCode(this, 'DO');
    var code2 = 'void' + ' ' + funcName + '(int howMany) {\n' + branch + '}\n';
    Blockly.Python.definitions_[funcName] = code2;
    return '';
}
Blockly.Python.communicate_spi_init= function(block) {
	Blockly.Python.definitions_['import_machine'] = 'import machine';	
    var name=Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var freq=Blockly.Python.valueToCode(this, 'freq', Blockly.Python.ORDER_ATOMIC);    
    var mosi = Blockly.Python.valueToCode(this, 'mosi', Blockly.Python.ORDER_ATOMIC);
    var miso = Blockly.Python.valueToCode(this, 'miso', Blockly.Python.ORDER_ATOMIC);
    var sck = Blockly.Python.valueToCode(this, 'sck', Blockly.Python.ORDER_ATOMIC);
    return ""+name+" = machine.SoftSPI(baudrate=" + freq + ", sck=machine.Pin(" + sck + "), mosi=machine.Pin(" + mosi + "), miso=machine.Pin(" + miso + "));\n";
}

Blockly.Python.communicate_spi_set = function() {   
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    return "spi.init(baudrate=" + data + ")\n";
}

Blockly.Python.communicate_spi_buffer = function() {   
    var varname = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    return ""+varname+"=bytearray(" + data + ")\n";
}

Blockly.Python.communicate_spi_read = function() {   
    var varname = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    return [""+varname+".read(" + data + ")", Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.communicate_spi_read_output = function() {   
    var varname = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    var val = Blockly.Python.valueToCode(this, 'val', Blockly.Python.ORDER_ATOMIC);
    return [""+varname+".read(" + data + ","+val+")", Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.communicate_spi_readinto = function() {   
    var varname = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    return [""+varname+".readinto(" + data + ")", Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.communicate_spi_readinto_output = function() {   
    var varname = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    var val = Blockly.Python.valueToCode(this, 'val', Blockly.Python.ORDER_ATOMIC);
    return [""+varname+".readinto(" + data + ","+val+")", Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.communicate_spi_write = function() {   
    var varname = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    return [""+varname+".write(" + data + ".encode('utf-8'))", Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.communicate_spi_write_readinto = function() {   
    var varname = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    var val = Blockly.Python.valueToCode(this, 'val', Blockly.Python.ORDER_ATOMIC);
    // var op=this.getFieldValue('op');
    // if(op=="byte"){
      return [""+varname+".write_readinto(" + data + ".encode('utf-8'),"+val+")", Blockly.Python.ORDER_ATOMIC];
    // }else{
    //   return [""+varname+".write_readinto(" + data + ","+val+")", Blockly.Python.ORDER_ATOMIC];
    // }
}

Blockly.Python.communicate_ow_init = function () {
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_onewire'] = "import onewire";
    var name = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var varName =Blockly.Python.valueToCode(this, 'BUS',Blockly.Python.ORDER_ATOMIC);
    var code = ""+name+"=onewire.OneWire(machine.Pin("+varName+"))\n";
    return code;
};

Blockly.Python.communicate_ow_scan = function () {
    var name = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var code = ""+name+".scan()";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communicate_ow_reset = function () {
    var name = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var code = ""+name+".reset()\n";
    return code;
};

Blockly.Python.communicate_ow_read = function () {
    var name = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var code = ""+name+".readbyte()";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communicate_ow_write = function () {
    var varName =Blockly.Python.valueToCode(this, 'byte',Blockly.Python.ORDER_ATOMIC);
    var name = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var op=this.getFieldValue('op');
    var code = ""+name+"."+op+"("+varName+")\n";
    return code;
};

Blockly.Python.communicate_ow_select = function () {
    var varName =Blockly.Python.valueToCode(this, 'byte',Blockly.Python.ORDER_ATOMIC);
    var name = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var code = ""+name+".select_rom(" + varName + ".encode('utf-8'))\n";
    return code;
};

Blockly.Python.communicate_ir_recv = function(){
    Blockly.Python.definitions_['import_ir_remote'] = 'import ir_remote';   
    var pin = Blockly.Python.valueToCode(this, 'PIN',Blockly.Python.ORDER_ATOMIC);
    var sub = Blockly.Python.valueToCode(this, 'SUB',Blockly.Python.ORDER_ATOMIC);
    return "ir_remote.IRrecv("+pin+", "+sub+")\n"
};

Blockly.Python.communicate_ir_send = function(){
    Blockly.Python.definitions_['import_ir_remote'] = 'import ir_remote';   
    var pin = Blockly.Python.valueToCode(this, 'PIN',Blockly.Python.ORDER_ATOMIC);
    var sub = Blockly.Python.valueToCode(this, 'SUB',Blockly.Python.ORDER_ATOMIC);
    var addr = Blockly.Python.valueToCode(this, 'ADDR',Blockly.Python.ORDER_ATOMIC);
    return "ir_remote.IRsend("+pin+", "+addr+", "+sub+")\n"
};

Blockly.Python.communicate_bluetooth_central_init = function(){
    Blockly.Python.definitions_['import_ble_central'] = 'import ble_central';   
    var name = Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);    
    var code = name+" = ble_central.BLESimpleCentral()\n";
    return code;
};

Blockly.Python.communicate_bluetooth_peripheral_init = function(){
    Blockly.Python.definitions_['import_ble_peripheral'] = 'import ble_peripheral';  
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC); 
    var name = Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);    
    var code = name+" = ble_peripheral.BLESimplePeripheral(" + data + ")\n";
    return code;
};

Blockly.Python.communicate_bluetooth_scan = function(){
    var name = Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var code = name+".scan()";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communicate_bluetooth_connect = function(){
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    var name = Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);    
    var code = name+".connect(" + data + ")\n";
    return code;
};

Blockly.Python.communicate_bluetooth_is_connected = function(){
    var name = Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var code = name+".is_connected()";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communicate_bluetooth_send = function(){
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    var name = Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);    
    var code = name+".send(" + data + ")\n";
    return code;
};

Blockly.Python.communicate_bluetooth_recv = function (block) {
    var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var method = Blockly.Python.valueToCode(this, 'METHOD', Blockly.Python.ORDER_ATOMIC);
    var code = v + '.recv('+ method +')\n';
    return code;
};

//espnow
Blockly.Python.communicate_espnow_init = function () {
    Blockly.Python.definitions_['import_radio'] = "import radio";
    var name = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var varName =Blockly.Python.valueToCode(this, 'CHNL',Blockly.Python.ORDER_ATOMIC);
    var code = ""+name+"=radio.ESPNow(channel="+varName+")\n";
    return code;
};

Blockly.Python.network_espnow_mac= function() {
    Blockly.Python.definitions_['import_radio'] = "import radio";
    var name = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    return [name+".mac", Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.network_espnow_info= function() {
    Blockly.Python.definitions_['import_radio'] = "import radio";
    var name = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    return [name+".info()", Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.network_espnow_recv= function() {
    Blockly.Python.definitions_['import_radio'] = "import radio";
    var mode=this.getFieldValue('mode');
    var name = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var code = name+".recv()"+mode;
    return [code, Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.network_espnow_send= function() {
    Blockly.Python.definitions_['import_radio'] = "import radio";
    var name = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var mac =Blockly.Python.valueToCode(this, 'mac',Blockly.Python.ORDER_ATOMIC);
    var content =Blockly.Python.valueToCode(this, 'content',Blockly.Python.ORDER_ATOMIC);
    var code = name+".send("+mac+","+content+")\n";
    return code;
}

Blockly.Python.network_espnow_recv_handle = function (block) {
    Blockly.Python.definitions_['import_radio'] = "import radio";
    var name = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var method = Blockly.Python.valueToCode(this, 'METHOD', Blockly.Python.ORDER_ATOMIC);
    var code = name+".recv_cb("+method+")\n";
    return code;
};

//radio
Blockly.Python.espnow_radio_channel = function () {
    Blockly.Python.definitions_['import_radio'] = "import radio";
    Blockly.Python.definitions_['ESPNow_radio_initialize'] = "ESPNow_radio=radio.ESPNow(channel=0)";
    var varName =Blockly.Python.valueToCode(this, 'CHNL',Blockly.Python.ORDER_ATOMIC);
    var code = "ESPNow_radio.set_channel("+varName+")\n";
    return code;
};

Blockly.Python.espnow_radio_on_off = function () {
    Blockly.Python.definitions_['import_radio'] = "import radio";
    Blockly.Python.definitions_['ESPNow_radio_initialize'] = "ESPNow_radio=radio.ESPNow(channel=0)";
    var op = this.getFieldValue('on_off');
    var code = "ESPNow_radio.active("+op+")\n";
    return code;
};

Blockly.Python.espnow_radio_send = function () {
    Blockly.Python.definitions_['import_radio'] = "import radio";
    Blockly.Python.definitions_['ESPNow_radio_initialize'] = "ESPNow_radio=radio.ESPNow(channel=0)";
    var varName =Blockly.Python.valueToCode(this, 'send',Blockly.Python.ORDER_ATOMIC);
    var code = 'ESPNow_radio.send("ffffffffffff",'+varName+")\n";
    return code;
};

Blockly.Python.espnow_radio_rec= function() {
    Blockly.Python.definitions_['import_radio'] = "import radio";
    Blockly.Python.definitions_['ESPNow_radio_initialize'] = "ESPNow_radio=radio.ESPNow(channel=0)";
    var code = "ESPNow_radio.recv()";
    return [code, Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.espnow_radio_recv_msg= function() {
    var code = "ESPNow_radio_msg";
    return [code, Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.espnow_radio_recv= function(block) {
    Blockly.Python.definitions_['import_radio'] = "import radio";
    Blockly.Python.definitions_['ESPNow_radio_initialize'] = "ESPNow_radio=radio.ESPNow(channel=0)";
    var doCode = Blockly.Python.statementToCode(block, 'DO') || Blockly.Python.PASS;
    Blockly.Python.definitions_['def_ESPNow_radio_recv'] = 'def ESPNow_radio_recv(mac,ESPNow_radio_msg):\n' + doCode;
    Blockly.Python.definitions_['ESPNow_radio_recv_cb'] = "ESPNow_radio.recv_cb(ESPNow_radio_recv)\n";
    
    return '';
}

Blockly.Blocks['i2c_init'] = Blockly.Blocks['communicate_i2c_init'];
Blockly.Blocks['i2c_read'] = Blockly.Blocks['communicate_i2c_read'];
Blockly.Blocks['i2c_write'] = Blockly.Blocks['communicate_i2c_write'];
Blockly.Blocks['i2c_scan'] = Blockly.Blocks['communicate_i2c_scan'];
Blockly.Blocks['spi_init'] = Blockly.Blocks['communicate_spi_init'];
Blockly.Blocks['spi_set'] = Blockly.Blocks['communicate_spi_set'];
Blockly.Blocks['spi_buffer'] = Blockly.Blocks['communicate_spi_buffer'];
Blockly.Blocks['spi_read'] = Blockly.Blocks['communicate_spi_read'];
Blockly.Blocks['spi_read_output'] = Blockly.Blocks['communicate_spi_read_output'];
Blockly.Blocks['spi_readinto'] = Blockly.Blocks['communicate_spi_readinto'];
Blockly.Blocks['spi_readinto_output'] = Blockly.Blocks['communicate_spi_readinto_output'];
Blockly.Blocks['spi_write'] = Blockly.Blocks['communicate_spi_write'];
Blockly.Blocks['spi_write_readinto'] = Blockly.Blocks['communicate_spi_write_readinto'];
Blockly.Blocks.i2c_master_reader2 = Blockly.Blocks.communicate_i2c_master_read;
Blockly.Blocks.i2c_available = Blockly.Blocks.communicate_i2c_available;