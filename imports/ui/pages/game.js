import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import { Chats } from '/imports/api/chats/chats.js';

import './game.html';

Template.game.onRendered(function() {
	var game = new Phaser.Game(800, 400, Phaser.AUTO, 'Phaser_Game', null, true, true);

	var BasicGame = function (game) { };

	BasicGame.Boot = function (game) { };

	var perso, cursors, persoGroup;

	var isoGroup, water = [];

	BasicGame.Boot.prototype =
	{
		preload: function () {
			game.time.advancedTiming = true;
	        game.stage.disableVisibilityChange = false;

	        game.plugins.add(new Phaser.Plugin.Isometric(game));

	        game.load.atlasJSONHash('tileset', 'phaser_img/tileset.png', '/tileset.json');

	        game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
	        game.iso.anchor.setTo(0.5, 0.1);

	        game.load.image('perso', 'phaser_img/sara-logo.png');
			//game.load.image('cube', 'phaser_img/cube.png');
					
		},
		create: function () {       
			isoGroup = game.add.group();
			// Set the global gravity for IsoArcade.
        	//game.physics.isoArcade.gravity.setTo(0, 0, -400);

		    // we won't really be using IsoArcade physics, but I've enabled it anyway so the debug bodies can be seen
		    isoGroup.enableBody = true;
		    isoGroup.physicsBodyType = Phaser.Plugin.Isometric.ISOARCADE;

		    var tileArray = [];
		    tileArray[0] = 'water';
		    tileArray[1] = 'sand';
		    tileArray[2] = 'grass';
		    tileArray[3] = 'stone';
		    tileArray[4] = 'wood';
		    tileArray[5] = 'watersand';
		    tileArray[6] = 'grasssand';
		    tileArray[7] = 'sandstone';
		    tileArray[8] = 'bush1';
		    tileArray[9] = 'bush2';
		    tileArray[10] = 'mushroom';
		    tileArray[11] = 'wall';
		    tileArray[12] = 'window';

		    var tiles = [
		        9, 2, 1, 1, 4, 4, 1, 6, 2, 10, 2,
		        2, 6, 1, 0, 4, 4, 0, 0, 2, 2, 2,
		        6, 1, 0, 0, 4, 4, 0, 0, 8, 8, 2,
		        0, 0, 0, 0, 4, 4, 0, 0, 0, 9, 2,
		        0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0,
		        0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0,
		        0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0,
		        0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0,
		        11, 11, 12, 11, 3, 3, 11, 12, 11, 11, 11,
		        3, 7, 3, 3, 3, 3, 3, 3, 7, 3, 3,
		        7, 1, 7, 7, 3, 3, 7, 7, 1, 1, 7
		    ];

		    var tilesWalkable = [
		    	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		        1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1,
		        1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1,
		        0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1,
		        0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
		        0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
		        0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
		        0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
		        0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
		        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
		    ]

		    var size = 32;

		    var i = 0, tile;
		    for (var y = size; y <= game.physics.isoArcade.bounds.frontY - size; y += size) {
		        for (var x = size; x <= game.physics.isoArcade.bounds.frontX - size; x += size) {
		            tile = game.add.isoSprite(x, y, tileArray[tiles[i]].match("water") ? 0 : game.rnd.pick([2, 3, 4]), 'tileset', tileArray[tiles[i]], isoGroup);
		            tile.anchor.set(0.5, 1);
		            tile.smoothed = false;
		            tile.body.moves = false;
		           	game.physics.isoArcade.enable(tile);
		           	tile.body.collideWorldBounds = true;
		            if (tiles[i] === 4) {
		                tile.isoZ += 6;
		            }
		            if (tiles[i] <= 10 && (tiles[i] < 5 || tiles[i] > 6)) {
		                tile.scale.x = game.rnd.pick([-1, 1]);
		            }
		            if (tiles[i] === 0) {
		                water.push(tile);
		            }
		            i++;
		        }
		    }

		    //Ajout du personnage
			//Déplacement x: 55, y: 54
			perso = game.add.isoSprite(80, 80, 66, 'perso', 0, isoGroup);
			perso.anchor.set(1, 1);
			// Enable the physics body on this cube.
			game.physics.isoArcade.enable(perso);
			// Collide with the world bounds so it doesn't go falling forever or fly off the screen!
			perso.body.collideWorldBounds = true;
			
			//cube = game.add.isoSprite(0,0,0,'cube', 0, persoGroup);
			//perso.addChild(cube);

			//isoGroup.addChild(perso);
			
			// Set up our controls.
			this.cursors = game.input.keyboard.createCursorKeys();

			this.game.input.keyboard.addKeyCapture([
				d
			]);

			var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	        space.onDown.add(function () {
	            p 
	        }, this);

					
		},
		update: function () {
			water.forEach(function (w) {
	            w.isoZ = (-2 * Math.sin((game.time.now + (w.isoX * 7)) * 0.004)) + (-1 * Math.sin((game.time.now + (w.isoY * 8)) * 0.005));
	            w.alpha = Phaser.Math.clamp(1 + (w.isoZ * 0.1), 0.2, 1);
	        });   
			
			var speed = 100;
			console.log("x :"+perso.body.velocity.x);
			console.log("y :"+perso.body.velocity.y);
			console.log("z :"+perso.body.velocity.z);

			if (this.cursors.up.isDown) {
				perso.body.velocity.y = -speed;
			}
			else if (this.cursors.down.isDown) {
				perso.body.velocity.y = speed;
			}
			else {
				perso.body.velocity.y = 0;
			}

			if (this.cursors.left.isDown) {
				perso.body.velocity.x = -speed;
			}
			else if (this.cursors.right.isDown) {
				perso.body.velocity.x = speed;
			}
			else {
				perso.body.velocity.x = 0;
			}
			game.physics.isoArcade.collide(isoGroup);
		},
		render: function () {
			isoGroup.forEach(function (tile) {
		        game.debug.body(tile, 'rgba(189, 221, 235, 0.6)', false);
		    });
		    game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
		    // game.debug.text(Phaser.VERSION, 2, game.world.height - 2, "#ffff00");
		}
	};

	game.state.add('Boot', BasicGame.Boot);
	game.state.start('Boot');
});

Template.game.onCreated(function() {
  $(window).resize(function() {
    //$("#container_game").css("height",$(window).height());
    //$("#container_bottom").css("left",($(window).width()-1024)/2);
  });
});

Template.game.events({
    'submit form.connexion': function(event) {
        event.preventDefault();
        var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;
        Meteor.loginWithPassword(emailVar, passwordVar, function(error){
            if(error){
                
            } else {
                //FlowRouter.go("/");
                console.log('Utilisateur connecté');
            }
        });
    },
    'keypress .chat-text': function (evt) {
        if (evt.which === 13) {
            const target = evt.target;
            Meteor.call('chats.insert', target.value, "general" ,function(error, result){
                target.value="";
            });
        }
    }
});

Template.game.helpers({
  chats() {
    return Chats.find({});
  }
})

Template.game.helpers({
  timeView(dateTime) {
    return dateTime.getHours()+":"+dateTime.getMinutes()+":"+dateTime.getSeconds();
  }
})

Template.game.onCreated(function() {
    this.autorun(() => {
        this.subscribe('chats.list');
	});
});