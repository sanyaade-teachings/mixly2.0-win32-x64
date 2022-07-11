'use strict';

goog.provide('Blockly.Blocks.display');
goog.require('Blockly.Blocks');

Blockly.Blocks.display.HUE = 180;

Blockly.FieldColour.COLOURS = ['#f00', '#000'];
Blockly.FieldColour.COLUMNS = 2;

Blockly.Blocks.display_show_image = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
  this.appendValueInput('data')
        .setCheck([String, "esp32_image","List",'Tuple'])
        .appendField(Blockly.MIXLY_ESP32_SHOW_IMAGE_OR_STRING);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.OLED_BITMAP_OR_STRING);
  }
};

 Blockly.Blocks.display_show_image_or_string_delay = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendValueInput('data')
        .setCheck(String)
        .appendField(Blockly.OLED_DRAWSTR);
    this.appendValueInput("space")
        .setCheck(Number)
        .appendField(Blockly.MICROPYTHON_DISPLAY_FONT_SPACE);   
    this.appendDummyInput("")
      .appendField(Blockly.Msg.TEXT_CENTER)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.MICROPYTHON_DISPLAY_YES, "True"],
                [Blockly.MICROPYTHON_DISPLAY_NO, "False"]
            ]), 'center')     
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_ESP32_SHOW_IMAGE_OR_STRING_DELAY);
  }
};

Blockly.Blocks.display_scroll_string = {
   init: function() {
     this.setColour(Blockly.Blocks.display.HUE);
     this.appendValueInput('data')
         .setCheck(String)
         .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SCROLL_STRING);
     this.setPreviousStatement(true, null);
     this.setNextStatement(true, null);
     this.setInputsInline(true);
   }
 };

Blockly.Blocks.display_scroll_string_delay = {
   init: function() {
     this.setColour(Blockly.Blocks.display.HUE);
     this.appendValueInput('data')
         .setCheck(String)
         .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SCROLL_STRING);
     this.appendValueInput("space")
        .setCheck(Number)
        .appendField(Blockly.MICROPYTHON_DISPLAY_FONT_SPACE);       
     this.appendValueInput("time")
        .setCheck(Number)
        .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SCROLL_INTERVAL);    
     this.setPreviousStatement(true, null);
     this.setNextStatement(true, null);
     this.setInputsInline(true);
     this.setTooltip(Blockly.MIXLY_ESP32_SCROLL_IMAGE_OR_STRING_DELAY);
   }
 };

Blockly.Blocks.display_show_frame_string = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
  this.appendValueInput('data')
        .setCheck(String)
        .appendField(Blockly.MIXLY_ESP32_MONITOR_SHOW_FRAME);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
  }
};

Blockly.Blocks.display_show_frame_string_delay = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendValueInput('data')
        .setCheck(String)
        .appendField(Blockly.MIXLY_ESP32_MONITOR_SHOW_FRAME);
    this.appendValueInput("time")
        .setCheck(Number)
        .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SCROLL_INTERVAL);        
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
  }
};

Blockly.Blocks['display_image_create']= {
  init: function() {
    this.appendDummyInput('')
        .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_CREATE_IMAGE)    
    for (let i = 0; i < 12; i++) {
      let dummyInputObj = this.appendDummyInput();
      for (let j = 0; j < 32; j++) {
        dummyInputObj.appendField(new Blockly.FieldColour("#000000"), i + '-' + j);
      }
    }
    this.setOutput(true);
    this.setColour(Blockly.Blocks.display.HUE);
    this.setTooltip(Blockly.MIXLY_MICROBIT_Create_image1);
  }
};

Blockly.Blocks['display_image_builtins'] = {
  init : function () {
    this.jsonInit({
      "colour" : Blockly.Blocks.display.HUE,
      "args0" : [{
          "name" : "image",
          "options" : [["HEART", "HEART"],["HEART_SMALL", "HEART_SMALL"],["HAPPY", "HAPPY"],["SAD", "SAD"],["SMILE", "SMILE"],["SILLY", "SILLY"],["FABULOUS", "FABULOUS"],["SURPRISED", "SURPRISED"],["ASLEEP", "ASLEEP"],["ANGRY", "ANGRY"],["CONFUSED", "CONFUSED"],["NO", "NO"],["YES", "YES"]
         // ,["LEFT_ARROW", "LEFT_ARROW"],["RIGHT_ARROW", "RIGHT_ARROW"],["DRESS", "DRESS"],["TRANSFORMERS", "TRANSFORMERS"],["SCISSORS", "SCISSORS"],["EXIT", "EXIT"],["TREE", "TREE"],["PACMAN", "PACMAN"],["TARGET", "TARGET"],["TSHIRT", "TSHIRT"],["ROLLERSKATE", "ROLLERSKATE"],["DUCK", "DUCK"],["HOUSE", "HOUSE"],["TORTOISE", "TORTOISE"],["BUTTERFLY", "BUTTERFLY"],["STICKFIGURE", "STICKFIGURE"],["GHOST", "GHOST"],["PITCHFORK", "PITCHFORK"],["MUSIC_QUAVERS", "MUSIC_QUAVERS"],["MUSIC_QUAVER", "MUSIC_QUAVER"],["MUSIC_CROTCHET", "MUSIC_CROTCHET"],["COW", "COW"],["RABBIT", "RABBIT"],["SQUARE_SMALL", "SQUARE_SMALL"],["SQUARE", "SQUARE"],["DIAMOND_SMALL", "DIAMOND_SMALL"],["DIAMOND", "DIAMOND"],["CHESSBOARD", "CHESSBOARD"],["TRIANGLE_LEFT", "TRIANGLE_LEFT"],["TRIANGLE", "TRIANGLE"],["SNAKE", "SNAKE"],["UMBRELLA", "UMBRELLA"],["SKULL", "SKULL"],["GIRAFFE", "GIRAFFE"],["SWORD", "SWORD"]
          ],
          "type" : "field_dropdown"
        }
      ],
      "output" : ["esp32_image", "List"],
      "helpUrl" : "https://microbit-micropython.readthedocs.io/en/latest/image.html#attributes",
      "tooltip" : Blockly.MIXLY_MICROBIT_Built_in_image1,
      "message0" : Blockly.MIXLY_MICROBIT_Built_in_image
    });
  }
};

Blockly.Blocks['image_arithmetic'] = {
  init: function() {
    var OPERATORS =
        [[Blockly.MICROBIT_DISPLAY_UNION, 'add'],
         [Blockly.MICROBIT_DISPLAY_MINUS, 'sub']];
    this.setColour(Blockly.Blocks.display.HUE);
    this.setOutput(true, "esp32_image");
    this.appendValueInput('A')
        // .setCheck(["esp32_image", "List", String])
        .appendField(Blockly.MICROBIT_DISPLAY_MERGE_SHAPE);
    this.appendValueInput('B')
        // .setCheck(["esp32_image", "List", String])
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setInputsInline(true);
    var thisBlock = this;
        this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('OP');
        var TOOLTIPS = {
        '+':Blockly.MIXLY_MICROBIT_image_add,
        '-':Blockly.MIXLY_MICROBIT_image_reduce
      };
      return TOOLTIPS[mode];
    });
  }
};

Blockly.Blocks.image_invert = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendValueInput('A')
        .setCheck("esp32_image")
        .appendField(Blockly.MIXLY_MICROBIT_Invert_image1);
    this.setInputsInline(true);
    this.setOutput(true, "esp32_image");
  }
};

Blockly.Blocks['display_shift'] = {
  init: function() {
    var OPERATORS =
        [[Blockly.MIXLY_UP, 'shift_up'],
         [Blockly.MIXLY_DOWN, 'shift_down'],
         [Blockly.MIXLY_LEFT, 'shift_left'],
         [Blockly.MIXLY_RIGHT, 'shift_right'],
        ];
    //this.setHelpUrl(Blockly.Msg.MATH_TRIG_HELPURL);
    this.setColour(Blockly.Blocks.display.HUE);
    // this.setOutput(true);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.appendDummyInput('')
        .appendField(Blockly.Msg.DISPLAY_IMAGE_LET)
    this.appendDummyInput('')
        .appendField(Blockly.Msg.DISPLAY_IMAGE_LET2)
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.appendValueInput('val')
        .appendField(Blockly.Msg.DISPLAY_IMAGE_SHIFT)
        .setCheck(Number);
    this.appendDummyInput('')
        .appendField(Blockly.Msg.DISPLAY_IMAGE_UNIT)
    var thisBlock = this;
        this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('OP');
        var mode0 = Blockly.Msg.DISPLAY_IMAGE_LET;
        var mode1 = Blockly.Msg.DISPLAY_IMAGE_LET2;
        var mode2 = Blockly.Msg.DISPLAY_IMAGE_LET3;
        var TOOLTIPS = {
        'up': Blockly.MIXLY_UP,
        'down':Blockly.MIXLY_DOWN,
        'left':Blockly.MIXLY_LEFT,
        'right':Blockly.MIXLY_RIGHT
      };
      return mode0 + mode1 +TOOLTIPS[mode]+mode2;
    });
  }
};

Blockly.Blocks.display_get_pixel = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
      this.appendValueInput('x')
        .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_GET_POINT_X);
      this.appendValueInput('y')
          .setCheck(Number)
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_PLOT_POINT_Y);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_ESP32_JS_MONITOR_GET_POINT);
    this.setInputsInline(true);
      this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_ESP32_JS_MONITOR_BRIGHTNESS);
  }
};

Blockly.Blocks.display_bright_point = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendValueInput('x')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_ESP32_JS_MONITOR_SET_BRIGHTNESS)
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_GET_POINT_X);
    this.appendValueInput('y')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_PLOT_POINT_Y);
    this.appendValueInput("STAT")        
        .setCheck([Number,Boolean]);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_ESP32_DISPLAY_SETPIXEL);
  }
};

Blockly.Blocks.display_get_screen_pixel = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_ESP32_JS_MONITOR_GET_SCREEN_BRIGHTNESS);
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_ESP32_JS_MONITOR_GET_SCREEN_BRIGHTNESS);
  }
};

Blockly.Blocks.display_bright_screen = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
  this.appendValueInput('x')
      .setCheck(Number)
      .appendField(Blockly.MIXLY_ESP32_JS_MONITOR_SET_SCREEN_BRIGHTNESS)
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setInputsInline(true);
  this.setTooltip(Blockly.MIXLY_ESP32_JS_MONITOR_SET_SCREEN_BRIGHTNESS + ' 0.0-1.0');
  }
};

Blockly.Blocks.display_clear = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
  this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_Clear_display);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setInputsInline(true);
  this.setTooltip(Blockly.MIXLY_MICROBIT_Clear_display);
  }
};







//mixgo_me onboard_matrix below:



Blockly.Blocks['mixgome_display_image_create']= {
  init: function() {
    this.appendDummyInput('')
        .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_CREATE_IMAGE)    
    for (let i = 0; i < 5; i++) {
      let dummyInputObj = this.appendDummyInput();
      for (let j = 0; j < 8; j++) {
        dummyInputObj.appendField(new Blockly.FieldColour("#000000"), i + '-' + j);
      }
    }
    this.setOutput(true);
    this.setColour(Blockly.Blocks.display.HUE);
    this.setTooltip(Blockly.MIXLY_MICROBIT_Create_image1);
  }
};




Blockly.Blocks['mixgome_display_font'] = {
  init: function() {
    var OPERATORS =
        [['4x5'+Blockly.MIXGO_ME_DISPLAY_HORIZONTAL, '1'],
         ['5x8'+Blockly.MIXGO_ME_DISPLAY_VERTICAL, '2']];
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput()
        .appendField(Blockly.OLED_SET_FONT)
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    
  }
};