import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import './game.html';

Template.game.onRendered(function() {
    /**
    **gfx.js
    **/
    var gfx = {};

    /**
     * Function sol
     * @purpose : Génère un sol.
     * $color : couleur du sol.
     */
    gfx.sol = function ( $r, $g, $b )
    {
            if ( (!$r && $r !== 0) || (!$g && $g !== 0) || (!$b && $b !== 0) )
            {
                    $color = "#CCCCCC";
            }
            else
            {
                    $color = Graphics.getRGB ( $r, $g, $b );
            }
            
            this.gfx = new Shape();
            this.gfx.name = $color;
            this.gfx.graphics.beginFill($color)
                             .moveTo(64,0)
                             .lineTo(0,-32)
                             .lineTo(-64,0)
                             .lineTo(0,32)
                             .lineTo(64,0)
                             .closePath();
            return this.gfx;
    };

    /**
     * Function mur
     * @purpose : Génère un mur.
     * $color : couleur du mur.
     */
    gfx.mur = function ( $r, $g, $b )
    {
        if ( (!$r && $r !== 0) || (!$g && $g !== 0) || (!$b && $b !== 0) ) { $r = $g = $b = 200; }
            this.gfx = new Shape();
            
            /**
             * On définit les couleurs des côtés (plus sombres).
             */
            $color = Graphics.getRGB ( $r, $g, $b );
            
            /**
             * Création des deux autr couleurs.
             */
            $color_g = Graphics.getRGB ( Math.round(0.8 * $r), Math.round(0.8 * $g), Math.round(0.8 * $b) );
            $color_d = Graphics.getRGB ( Math.round(0.6 * $r), Math.round(0.6 * $g), Math.round(0.6 * $b) );
            
            /**
             * Face droite.
             */
        this.gfx.graphics.beginFill($color_d);
            this.gfx.graphics.moveTo(0,-18).lineTo(0,32).lineTo(64,0).lineTo(64,-50).lineTo(0,-18);
            
            /**
             * Face supérieure.
             */
            this.gfx.graphics.beginFill($color);
            this.gfx.graphics.moveTo(64,-50).lineTo(0,-82).lineTo(-64,-50).lineTo(0,-18).lineTo(64,-50);
            
            /**
             * Face gauche.
             */
            this.gfx.graphics.beginFill($color_g);
            this.gfx.graphics.moveTo(-64,-50).lineTo(-64,0).lineTo(0,32).lineTo(0,-18).lineTo(-64,-50).beginFill();
            this.gfx.graphics.closePath();
            
        return this.gfx;
    };

    /**
     * Function player
     * @purpose : Génère un player.
     * $color : couleur du player.
     */
    gfx.player = function ( $r, $g, $b )
    {
            if ( (!$r && $r !== 0) || (!$g && $g !== 0) || (!$b && $b !== 0) ) { $r = $g = $b = 200; }
            this.gfx = new Shape();
            
            /**
             * On définit les couleurs des côtés (plus sombres).
             */
            $color = Graphics.getRGB ( $r, $g, $b );
            
            /**
             * Création des deux autr couleurs.
             */
            $color_g = Graphics.getRGB ( Math.round(0.8 * $r), Math.round(0.8 * $g), Math.round(0.8 * $b) );
            $color_d = Graphics.getRGB ( Math.round(0.6 * $r), Math.round(0.6 * $g), Math.round(0.6 * $b) );
            
            /**
             * Face droite.
             */
            this.gfx.graphics.beginFill($color_d);
            this.gfx.graphics.moveTo(0,-18).lineTo(0,32).lineTo(64,0).lineTo(64,-50).lineTo(0,-18);
            
            /**
             * Face supérieure.
             */
            this.gfx.graphics.beginFill($color);
            this.gfx.graphics.moveTo(64,-50).lineTo(0,-82).lineTo(-64,-50).lineTo(0,-18).lineTo(64,-50);
            
            /**
             * Face gauche.
             */
            this.gfx.graphics.beginFill($color_g);
            this.gfx.graphics.moveTo(-64,-50).lineTo(-64,0).lineTo(0,32).lineTo(0,-18).lineTo(-64,-50).beginFill();
            this.gfx.graphics.closePath();
            
            return this.gfx;
    };

    /**
     * Function solAlea
     * @purpose : Génère un sol de couleur aléatoire.
     */
    gfx.solAlea = function ()
    {
            var r = Math.round(Math.random()*255), g = Math.round(Math.random()*255), b = Math.round(Math.random()*255);
            
            return this.sol ( r, g, b );
    };

    /**
     * Function solTAlea
     * @purpose : Génère un sol avec une variation de teinte aléatoire.
     */
    gfx.solTAlea = function ( $r, $g, $b )
    {
            var r = $r - Math.round(Math.random()*40), g = $g - Math.round(Math.random()*40), b = $b - Math.round(Math.random()*40);
            
            return this.sol ( r, g, b );
    };

    /**
     * Function murTAlea
     * @purpose : Génère un mur avec une variation de teinte aléatoire.
     */
    gfx.murTAlea = function ( $r, $g, $b )
    {
            var r = $r - Math.round(Math.random()*10), g = $g - Math.round(Math.random()*10), b = $b - Math.round(Math.random()*10);
            
            return this.mur ( r, g, b );
    };

    /**
     * Function solAlea
     * @purpose : Génère un sol de couleur aléatoire.
     */
    gfx.murAlea = function ()
    {
            var r = Math.round(Math.random()*255), g = Math.round(Math.random()*255), b = Math.round(Math.random()*255);
            
            return this.mur ( r, g, b );
    };

    gfx.play = function()
    {
            this.text = new Text("Jouer", "30px Arial Black", "#ffff00");
            this.text.textAlign = "center";
        this.text.textBaseline = "top";
        this.text.lineHeight = 32;
        this.text.lineWidth = 134;
        this.text.setTransform(71,0.8);
        this.text.shadow = new Shadow("#ff0000",0,0,10);
            
        this.gfx = new Shape();
        this.gfx.graphics.lf(["#ff6600","#ffff00"],[0,1],-11.6,-35.2,-11.6,28.7)
                    .p("AKNi2QqciHp2CHQiBC0CBCzQJTCVK/iVQB1ikh1jD").f()
                    .s("#ff6600").ss(2.5,1,1,3)
                    .p("AKNi2QB1DDh1CkQq/CVpTiVQiBizCBi0QJ2iHKcCH").cp();
            this.gfx.setTransform(71.1,25.1);

            this.container = new Container ();
            this.container.addChild ( this.gfx, this.text );

        return this.container;
    };
    /**
     * Fichier "core.js"
     */
    var gameview = document.getElementById('gameView'), stage;
    stage = new Stage(gameview);
    Ticker.setFPS(60);
    Ticker.addListener(stage);
     
    var myMap = new Map ();
     
    myMap.offsetX = 512;
    myMap.offsetY = 200;
     
    stage.addChild ( myMap );
     
    var player = new Player ( TileType.DRAW, gfx.player( 255, 0, 0 ), true );
    myMap.addTile ( player, 3, 3, 1 );
    myMap.player = player;
     
    var map = [     [0, 1, 0, 1, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 1, 0, 0],
                    [0, 1, 0, 0, 0, 0],
                    [0, 1, 0, 0, 0, 0],
                    [1, 1, 1, 1, 1, 1]];
     
     
    for ( var i = 0; i < 6; i++ )
    {
       for ( var j = 0; j < 6; j++ )
       {
               if ( map[i][j] === 0 )
               {
                       myMap.addTile ( new Tile ( TileType.DRAW, gfx.solTAlea(200,200,128), true ), i, j, 0 );
               }
               else
               {
                       myMap.addTile ( new Tile ( TileType.DRAW, gfx.murTAlea(128,128,128), false ), i, j, 2 );
               }
       }
    }
});