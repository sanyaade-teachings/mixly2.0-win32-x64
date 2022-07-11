'use strict';

goog.provide('Blockly.Python.display');
goog.require('Blockly.Python');

Blockly.Python.display_show_image = function() {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version+'_onboard_matrix'] = "from "+version+" import onboard_matrix";
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
    var code = "onboard_matrix.shows(" + data + ")\n";
    return code;
}

Blockly.Python.display_show_image_or_string_delay = function() {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version+'_onboard_matrix'] = "from "+version+" import onboard_matrix";
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
    var space = Blockly.Python.valueToCode(this, 'space', Blockly.Python.ORDER_ASSIGNMENT);
    var op = this.getFieldValue('center');
    var code = "onboard_matrix.shows(" + data + ',space = ' + space + ',center = ' + op  + ")\n";
    return code;
}

Blockly.Python.display_show_frame_string = function() {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version+'_onboard_matrix'] = "from "+version+" import onboard_matrix";
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
    var code = "onboard_matrix.frame(" + data + ")\n";
    return code;
}

Blockly.Python.display_show_frame_string_delay = function() {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version+'_onboard_matrix'] = "from "+version+" import onboard_matrix";
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
    var time = Blockly.Python.valueToCode(this, 'time', Blockly.Python.ORDER_ASSIGNMENT);
    var code = "onboard_matrix.frame(" + data + ',delay = ' + time + ")\n";
    return code;
}

Blockly.Python.display_scroll_string = function() {
     var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
     Blockly.Python.definitions_['import_'+version+'_onboard_matrix'] = "from "+version+" import onboard_matrix";
     var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
     var code = "onboard_matrix.scroll("+ data +")\n";
     return code;
}


Blockly.Python.display_scroll_string_delay = function() {  
     var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
     Blockly.Python.definitions_['import_'+version+'_onboard_matrix'] = "from "+version+" import onboard_matrix";
     var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
     var time = Blockly.Python.valueToCode(this, 'time', Blockly.Python.ORDER_ASSIGNMENT);
     var space = Blockly.Python.valueToCode(this, 'space', Blockly.Python.ORDER_ASSIGNMENT);
     var code = "onboard_matrix.scroll("+ data + ',speed =' + time  + ',space = '+ space + ")\n";
     return code;
}

Blockly.Python['display_image_builtins'] = function(block) {
  var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
     Blockly.Python.definitions_['import_'+version+'_onboard_matrix'] = "from "+version+" import onboard_matrix";
  var dropdown_image = block.getFieldValue('image');
  var code = 'onboard_matrix.' + dropdown_image;
  return [code, Blockly.Python.ORDER_ATOMIC];
};



Blockly.Python['display_image_create'] = function(block) {
  var colours = {
    "#000000": "0",
    //"#440000": "1",
    //"#660000": "2",
    //"#880000": "3",
    //"#aa0000": "4",
    //"#bb0000": "5",
    //"#cc0000": "6",
    //"#dd0000": "7",
    //"#ee0000": "8",
    "#ff0000": "1"
  }
  function pad(num) {
    let newNum = '';
    if(num.length % 2 === 1) {
      num = '0' + num;
    }
    if(num.length < 8) {
      let k=8-num.length
      for (let i = 1; i <= k; i++){
      num = '0' + num;
    }
    }
    
    for (let i = 1; i <= num.length; i++)
      if (i % 2 === 0 && i !== num.length)
        newNum = newNum + num[i - 1] + ',0x';
      else
        newNum += num[i - 1];
    return '0x' + newNum;
  }
  let colorList = [];
  for (let i = 0; i < 12; i++) {
    let colorRow = '';
    let colorNum = 0;  
    let correct=0;
    
    for (let j = 0; j < 32; j++) {
      if(j<8){
        correct = 7-j
      }
      else if(j<16){
        correct = 23-j
      }
      else if(j<24){
        correct = 39-j
      }
       else if(j<32){
        correct = 55-j
      }  
      colorNum += Number(colours[block.getFieldValue(i + '-' + j)]) * Math.pow(2, 31-correct);
      
    }
    colorRow += pad(colorNum.toString(16));
    colorList.unshift(colorRow);
  }
  let codelist = [];
  for (let i = 0; i < colorList.length; i++){
    codelist[i]=colorList[colorList.length-1-i];
  }
  //var code = "bytearray(b'" + colorList.join('') + "')";
  var code = '[' + codelist + ']';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['display_clear'] = function(block) {
  var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
     Blockly.Python.definitions_['import_'+version+'_onboard_matrix'] = "from "+version+" import onboard_matrix";
  var code = 'onboard_matrix.fill(0)\n'+'onboard_matrix.show()\n';
  return code;
};


Blockly.Python['image_arithmetic'] = function(a) {
  var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
     Blockly.Python.definitions_['import_'+version+'_onboard_matrix'] = "from "+version+" import onboard_matrix";
  var op = a.getFieldValue("OP");
  var imga = Blockly.Python.valueToCode(a, 'A', Blockly.Python.ORDER_ATOMIC);
  var imgb = Blockly.Python.valueToCode(a, 'B', Blockly.Python.ORDER_ATOMIC); 
  var code = 'onboard_matrix.map_' +  op + '(' + imga + ',' + imgb +')';  
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['image_invert'] = function(a) {
  var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
     Blockly.Python.definitions_['import_'+version+'_onboard_matrix'] = "from "+version+" import onboard_matrix";
  var imga = Blockly.Python.valueToCode(a, 'A', Blockly.Python.ORDER_ATOMIC);
  var code = 'onboard_matrix.map_invert(' + imga +')';  
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['display_shift'] = function(a) {
  var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
     Blockly.Python.definitions_['import_'+version+'_onboard_matrix'] = "from "+version+" import onboard_matrix";
  var op = a.getFieldValue("OP");
  var value = Blockly.Python.valueToCode(a, 'val', Blockly.Python.ORDER_ATOMIC);
  var code = 'onboard_matrix.' + op + '(' + value + ')\n';
  return code;
};

Blockly.Python['display_get_pixel'] = function(block) {
  var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
  Blockly.Python.definitions_['import_'+version+'_onboard_matrix'] = "from "+version+" import onboard_matrix";
  var value_x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC);
  var value_y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC);
  var code = 'onboard_matrix.pixel(int(' + value_x + '), int(' + value_y + '))';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.display_bright_point= function() {
  var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    Blockly.Python.definitions_['import_'+version+'_onboard_matrix'] = "from "+version+" import onboard_matrix";
    var x = Blockly.Python.valueToCode(this, 'x', Blockly.Python.ORDER_ASSIGNMENT);
    var y = Blockly.Python.valueToCode(this, 'y', Blockly.Python.ORDER_ASSIGNMENT);
    var dropdown_stat = Blockly.Python.valueToCode(this, 'STAT', Blockly.Python.ORDER_ATOMIC);
    var code ='onboard_matrix.pixel(int(' + x + '), int(' + y + '), '+ dropdown_stat + ")\n"+'onboard_matrix.show()\n';
    return code;
}

Blockly.Python['display_get_screen_pixel'] = function() {
  var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
     Blockly.Python.definitions_['import_'+version+'_onboard_matrix'] = "from "+version+" import onboard_matrix";
  var code = 'onboard_matrix.get_brightness()';
  return [code, Blockly.Python.ORDER_ATOMIC];
};



Blockly.Python.display_bright_screen= function() {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
     Blockly.Python.definitions_['import_'+version+'_onboard_matrix'] = "from "+version+" import onboard_matrix";
    var x = Blockly.Python.valueToCode(this, 'x', Blockly.Python.ORDER_ASSIGNMENT);
    var code = 'onboard_matrix.set_brightness(' + x + ')\n';
    return code;
};



//mixgo_me onboard_matrix below:




Blockly.Python['mixgome_display_image_create'] = function(block) {
  var colours = {
    "#000000": "0",
    "#ff0000": "1"
  }
  function pad(num) {
    let newNum = '';
    if(num.length % 2 === 1) {
      num = '0' + num;
    }

    for (let i = 1; i <= num.length; i++)
      if (i % 2 === 0 && i !== num.length)
        newNum = newNum + num[i - 1] + '\\x';
      else
        newNum += num[i - 1];
    return '\\x' + newNum;
  }
  let colorList = [];
  for (let i = 0; i < 5; i++) {
    let colorRow = '';
    let colorNum = 0;
    for (let j = 0; j < 8; j++) {
      colorNum += Number(colours[block.getFieldValue((4-i) + '-' + j)]) * Math.pow(2, j);
    }
    colorRow += pad(colorNum.toString(16));
    colorList.unshift(colorRow);
  }

  var code = "bytearray(b'" + colorList.join('') + "')";
  return [code, Blockly.Python.ORDER_ATOMIC];
};




Blockly.Python['mixgome_display_font'] = function(a) {
  Blockly.Python.definitions_['import_mixgo_me_onboard_matrix'] = "from mixgo_me import onboard_matrix";
  var op = a.getFieldValue("OP");
  var code = 'onboard_matrix.font(' +  op + ')\n';  
  return code;
};

Blockly.Python['mixgo_display_image_create_new'] = function(block) {
  var colours = {
    "#000000": "0",
    "#ff0000": "1"
  }
  function pad(num) {
    let newNum = '';
    if(num.length % 2 === 1) {
      num = '0' + num;
    }
    while(num.length < 4) {
      num =  '0'+num;
    }
    for (let i = 1; i <= num.length; i++)
      if (i % 2 === 0 && i !== num.length)
        newNum = newNum + num[i - 1] + '\\x';
      else
        newNum += num[i - 1];
    return '\\x' + newNum;
  }
  let colorList = [];
  for (let i = 0; i < 8; i++) {
    let colorRow = '';
    let colorNum = 0;
    for (let j = 0; j < 16; j++) {
      var c=(j+8)%16
      colorNum += Number(colours[block.getFieldValue((7-i) + '-' + c)]) * Math.pow(2, j);
    }
    colorRow += pad(colorNum.toString(16));
    colorList.unshift(colorRow);
  }

  var code = "bytearray(b'" + colorList.join('') + "')";
  return [code, Blockly.Python.ORDER_ATOMIC];
};



