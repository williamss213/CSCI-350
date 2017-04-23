// Tea time

/* globals Phaser:false */
// create BasicGame Class
BasicGame = {

};

var tileID = 0;
var challenges = [];
var decision = -1;
var inputGiven = false;
var xp = 0; 
var ranks = ["Life Noob", "Hobby Builder", "Hobby Hoarder", "Life Expert"];
var rankNumber = 0;
var db;

function confirm_callback(id) 
{ 
    decision = id;
    inputGiven = true;
};

// create Game function in BasicGame
BasicGame.Game = function (game) {
};

// set Game function prototype
BasicGame.Game.prototype = {

    init: function () {
        // set up input max pointers
        this.input.maxPointers = 1;
        // set up stage disable visibility change
        this.stage.disableVisibilityChange = true;
        // Set up the scaling method used by the ScaleManager
        // Valid values for scaleMode are:
        // * EXACT_FIT
        // * NO_SCALE
        // * SHOW_ALL
        // * RESIZE
        // See http://docs.phaser.io/Phaser.ScaleManager.html for full document
        this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        // If you wish to align your game in the middle of the page then you can
        // set this value to true. It will place a re-calculated margin-left
        // pixel value onto the canvas element which is updated on orientation /
        // resizing events. It doesn't care about any other DOM element that may
        // be on the page, it literally just sets the margin.
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        // Force the orientation in landscape or portrait.
        // * Set first to true to force landscape. 
        // * Set second to true to force portrait.
        this.scale.forceOrientation(false, true);
        // Sets the callback that will be called when the window resize event
        // occurs, or if set the parent container changes dimensions. Use this 
        // to handle responsive game layout options. Note that the callback will
        // only be called if the ScaleManager.scaleMode is set to RESIZE.
        this.scale.setResizeCallback(this.gameResized, this);
        // Set screen size automatically based on the scaleMode. This is only
        // needed if ScaleMode is not set to RESIZE.
        this.scale.updateLayout(true);
        // Re-calculate scale mode and update screen size. This only applies if
        // ScaleMode is not set to RESIZE.
        this.scale.refresh();
 
    },
    
    preload: function () {

        this.load.image('logo', 'asset/phaser.png');
        this.load.image('background', 'asset/BackgroundClean.jpeg');
        this.load.image('settings', 'asset/SettingsBar.jpg');
        this.load.image('inventory', 'asset/InventoryBar.jpg');
        this.load.image('stats', 'asset/StatsBar.jpg');
        this.load.image('grayTile', 'asset/GrayGameTile.png');
        this.load.image('tile', 'asset/GameTile2.png')
        this.load.image('tile2', 'asset/Gametile.png')
        this.load.image('challenge', 'asset/Challenge.PNG');
        this.load.image('rubies', 'asset/rubies.PNG');
        this.load.image('walk', 'asset/walk.PNG');
        this.load.image('close', 'asset/closeButton.png');
        this.load.image('map2', 'asset/Map2.jpeg');
        
        db = this.loadDatabase();
        this.loadData();
    },
    
    loadDatabase: function () {
        try {
            if(window.localStorage) return window.localStorage;
             }
        catch (e){
        }
    }, 
    
    loadData: function () {
        if(db.getItem("xp")) {
            xp = parseInt(db.getItem("xp"));
        } 
        if(db.getItem("tileID")) { 
          //  alert("tile" + db.tileID);
            tileId = db.getItem("tileID");
        }
        if(db.getItem("rankNumber")) {
           // alert("rank" + db.rankNumber);
            rankNumber = db.getItem("rankNumber");
        }
       // this.buildMap();
    },
    
    create: function () {
        
        document.addEventListener("intel.xdk.notification.confirm", confirm_callback, false);
        this.stage.backgroundColor = "#4488AA";
/*
        this.background = this.game.add.sprite(0,0, 'map2');
*/
        this.buildMap();
        //this.settings = this.game.add.sprite(364,509, 'settings');
        //this.settings.inputEnabled = true;
        //this.settings.events.onInputDown.add(this.settingsWindow, this);
        

        
        /*challenges.push(this.createChallenge(0, "Challenge 0", 40, 160, 396));
        challenges.push(this.createChallenge(1, "Challenge 1", 30, 200, 223));
        challenges.push(this.createChallenge(2, "Challenge 2", 20, 180, 55));*/
      /*  challenges.push(this.createChallenge(0, "Challenge 0", 40, 163, 375));
        challenges.push(this.createChallenge(1, "Challenge 1", 30, 85, 185));
        challenges.push(this.createChallenge(2, "Challenge 2", 20, 170, 75));*/
    
    },  
    
    update: function()
    {
        console.log(xp);
        if(inputGiven == true)
        { 
             
            this.challenge();
            inputGiven = false;
        }
        var exp = (1000-xp).toString() + " xp to go!";
        var tile = tileId + 1
        // RANK IS TOO HIGH STAWP
        this.challengeText.text = tile.toString();
        //this.rankText.text = ranks[rankNumber];
        this.expText.text = xp.toString() + "exp";
    },
     
    createConfirm: function(event)
    {
        navigator.notification.confirm(challenges[tileID].text, confirm_callback, challenges[tileID].title, ["Confirm", "Cancel"]); 

    },
    
    challenge: function() { 
       // var challengeWindow = this.game.add.sprite(70,100,'challenge');
       // var rubies = this.game.add.sprite(140, 338, 'rubies');
        if(decision == 1)
        {
            challenges[tileID].tile = this.game.add.sprite(challenges[tileID].x, challenges[tileID].y, 'grayTile');
            this.advanceUser();
        }
        else
        {
            challenges[tileID].tile.events.onInputUp.addOnce(this.createConfirm, this, challenges[tileID]);        
        }
        
       /* this.walk = this.game.add.sprite(140, 400, 'walk');
        this.walk.inputEnabled = true;
        this.walk.events.onInputDown.add(this.takeWalk, this);*/
    
    },
       
    gameResized: function (width, height) {

        // This could be handy if you need to do any extra processing if the 
        // game resizes. A resize could happen if for example swapping 
        // orientation on a device or resizing the browser window. Note that 
        // this callback is only really useful if you use a ScaleMode of RESIZE 
        // and place it inside your main game state.

    },
    
    buildMap: function()
    {
        if(tileID == 0)
            {
                this.background = this.game.add.sprite(0,0, 'background');
                challenges.push(this.createChallenge(0, "Take a break! Turn off all your screens and look at something beautiful that inspires you for 10 minutes.", 135, 396));
                challenges.push(this.createChallenge(1, "Challenge 1", 175, 215));
                challenges.push(this.createChallenge(2, "Challenge 2", 150, 45));    
            }
        if(tileID == 3)
            {
                //Destroy old tiles
                for(i = 0; i < 3; i++)
                    {
                        challenges[i].tile.destroy();
                    }
                //Create new tiles
                this.background = this.game.add.sprite(0,0, 'map2');
                challenges.push(this.createChallenge(3, "Challenge 3", 135, 350));
                challenges.push(this.createChallenge(4, "Challenge 4", 60, 170));
                challenges.push(this.createChallenge(5, "Challenge 5", 145, 75));
            } 
         
        var graphics = this.game.add.graphics(0,0);
        var style = { font: "30px Arial", fill: "#ffe37f"};
        var style2 = { font: "40px Arial", fill: "#ffe37f"};
  
        this.game.add.text(15, 505, "Challenge", style);
        this.challengeText = this.game.add.text(70, 537, "", style2);
        
        this.rankText = this.game.add.text(130, 550, "", style);
        this.expText = this.game.add.text(135, 584, " exp", style);
    },
    
    createChallenge: function(id, text, x, y)
    {
        obj = {};
        obj.id = id;
        obj.text = text;
        obj.x = x;
        obj.y = y;
        obj.title = "Challenge " + (id + 1);
        
        obj.tile = this.game.add.sprite(x,y, 'grayTile');
        if(obj.id == 0 || obj.id == 3)
        {
            obj.tile = this.game.add.sprite(x,y, 'tile');
            this.enableInput(obj);
        }
         
        return obj;
    
    },
    
    enableInput: function(object)
    {
        if(object.tile.inputEnabled == null)
        {
            object.tile = this.game.add.sprite(object.x, object.y, 'tile');
            object.tile.inputEnabled = true;
            object.tile.events.onInputUp.addOnce(this.createConfirm, this, object);
        }
    }, 
     
    advanceUser: function()
    {  
        xp = xp + 500;
        if(xp%1000 == 0 && rankNumber < 4) 
            {
                console.log(xp);
             rankNumber = rankNumber + 1;
            }
       // alert("in advance "); 
        tileID = tileID + 1;
      //  nextObj = challenges[tileID]; 
       // alert(challenges[tileID].text);
        db.setItem("xp", xp);
        db.setItem("tileID", tileID);
        db.setItem("rankNumber", rankNumber);
        if(tileID == 3)
        {
            this.buildMap();
        }
        if(challenges[tileID] != null)
        {
            this.enableInput(challenges[tileID]);
        }
    }

};