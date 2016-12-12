import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import './game.html';

Template.game.onRendered(function() {
	var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'Phaser_Game', null, true, true);

	var BasicGame = function (game) { };

	BasicGame.Boot = function (game) { };

	var persoGroup, isoGroup, cursorPos, sorted, tilesprite, perso, tiles, persocube;
	var tileArray = [];

	BasicGame.Boot.prototype =
	{
		preload: function () {
			
			game.load.atlasJSONHash('spriteMap', 'phaser_img/tile_sprite1.png', 'tile_sprite1.json');
			
			game.load.image('perso', 'phaser_img/sara-logo.png');
			game.load.image('cube', 'phaser_img/cube.png');

			game.time.advancedTiming = true;

			// Add and enable the plug-in.
			game.plugins.add(new Phaser.Plugin.Isometric(game));
			
			// Start the IsoArcade physics system.
			game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);	

			// This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
			// this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
			game.iso.anchor.setTo(0.5, 0.2);

					
		},
		create: function () {       
			// Set the global gravity for IsoArcade.
			game.physics.isoArcade.gravity.setTo(0, 0, -500)
			
			// Group Map
			//mapGroup = game.add.group();
			
			tileArray[1] = 'map1';
			tileArray[2] = 'map2';
			tileArray[3] = 'map3';
			tileArray[4] = 'map4';
			tileArray[5] = 'map5';
			tileArray[6] = 'map6';
			tileArray[7] = 'map7';
			tileArray[8] = 'map8';
			tileArray[9] = 'map9';
			tileArray[10] = 'map10';
			tileArray[11] = 'map11';
			tileArray[12] = 'map12';
			tileArray[13] = 'map13';
			tileArray[14] = 'map14';
			tileArray[15] = 'map15';
			tileArray[16] = 'map16';
			tileArray[17] = 'map17';
			tileArray[18] = 'map18';
			tileArray[19] = 'map19';
			tileArray[20] = 'map20';
			tileArray[21] = 'map21';
			tileArray[22] = 'map22';
			tileArray[23] = 'map23';
			tileArray[24] = 'map24';
			tileArray[25] = 'map25';
			tileArray[26] = 'map26';
			tileArray[27] = 'map27';
			tileArray[28] = 'map28';
			tileArray[29] = 'map29';
			tileArray[30] = 'map30';
			tileArray[31] = 'map31';
			tileArray[32] = 'map32';
			tileArray[33] = 'map33';
			tileArray[34] = 'map34';
			tileArray[35] = 'map35';
			tileArray[36] = 'map36';
			tileArray[37] = 'map37';
			tileArray[38] = 'map38';
			tileArray[39] = 'map39';
			tileArray[40] = 'map40';
			tileArray[41] = 'map41';
			tileArray[42] = 'map42';
			tileArray[43] = 'map43';
			tileArray[44] = 'map44';
			tileArray[45] = 'map45';
			tileArray[46] = 'map46';
			tileArray[47] = 'map47';
			tileArray[48] = 'map48';
			tileArray[49] = 'map49';
			tileArray[50] = 'map50';
			tileArray[51] = 'map51';
			tileArray[52] = 'map52';
			tileArray[53] = 'map53';
			tileArray[54] = 'map54';
			tileArray[55] = 'map55';
			tileArray[56] = 'map56';
			tileArray[57] = 'map57';
			tileArray[58] = 'map58';
			tileArray[59] = 'map59';
			tileArray[60] = 'map60';
			tileArray[61] = 'map61';
			tileArray[62] = 'map62';
			tileArray[63] = 'map63';
			tileArray[64] = 'map64';
			tileArray[65] = 'map65';
			tileArray[66] = 'map66';
			tileArray[67] = 'map67';
			tileArray[68] = 'map68';
			tileArray[69] = 'map69';
			tileArray[70] = 'map70';
			tileArray[71] = 'map71';
			
			tiles = [
				1,3,1,1,1,1,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,
				1,1,1,1,1,50,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,
				1,1,1,1,1,1,27,1,1,1,
				2,1,1,1,60,1,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1
			];
			
			// Create a group for our tiles, so we can use Group.sort
			isoGroup = game.add.group();
			persoGroup = game.add.group();
			
			// Let's make a load of tiles on a grid.
			this.spawnTiles();
			
			// Provide a 3D position for the cursor
			cursorPos = new Phaser.Plugin.Isometric.Point3();

			// Just a var so we can tell if the group is sorted or not.
			game.iso.simpleSort(isoGroup);
			
			//Ajout du personnage
			//Déplacement x: 55, y: 54
			perso = game.add.isoSprite(0, 0, 0, 'perso', 0, persoGroup);
			perso.anchor.set(0.20, 0.35);
			// Enable the physics body on this cube.
			game.physics.isoArcade.enable(perso);
			// Collide with the world bounds so it doesn't go falling forever or fly off the screen!
			perso.body.collideWorldBounds = true;
			
			cube = game.add.isoSprite(-250,0,0,'cube', 0, persoGroup);
			perso.addChild(cube);
			
			// Set up our controls.
			this.cursors = game.input.keyboard.createCursorKeys();

			this.game.input.keyboard.addKeyCapture([
				Phaser.Keyboard.LEFT,
				Phaser.Keyboard.RIGHT,
				Phaser.Keyboard.UP,
				Phaser.Keyboard.DOWN
			]);
					
		},
		update: function () {       
			// Update the cursor position.
			// It's important to understand that screen-to-isometric projection means you have to specify a z position manually, as this cannot be easily
			// determined from the 2D pointer position without extra trickery. By default, the z position is 0 if not set.
			game.iso.unproject(game.input.activePointer.position, cursorPos);

			// Loop through all tiles and test to see if the 3D position from above intersects with the automatically generated IsoSprite tile bounds.
			isoGroup.forEach(function (tile) {
				var inBounds = tile.isoBounds.containsXY(cursorPos.x, cursorPos.y);
				// If it does, do a little animation and tint change.
				if (!tile.selected && inBounds) {
					tile.selected = true;
					tile.tint = 0x86bfda;
					game.add.tween(tile).to({ isoZ: 4 }, 200, Phaser.Easing.Quadratic.InOut, true);
				}
				// If not, revert back to how it was.
				else if (tile.selected && !inBounds) {
					tile.selected = false;
					tile.tint = 0xffffff;
					game.add.tween(tile).to({ isoZ: 0 }, 200, Phaser.Easing.Quadratic.InOut, true);
				}
			});
			var speed = 100;

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
		},
		render: function () {
			game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
		},
		spawnTiles: function () {
			var i = 1, xxx;
			for (var xx = 512; xx > 0; xx -= 54) {
				for (var yy = 512; yy > 0; yy -= 55) {
					xxx = game.add.isoSprite(xx, yy, 0, 'spriteMap', tileArray[tiles[i]], isoGroup);
					xxx.anchor.set(0.5);
					xxx.oldZ = xxx.z;
					i++;
				}
			}
		}
	};

	game.state.add('Boot', BasicGame.Boot);
	game.state.start('Boot');
});
