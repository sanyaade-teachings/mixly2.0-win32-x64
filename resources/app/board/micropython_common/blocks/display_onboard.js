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

Blockly.Blocks['mixgo_display_image_create_new']= {
  init: function() {
    this.appendDummyInput('')
        .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_CREATE_IMAGE)    
    for (let i = 0; i < 8; i++) {
      let dummyInputObj = this.appendDummyInput();
      for (let j = 0; j < 16; j++) {
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



//mpython

Blockly.Blocks.onboard_oled_show_image = {
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

Blockly.Blocks.onboard_oled_show_string = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
  this.appendValueInput('data')
        .setCheck([String, "esp32_image","List",'Tuple'])
        .appendField(Blockly.OLED_DRAWSTR);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.OLED_BITMAP_OR_STRING);
  }
};

 Blockly.Blocks.onboard_oled_show_image_or_string_delay = {
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

Blockly.Blocks.onboard_oled_scroll_string = {
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

Blockly.Blocks.onboard_oled_scroll_string_delay = {
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

Blockly.Blocks.onboard_oled_show_frame_string = {
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

Blockly.Blocks.onboard_oled_show_frame_string_delay = {
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



Blockly.Blocks['mpython_pbm_image'] = {
  init: function () {
    this.jsonInit({
      "colour": Blockly.Blocks.display.HUE,
      "args0": [
        /*{
          "type": "field_image",
          "name": "file_image",
          "src": "static/face/1.png",
          "width": 128,
          "height": 64,
          "alt": "*"
        },*/
        {
          "name": "path",
          "options": [
            [Blockly.Msg.MPYTHON_FACE_1, 'face/1.pbm'],
            [Blockly.Msg.MPYTHON_FACE_2, 'face/2.pbm'],
            [Blockly.Msg.MPYTHON_FACE_3, 'face/3.pbm'],
            [Blockly.Msg.MPYTHON_FACE_4, 'face/4.pbm'],
            [Blockly.Msg.MPYTHON_FACE_5, 'face/5.pbm'],
            [Blockly.Msg.MPYTHON_FACE_6, 'face/6.pbm'],
            [Blockly.Msg.MPYTHON_FACE_7, 'face/7.pbm'],
            [Blockly.Msg.MPYTHON_FACE_8, 'face/8.pbm'],
            [Blockly.Msg.MPYTHON_FACE_9, 'face/9.pbm'],
            [Blockly.Msg.MPYTHON_FACE_10, 'face/10.pbm'],
            [Blockly.Msg.MPYTHON_FACE_11, 'face/11.pbm'],
            [Blockly.Msg.MPYTHON_FACE_12, 'face/12.pbm'],
            [Blockly.Msg.MPYTHON_FACE_ROCK, 'face/rock.pbm'],
            [Blockly.Msg.MPYTHON_FACE_ROCK_S, 'face/rock_s.pbm'],
            [Blockly.Msg.MPYTHON_FACE_PAPER, 'face/paper.pbm'],
            [Blockly.Msg.MPYTHON_FACE_PAPER_S, 'face/paper_s.pbm'],
            [Blockly.Msg.MPYTHON_FACE_SCISSORS, 'face/scissors.pbm'],
            [Blockly.Msg.MPYTHON_FACE_SCISSORS_S, 'face/scissors_s.pbm'],
            ['Expressions/Big smile.pbm', 'face/Expressions/Big smile.pbm'],
            ['Expressions/Heart large.pbm', 'face/Expressions/Heart large.pbm'],
            ['Expressions/Heart small.pbm', 'face/Expressions/Heart small.pbm'],
            ['Expressions/Mouth 1 open.pbm', 'face/Expressions/Mouth 1 open.pbm'],
            ['Expressions/Mouth 1 shut.pbm', 'face/Expressions/Mouth 1 shut.pbm'],
            ['Expressions/Mouth 2 open.pbm', 'face/Expressions/Mouth 2 open.pbm'],
            ['Expressions/Mouth 2 shut.pbm', 'face/Expressions/Mouth 2 shut.pbm'],
            ['Expressions/Sad.pbm', 'face/Expressions/Sad.pbm'],
            ['Expressions/Sick.pbm', 'face/Expressions/Sick.pbm'],
            ['Expressions/Smile.pbm', 'face/Expressions/Smile.pbm'],
            ['Expressions/Swearing.pbm', 'face/Expressions/Swearing.pbm'],
            ['Expressions/Talking.pbm', 'face/Expressions/Talking.pbm'],
            ['Expressions/Wink.pbm', 'face/Expressions/Wink.pbm'],
            ['Expressions/ZZZ.pbm', 'face/Expressions/ZZZ.pbm'],
            ['Eyes/Angry.pbm', 'face/Eyes/Angry.pbm'],
            ['Eyes/Awake.pbm', 'face/Eyes/Awake.pbm'],
            ['Eyes/Black eye.pbm', 'face/Eyes/Black eye.pbm'],
            ['Eyes/Bottom left.pbm', 'face/Eyes/Bottom left.pbm'],
            ['Eyes/Bottom right.pbm', 'face/Eyes/Bottom right.pbm'],
            ['Eyes/Crazy 1.pbm', 'face/Eyes/Crazy 1.pbm'],
            ['Eyes/Crazy 2.pbm', 'face/Eyes/Crazy 2.pbm'],
            ['Eyes/Disappointed.pbm', 'face/Eyes/Disappointed.pbm'],
            ['Eyes/Dizzy.pbm', 'face/Eyes/Dizzy.pbm'],
            ['Eyes/Down.pbm', 'face/Eyes/Down.pbm'],
            ['Eyes/Evil.pbm', 'face/Eyes/Evil.pbm'],
            ['Eyes/Hurt.pbm', 'face/Eyes/Hurt.pbm'],
            ['Eyes/Knocked out.pbm', 'face/Eyes/Knocked out.pbm'],
            ['Eyes/Love.pbm', 'face/Eyes/Love.pbm'],
            ['Eyes/Middle left.pbm', 'face/Eyes/Middle left.pbm'],
            ['Eyes/Middle right.pbm', 'face/Eyes/Middle right.pbm'],
            ['Eyes/Neutral.pbm', 'face/Eyes/Neutral.pbm'],
            ['Eyes/Nuclear.pbm', 'face/Eyes/Nuclear.pbm'],
            ['Eyes/Pinch left.pbm', 'face/Eyes/Pinch left.pbm'],
            ['Eyes/Pinch middle.pbm', 'face/Eyes/Pinch middle.pbm'],
            ['Eyes/Pinch right.pbm', 'face/Eyes/Pinch right.pbm'],
            ['Eyes/Tear.pbm', 'face/Eyes/Tear.pbm'],
            ['Eyes/Tired left.pbm', 'face/Eyes/Tired left.pbm'],
            ['Eyes/Tired middle.pbm', 'face/Eyes/Tired middle.pbm'],
            ['Eyes/Tired right.pbm', 'face/Eyes/Tired right.pbm'],
            ['Eyes/Toxic.pbm', 'face/Eyes/Toxic.pbm'],
            ['Eyes/Up.pbm', 'face/Eyes/Up.pbm'],
            ['Eyes/Winking.pbm', 'face/Eyes/Winking.pbm'],
            ['Information/Accept.pbm', 'face/Information/Accept.pbm'],
            ['Information/Backward.pbm', 'face/Information/Backward.pbm'],
            ['Information/Decline.pbm', 'face/Information/Decline.pbm'],
            ['Information/Forward.pbm', 'face/Information/Forward.pbm'],
            ['Information/Left.pbm', 'face/Information/Left.pbm'],
            ['Information/No go.pbm', 'face/Information/No go.pbm'],
            ['Information/Question mark.pbm', 'face/Information/Question mark.pbm'],
            ['Information/Right.pbm', 'face/Information/Right.pbm'],
            ['Information/Stop 1.pbm', 'face/Information/Stop 1.pbm'],
            ['Information/Stop 2.pbm', 'face/Information/Stop 2.pbm'],
            ['Information/Thumbs down.pbm', 'face/Information/Thumbs down.pbm'],
            ['Information/Thumbs up.pbm', 'face/Information/Thumbs up.pbm'],
            ['Information/Warning.pbm', 'face/Information/Warning.pbm'],
            ['Objects/Bomb.pbm', 'face/Objects/Bomb.pbm'],
            ['Objects/Boom.pbm', 'face/Objects/Boom.pbm'],
            ['Objects/Fire.pbm', 'face/Objects/Fire.pbm'],
            ['Objects/Flowers.pbm', 'face/Objects/Flowers.pbm'],
            ['Objects/Forest.pbm', 'face/Objects/Forest.pbm'],
            ['Objects/Light off.pbm', 'face/Objects/Light off.pbm'],
            ['Objects/Light on.pbm', 'face/Objects/Light on.pbm'],
            ['Objects/Lightning.pbm', 'face/Objects/Lightning.pbm'],
            ['Objects/Night.pbm', 'face/Objects/Night.pbm'],
            ['Objects/Pirate.pbm', 'face/Objects/Pirate.pbm'],
            ['Objects/Snow.pbm', 'face/Objects/Snow.pbm'],
            ['Objects/Target.pbm', 'face/Objects/Target.pbm'],
            ['Progress/Bar 0.pbm', 'face/Progress/Bar 0.pbm'],
            ['Progress/Bar 1.pbm', 'face/Progress/Bar 1.pbm'],
            ['Progress/Bar 2.pbm', 'face/Progress/Bar 2.pbm'],
            ['Progress/Bar 3.pbm', 'face/Progress/Bar 3.pbm'],
            ['Progress/Bar 4.pbm', 'face/Progress/Bar 4.pbm'],
            ['Progress/Dial 0.pbm', 'face/Progress/Dial 0.pbm'],
            ['Progress/Dial 1.pbm', 'face/Progress/Dial 1.pbm'],
            ['Progress/Dial 2.pbm', 'face/Progress/Dial 2.pbm'],
            ['Progress/Dial 3.pbm', 'face/Progress/Dial 3.pbm'],
            ['Progress/Dial 4.pbm', 'face/Progress/Dial 4.pbm'],
            ['Progress/Dots 0.pbm', 'face/Progress/Dots 0.pbm'],
            ['Progress/Dots 1.pbm', 'face/Progress/Dots 1.pbm'],
            ['Progress/Dots 2.pbm', 'face/Progress/Dots 2.pbm'],
            ['Progress/Dots 3.pbm', 'face/Progress/Dots 3.pbm'],
            ['Progress/Hourglass 0.pbm', 'face/Progress/Hourglass 0.pbm'],
            ['Progress/Hourglass 1.pbm', 'face/Progress/Hourglass 1.pbm'],
            ['Progress/Hourglass 2.pbm', 'face/Progress/Hourglass 2.pbm'],
            ['Progress/Timer 0.pbm', 'face/Progress/Timer 0.pbm'],
            ['Progress/Timer 1.pbm', 'face/Progress/Timer 1.pbm'],
            ['Progress/Timer 2.pbm', 'face/Progress/Timer 2.pbm'],
            ['Progress/Timer 3.pbm', 'face/Progress/Timer 3.pbm'],
            ['Progress/Timer 4.pbm', 'face/Progress/Timer 4.pbm'],
            ['Progress/Water level 0.pbm', 'face/Progress/Water level 0.pbm'],
            ['Progress/Water level 1.pbm', 'face/Progress/Water level 1.pbm'],
            ['Progress/Water level 2.pbm', 'face/Progress/Water level 2.pbm'],
            ['Progress/Water level 3.pbm', 'face/Progress/Water level 3.pbm'],
            ['System/Accept_1.pbm', 'face/System/Accept_1.pbm'],
            ['System/Accept_2.pbm', 'face/System/Accept_2.pbm'],
            ['System/Alert.pbm', 'face/System/Alert.pbm'],
            ['System/Box.pbm', 'face/System/Box.pbm'],
            ['System/Busy_0.pbm', 'face/System/Busy_0.pbm'],
            ['System/Busy_1.pbm', 'face/System/Busy_1.pbm'],
            ['System/Decline_1.pbm', 'face/System/Decline_1.pbm'],
            ['System/Decline_2.pbm', 'face/System/Decline_2.pbm'],
            ['System/Dot_empty.pbm', 'face/System/Dot_empty.pbm'],
            ['System/Dot_full.pbm', 'face/System/Dot_full.pbm'],
            ['System/Play.pbm', 'face/System/Play.pbm'],
            ['System/Slider_0.pbm', 'face/System/Slider_0.pbm'],
            ['System/Slider_1.pbm', 'face/System/Slider_1.pbm'],
            ['System/Slider_2.pbm', 'face/System/Slider_2.pbm'],
            ['System/Slider_3.pbm', 'face/System/Slider_3.pbm'],
            ['System/Slider_4.pbm', 'face/System/Slider_4.pbm'],
            ['System/Slider_5.pbm', 'face/System/Slider_5.pbm'],
            ['System/Slider_6.pbm', 'face/System/Slider_6.pbm'],
            ['System/Slider_7.pbm', 'face/System/Slider_7.pbm'],
            ['System/Slider_8.pbm', 'face/System/Slider_8.pbm']
          ],
          "type": "field_dropdown"
        },
        {
          "type": "field_label",
          "name": "size_image",
          "text": "64 * 64"
        }
      ],
      "output": "String",
      "helpUrl": '',
      "tooltip": '',
      "message0": '%1 %2'
    });
  }
};