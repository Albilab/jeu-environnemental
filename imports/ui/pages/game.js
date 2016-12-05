import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import './game.html';

var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'Phaser_Game', null, true, false);

var BasicGame = function (game) { };

BasicGame.Boot = function (game) { };

var isoGroup, cursorPos, sorted, tilesprite;

BasicGame.Boot.prototype =
{
    preload: function () {
        //game.load.image('ground', '../../../public/phaser_img/ground_tile.png');
        //game.load.spritesheet('map', '/phaser_img/tile_sprite.png');
        
        //test map sprite
        for (var i = 1; i < 52; i++) {
            game.load.image('map'+i.toString(), 'phaser_img/Tiles/map-'+i.toString()+'.png');
        };

        game.time.advancedTiming = true;

        // Add and enable the plug-in.
        game.plugins.add(new Phaser.Plugin.Isometric(game));

        // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
        // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
        game.iso.anchor.setTo(0.5, 0.2);

                
    },
    create: function () {       
        // Group Map
        mapGroup = game.add.group();
        
        // Create a group for our tiles, so we can use Group.sort
        isoGroup = game.add.group();
        
        // Let's make a load of tiles on a grid.
        this.spawnTiles();
        
        // Provide a 3D position for the cursor
        cursorPos = new Phaser.Plugin.Isometric.Point3();

        // Just a var so we can tell if the group is sorted or not.
        game.iso.simpleSort(isoGroup);
                
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
    },
    render: function () {
        game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
    },
    spawnTiles: function () {
        // Let's make a load of cubes on a grid, but do it back-to-front so they get added out of order.
        var cube;
        var map = [['22','14','15','15','15','15','2','15','15','15'],
                    ['40','2','15','15','15','15','2','15','15','15'],
                    ['40','5','10','15','15','15','2','15','15','15'],
                    ['40','2','8','1','1','1','7','15','15','15'],
                    ['24','12','15','15','15','15','15','15','15','15'],
                    ['15','15','15','15','15','15','15','15','15','15'],
                    ['15','15','15','15','15','15','15','15','15','15'],
                    ['15','23','22','15','15','15','15','15','15','15'],
                    ['15','33','40','15','15','15','15','15','15','15'],
                    ['15','21','24','15','15','15','15','15','15','15']];
        var col = 0, line = 0;
        for (var xx = 512; xx > 0; xx -= 55) {
            for (var yy = 512; yy > 0; yy -= 52) {
                // Create a cube using the new game.add.isoSprite factory method at the specified position.
                // The last parameter is the group you want to add it to (just like game.add.sprite)
                cube = game.add.isoSprite(xx, yy, 0, 'map'+map[col][line], 0, isoGroup);
                cube.anchor.set(0.5);
                line++;
                // Store the old messed up ordering so we can compare the two later.
                cube.oldZ = cube.z;
            }
            line = 0;
            col++;
        }
    }
};

game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');
