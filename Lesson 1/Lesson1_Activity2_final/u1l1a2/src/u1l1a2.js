 window.onload = function()
 {
 var background;
 var question_text_upper;
 var question_text_lower;
 var answer_text1;
 var answer_text2;
 var instruction_board;
 var instruction_text;
 var tray;
 var packets_text = [];
 var cake_num;
 var cake_no;
 var check_child_on_group = [];
 var check_cake_on_plate = [];
 var cakes_on_board = [];
 var no_of_attempts = 0;
 var no_of_attempts1 = 0;
 var plates = [];
 var children = [];
 var cakes = [];
 var check = []; 
 var groups = [];
 var sharing_done_btn;
 var reset_btn;
 var input_answer1;
 var input_answer2;
 var input_answer3;
 var linkofdemo;
 var line1;
 var reg={};
 var help_button;
 var game = new Phaser.Game(800, 640);
 var buttons = ['1_normal','2_normal','3_normal','4_normal','5_normal','6_normal'];
 var rect = [];
 var playGame = function(game){}
 playGame.prototype = 
 {
  init : function()
  {
     game.load = new CustomLoader(game);
  },
  preload : function()
  {
   game.load.image('background','assets/background.png');
   game.load.image('close_button','assets/close_button_normal.png');
   game.load.atlasJSONHash('atlas4', 'assets/atlas4.png', 'assets/atlas4.json'); 
   game.add.plugin(PhaserInput.Plugin);
   game.load.webfont('tahoma','Tahoma');
   game.load.image('help_link','assets/HELP_LINK.png');
   game.load.atlasJSONHash('atlas5','assets/atlas5.png','assets/atlas5.json');
   game.load.atlasJSONHash('answerscreens','assets/answers_l1.png','assets/answers_l1.json');
  },
  create : function()
  {
    reg.modal = new gameModal(game);
        this.createModals();
   background = game.add.sprite(0,0,'background');
   var style = { font: "13px tahoma", fill: "ffff", boundsAlignH: "center", boundsAlignV: "middle" };
   question_text_upper = game.add.text(120,2,'Help Jamuni distribute 12 cakes fairly among 8 children. First, drag and drop the children into two equal groups. Then, distribute the cakes fairly and answer the questions below.',style);
   question_text_lower = game.add.text(22,524,'What is the share of each group?',style);
   question_text_upper.wordWrap = true;
   question_text_upper.wordWrapWidth = 580;
   answer_text1 = game.add.text(22, 552, 'Group A : ', style);
   answer_text2 = game.add.text(220,552, 'Group B : ', style);
   for(var i=0;i<2;i++)
   {
    packets_text = game.add.text(160 + (i*195),552, 'cakes.',style);
   }
   
   tray = game.add.sprite(3,85,'atlas4','TRAY');
   instruction_board = game.add.sprite(2,366,'atlas4','sprite45');
   var style2 = { font: "italic 12px tahoma",fill: "#000066", boundsAlignH: "center", boundsAlignV: "middle" };
   instruction_text = game.add.text(19,390,'Use the                    to cut the cake into smaller pieces and drag and drop the cake or the pieces to each child.',style2);
  instruction_text.wordWrap = true;
  instruction_text.wordWrapWidth = 175;
  var style3 = { font: "bold italic 12px tahoma",fill: "#000066", boundsAlignH: "center", boundsAlignV: "middle" };
  var instruction_text1 = game.add.text(70,390, 'Cutting Tool ',style3);

   //var style1 = {font: "italic bold 12px tahoma", fill: "ffff", boundsAlignH: "center", boundsAlignV: "middle"}
   //instruction_text = game.add.text(19,390,"When you are done, click the Sharing Done button to check your answers. Enter only whole number or fractions",style1);
   //instruction_text.wordWrap = true;
  //instruction_text.wordWrapWidth = 180;
   sharing_done_btn = game.add.button(20,586, 'atlas4',this.final_check_function,this,'sprite68','sprite53','sprite39');
   sharing_done_btn.inputEnabled = false;
   reset_btn = game.add.button(168, 586,'atlas4',this.reset_function,this,'sprite69','sprite58','sprite70');
   //adding plates 

   plates[0] = game.add.sprite(413,203,'atlas4','sprite72');
   plates[1] = game.add.sprite(413,411,'atlas4','sprite72');
   //defining area for plates
  
   rect[0] = game.add.sprite(413,203,null);
   game.physics.enable(rect[0],Phaser.Physics.ARCADE);
   rect[0].body.setSize(360,60,0,0);

   rect[1] = game.add.sprite(413,411,null);
   game.physics.enable(rect[1],Phaser.Physics.ARCADE);
   rect[1].body.setSize(360,60,0,0)
       
   //adding groups
   groups[0] = game.add.sprite(407,81,'atlas4','sprite65');
   groups[1] = game.add.sprite(407,288,'atlas4','sprite54');
   //activating physics for groups
   for(var i=2; i <4; i++)
   {
    rect[i] = game.add.sprite(groups[i-2].x,groups[i-2].y,null);
    game.physics.enable(rect[i],Phaser.Physics.ARCADE);
    rect[i].body.setSize(376,100,0,0);
    groups[i-2].numberof_childreningroup = 0;
    plates[i-2].sum = 0;
   }
   rect[5] = game.add.sprite(239,103,null);
   game.physics.enable(rect[5],Phaser.Physics.ARCADE);
   rect[5].body.setSize(111,240,0,0);
   //initialising sum for each plate 
   for(var k=0;i<2;i++)
   {
    plates[k].sum = 0;
   }
   //adding cakes

   for(var i=0;i<12;i++)
   {
    if(i<6)
    {
    cakes[i] = game.add.sprite(19 + (i*25), 93,'atlas4','sprite57');
    }
    else
    {
    cakes[i] = game.add.sprite(19+((i%6)*25),154,'atlas4','sprite57');
    }
    cakes[i].number = i; 
    cakes[i].anchor.setTo(0,0);  
    game.physics.enable(cakes[i],Phaser.Physics.ARCADE);
    cakes[i].originalPosition = cakes[i].position.clone();   
   }
   

   //adding children
   children[0] = game.add.sprite(248,117,'atlas4','sprite50');
   children[1] = game.add.sprite(301,117,'atlas4','sprite48');
   children[2] = game.add.sprite(248,171,'atlas4','sprite47');
   children[3] = game.add.sprite(301,171,'atlas4','sprite59');
   children[4] = game.add.sprite(248,225,'atlas4','sprite44');
   children[5] = game.add.sprite(301,221,'atlas4','sprite43');
   children[6] = game.add.sprite(248,280,'atlas4','sprite49');
   children[7] = game.add.sprite(301,280,'atlas4','sprite60');
   //enabling drag for children 
   for(var i=0; i <8;i++)
   {
    children[i].inputEnabled = true;
    children[i].input.enableDrag(true);
    children[i].events.onDragStart.add(this.add_glow_to_plates, this);
    children[i].events.onDragStop.add(this.check_grouping,this);
    game.physics.enable(children[i],Phaser.Physics.ARCADE);
    children[i].originalPosition = children[i].position.clone();
    console.log(children[i].originalPosition);
    children[i].num = i;
   }

  
  help_button = game.add.sprite(730,3,'help_link');
  help_button.inputEnabled = true;
  //events.onInputDown.add(this.showModal5,this);
  help_button.events.onInputDown.add(this.help_function,this);
   input_answer1 = game.add.inputField(85, 545, {
    font: '12px Arial',
    fill: '#212121',
    fontWeight: 'bold',
    width: 50,
    padding: 8,
    borderWidth: 2,
    borderColor: '#0EC2F5',
    borderRadius: 6,
    
});
    input_answer2 = game.add.inputField(280, 545, {
    font: '12px Arial',
    fill: '#212121',
    fontWeight: 'bold',
    width: 50,
    padding: 8,
    borderWidth: 2,
    borderColor: '#0EC2F5',
    borderRadius: 6,
    
});
   
   
   
},
  add_glow_to_plates : function()
  {
   
      groups[0].loadTexture('atlas4','BENCH_A_WITH_GLOW');
      groups[1].loadTexture('atlas4','BENCH_B_WITH_GLOW');
    

  },
  check_grouping : function(item)
  {
    var group_name = ['sprite65','sprite54'];
    var child_no = item.num; 
    var c=0;
    var pos1;
    for(var i=0;i<2;i++)
    { 
      check_child_on_group[i] = game.physics.arcade.overlap(children[child_no],rect[i+2]);
      console.log("test"+check_child_on_group);
      if(check_child_on_group[i] == true)
      {
        c++;
        pos1 = i;
      }
    }
      if(c>=1)
      {
        groups[pos1].loadTexture('atlas4',group_name[pos1]);
        //groups[pos1].numberof_childreningroup ++;
      }
      else
      {
        children[child_no].position.copyFrom(children[child_no].originalPosition);
      }
    var c1 = 0;
    for(var r=0;r<8;r++)
    {
    var check_if_children_on_pos = game.physics.arcade.overlap(children[r],rect[5]);
    console.log(check_if_children_on_pos);

    if(check_if_children_on_pos == true)
    {
      c1++;
    }
    }
    if(c1 == 0)
    {
      plates[0].loadTexture('atlas4','BIG_PLATE_WITH_GLOW');
      plates[1].loadTexture('atlas4','BIG_PLATE_WITH_GLOW');

      groups[0].loadTexture('atlas4','sprite65');
      groups[1].loadTexture('atlas4','sprite54');

      cakes[11].loadTexture('atlas4','CAKE_WITH_GLOW');
      cakes[11].x = cakes[11].x - 7;
      cakes[11].y = cakes[11].y - 7;
      for(var i =0;i<12;i++)
      {
        cakes[i].inputEnabled = true;
        cakes[i].input.enableDrag(true);
        //cakes[i].achor.x = 0.5;
        cakes[i].events.onDragStart.add(this.startdragcake, this);
        //cakes[i].input.enableSnap(50,50, false, true);
        cakes[i].events.onDragStop.add(this.stopDragcake,this);

      }
    }

    },
   startdragcake : function(item)
  {
    var cake_no1 = item.number;
    cakes[cake_no1].loadTexture('atlas4','sprite57');
  },
  stopDragcake : function(item)
  {
    var cake_no = item.number; 
    var c2=0;
    var pos2;
    for(var i=0;i<2;i++)
    { 
      check_cake_on_plate[i] = game.physics.arcade.overlap(cakes[cake_no],rect[i]);
      console.log(check_cake_on_plate[i]);
      if(check_cake_on_plate[i] == true)
      {
        c2++;
        pos2 = i;
      }
    }
      if(c2>=1)
      {
        plates[pos2].loadTexture('atlas4','sprite71');
        if(cake_no >0)
        {
        cakes[cake_no-1].loadTexture('atlas4','CAKE_WITH_GLOW');
        cakes[cake_no-1].x = cakes[cake_no-1].x - 7;
        cakes[cake_no-1].y = cakes[cake_no-1].y - 7;
        }
        if(cake_no == 0)
        {
          sharing_done_btn.inputEnabled = true;
        }


      }
      else
      {
        cakes[cake_no].position.copyFrom(cakes[cake_no].originalPosition);
      }
   
  },
  createModals: function() {

    //////// modal 5////////////
      reg.modal.createModal({
        type: "modal1",
        includeBackground: true,
        modalCloseOnInput: true,
        itemsArr: [{
            type: 'sprite',
            atlasParent :'atlas5',
            content : 'sprite2'


          },
          {
            type: "image",
            content: "close_button",
            offsetX: 146,
            offsetY: -83,
            callback: function(){
                      reg.modal.hideModal("modal1");
                    }
        },
        {
          type : "button",
          atlasParent: "answerscreens",
          content: 'NEXT_BUTTON_NORMAL',
          offsetX : 90,
          offsetY: 30,
          callback: function()
          {
            game.state.start('playGame2');
          }

        }, 
         {
          type : 'sprite',
          atlasParent: 'answerscreens',
          content: 'SMILEY_HAPPY',  
          offsetX : 40,
          offsetY:  - 140,
        },

          ]
        
    });
        reg.modal.createModal({
        type: "modal2",
        includeBackground: true,
        modalCloseOnInput: true,
        itemsArr: [{
            type: 'sprite',
            atlasParent :'atlas5',
            content : 'sprite4'

          },
            {
            type: "image",
            content: "close_button",
            offsetX: 205,
            offsetY: -83,
            callback: function(){
                      reg.modal.hideModal("modal2");
                    }},
        {
          type : "button",
          atlasParent: "atlas4",
          content: 'sprite51',
          offsetX : 110,
          offsetY: 30,
          callback: function()
          {
            reg.modal.hideModal("modal2");
          }

        },
        {
          type : 'sprite',
          atlasParent: 'answerscreens',
          content: 'SMILEY_SAD',  
          offsetX : 40,
          offsetY:  - 140,
        }]     
    });
            reg.modal.createModal({
        type: "modal3",
        includeBackground: true,
        modalCloseOnInput: true,
        itemsArr: [{
            type: 'sprite',
            atlasParent :'atlas5',
            content : 'sprite3'

          },
            {
            type: "image",
            content: "close_button",
            offsetX: 208,
            offsetY: -83,
            callback: function(){
                      reg.modal.hideModal("modal3");
                    }},
        {
          type : "button",
          atlasParent: "atlas4",
          content: 'sprite51',
          offsetX : 110,
          offsetY: 30,
          callback: function()
          {
            reg.modal.hideModal("modal3");
          }

        },
        {
          type : 'sprite',
          atlasParent: 'answerscreens',
          content: 'SMILEY_SAD',  
          offsetX : 40,
          offsetY:  - 140,
        }]     
    });
            //modal 4
        reg.modal.createModal({
        type: "modal4",
        includeBackground: true,
        modalCloseOnInput: true,
        itemsArr: [{
            type: 'sprite',
            atlasParent :'atlas5',
            content : 'sprite5'

          },
            {
            type: "image",
            content: "close_button",
            offsetX: 208,
            offsetY: -83,
            callback: function(){
                      reg.modal.hideModal("modal4");
                    }},
        {
          type : "button",
          atlasParent: "atlas4",
          content: 'sprite51',
          offsetX : 90,
          offsetY: 30,
          callback: function()
          {
            reg.modal.hideModal("modal4");
          }

        },
        {
          type : 'sprite',
          atlasParent: 'answerscreens',
          content: 'SMILEY_SAD',  
          offsetX : 40,
          offsetY:  - 140,
        }]
          
        
    });   
  }, 
  showModal1:function() {
    reg.modal.showModal("modal1");
   },
   showModal2: function()
   {
    reg.modal.showModal("modal2");
   },
   showModal3 : function()
   {
    reg.modal.showModal("modal3");
   },
   showModal4 : function()
   {
    reg.modal.showModal("modal4");
   },
   help_function : function()
   {
    window.open("softwares/food_sharing_tool/Lesson%201/Lesson1_Activity1_final/u1l1a1/assets/fraction-chart_copywrite.png");
   },
  final_check_function : function()
  {
    var check_child_on_group1 = [];


    no_of_attempts = no_of_attempts + 1;
    if(no_of_attempts <= 3)
    {
    var final_check_function=[];
    var correct_count = 0;
    console.log(input_answer1.value);
    console.log(input_answer2.value)
   for(var i=0;i<2;i++)
   {
     groups[i].numberof_childreningroup = 0;
     plates[i].sum = 0;
     for(var j1 = 0; j1<8; j1++)
     {
      check_child_on_group1[i] = game.physics.arcade.overlap(children[j1],rect[i+2]);
      if(check_child_on_group1[i] == true)
      {
        groups[i].numberof_childreningroup = groups[i].numberof_childreningroup + 1;
      }
     }
     for(var j =0;j<12;j++)
     {
      final_check_function[j] = game.physics.arcade.overlap(cakes[j],rect[i]);
      console.log(i + "" + final_check_function[j])
      if(final_check_function[j] == true)
      {
        plates[i].sum = plates[i].sum+1;
      }      
     }
     console.log("sum"+ plates[i].sum);
   }
    if(groups[0].numberof_childreningroup == '4' && groups[1].numberof_childreningroup == '4')
    {
    if(plates[0].sum == '6' && plates[1].sum== '6' && input_answer1.value== '6' && input_answer2.value == '6')
    {
      this.showModal1();


    }
    else if(plates[0].sum == '6' && plates[1].sum == '6' && (input_answer1.value!== '6' || input_answer2.value!== '6'))
    { 
      this.showModal3();
      //this.showModal2();
    }
    else if((plates[0].sum!== '6' || plates[1].sum !=='6') && (input_answer2.value == '6' && input_answer1.value =='6'))
    {
      
      this.showModal2();  
    }
    else
    {
      this.showModal4();
    }
   }
   else 
   {
    this.showModal4();
   }
   }
    else
    {
      game.state.start('answerScreen');
    }
   },
 reset_function : function()
 {
  game.state.start('PlayGame');
 }
}
 var answerScreen = function(game){}
    answerScreen.prototype = 
    {
       init : function()
      {
       game.load = new CustomLoader(game);
      },
      preload : function()
      {
       game.load.atlasJSONHash('answerscreens','assets/answers_l1.png','assets/answers_l1.json');
       game.load.webfont('tahoma','Tahoma');

      },
      create : function()
      {
         game.stage.backgroundColor = "#D3FEB6"; 
       var answer_screen1 = game.add.sprite(50,120,'answerscreens','sprite4');
       answer_screen1.scale.setTo(1.7, 1.7);
       var style = { font: "16px tahoma", fill: "ffff", boundsAlignH: "center", boundsAlignV: "middle" };
       var text1 = game.add.text(20,25,'This is how you distribute 12 cakes among 2 equal groups. Click Next to proceed to the next question in this activity.',style);
       text1.wordWrap = true;
       text1.wordWrapWidth = 800;
       var button1 = game.add.button(680,580,'answerscreens',this.next_buttonaction,this,'NEXT_BUTTON_MOUSE_OVER','NEXT_BUTTON_NORMAL','NEXT_BUTTON_MOUSE_DOWN');
      },
      next_buttonaction : function()
      {
        game.state.start('playGame2');
      }
    }
  var playGame2 = function(game){}
    playGame2.prototype = 
    {
       init : function()
      {
       game.load = new CustomLoader(game);
      },
      preload : function()
      {
       game.load.atlasJSONHash('answerscreens','assets/answers_l1.png','assets/answers_l1.json');
       game.load.webfont('tahoma','Tahoma');
       game.load.atlasJSONHash('atlas4', 'assets/atlas4.png', 'assets/atlas4.json'); 
       game.load.atlasJSONHash('atlas5','assets/atlas5.png','assets/atlas5.json');
      },
      create : function()
      {
        reg.modal = new gameModal(game);
        this.createModals();
        game.stage.backgroundColor = "#D3FEB6"; 
       var answer_screen1 = game.add.sprite(0,0,'answerscreens','sprite4');
       answer_screen1.scale.setTo(2, 2);
       var style = { font: "14px tahoma", fill: "ffff", boundsAlignH: "center", boundsAlignV: "middle" };
       var text1 = game.add.text(22,525,'Help Jamuni find the share of each group as a part of total number of cakes.',style);
       var style1 = { font: "italic 12px tahoma", fill: "ffff", boundsAlignH: "center", boundsAlignV: "middle" };
       var text2 = game.add.text(22,545,'Enter your answer in the form of a whole number or fraction and click Submit to check your answer.',style1);
       var text3 = game.add.text(22,570, 'The share of each group is  ',style);
       input_answer3 = game.add.inputField(200, 565, {
    font: '11px Arial',
    fill: '#212121',
    fontWeight: 'bold',
    width: 50,
    padding: 8,
    borderWidth: 2,
    borderColor: '#0EC2F5',
    borderRadius: 6,
    
});
       var text4 = game.add.text(280, 570, 'of the total 12 cakes.',style);
       var submit_buttom = game.add.button(20,605, 'atlas4',this.check2_function,this,'sprite68','sprite53','sprite39');
//text1.wordWrap = true;
       //text1.wordWrapWidth = 800;

      },
      check2_function : function()
      {
        no_of_attempts1 = no_of_attempts1 + 1;
        if(no_of_attempts1 < 2)
        {
        if(input_answer3.value == '1/2')
        {
          this.showModal1();
          
        }
        else
        {
          this.showModal3();
        }
        }
        else
        {
          this.showModal2();
        }
      },
      createModals: function() {

    //////// modal 5////////////
      reg.modal.createModal({
        type: "modal1",
        includeBackground: true,
        modalCloseOnInput: true,
        itemsArr: [{
            type: 'sprite',
            atlasParent :'atlas5',
            content : 'sprite1'


          },
          {
            type: "image",
            content: "close_button",
            offsetX: 146,
            offsetY: -75,
            callback: function(){
                      reg.modal.hideModal("modal1");
                    }
        },
        {
          type : "button",
          atlasParent: "answerscreens",
          content: 'NEXT_BUTTON_NORMAL',
          offsetX : 100,
          offsetY: 30,
          /*callback: function()
          {
           //not decided yet
          }*/

        }, 
         {
          type : 'sprite',
          atlasParent: 'answerscreens',
          content: 'SMILEY_HAPPY',  
          offsetX : 40,
          offsetY:  - 140,
        },

          ]
        
    });
        reg.modal.createModal({
        type: "modal2",
        includeBackground: true,
        modalCloseOnInput: true,
        itemsArr: [{
            type: 'sprite',
            atlasParent :'atlas5',
            content : 'sprite7'

          },
            {
            type: "image",
            content: "close_button",
            offsetX: 205,
            offsetY: -83,
            callback: function(){
                      reg.modal.hideModal("modal2");
                    }},
        {
          type : "button",
          atlasParent: "atlas4",
          content: 'sprite51',
          offsetX : 110,
          offsetY: 30,
          callback: function()
          {
            reg.modal.hideModal("modal2");
          }

        },
        {
          type : 'sprite',
          atlasParent: 'answerscreens',
          content: 'SMILEY_SAD',  
          offsetX : 40,
          offsetY:  - 140,
        }]     
    });
            reg.modal.createModal({
        type: "modal3",
        includeBackground: true,
        modalCloseOnInput: true,
        itemsArr: [{
            type: 'sprite',
            atlasParent :'atlas5',
            content : 'sprite6'

          },
            {
            type: "image",
            content: "close_button",
            offsetX: 208,
            offsetY: -83,
            callback: function(){
                      reg.modal.hideModal("modal3");
                    }},
        {
          type : "button",
          atlasParent: "atlas4",
          content: 'sprite51',
          offsetX : 110,
          offsetY: 30,
          callback: function()
          {
            reg.modal.hideModal("modal3");
          }

        },
        {
          type : 'sprite',
          atlasParent: 'answerscreens',
          content: 'SMILEY_SAD',  
          offsetX : 40,
          offsetY:  - 140,
        }]     
    });  
  }, 
  showModal1:function() {
    reg.modal.showModal("modal1");
   },
   showModal2: function()
   {
    reg.modal.showModal("modal2");
   },
   showModal3 : function()
   {
    reg.modal.showModal("modal3");
   },
    }
game.state.add('PlayGame', playGame);
game.state.add('answerScreen',answerScreen);
game.state.add('playGame2',playGame2);
game.state.start('PlayGame');
}


 

