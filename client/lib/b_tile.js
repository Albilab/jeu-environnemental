var TileType =
{
        PNG: "PNG",
        DRAW: "DRAW"
};

/**
 * Class Tile
 */
var Tile = function ( $type, $content, $walkable, $offsetX, $offsetY ) {
        this.construct ( $type, $content, $walkable, $offsetX, $offsetY );
};

var p = Tile.prototype;

/**
 * string TileType
 * Type de tuile. Egal à TileType.PNG où TileType.DRAW.
 */
p.type = TileType.DRAW;

/**
 * object content
 * Contenu graphique (shape).
 */
p.content = null;

/**
 * bool walkable
 * Indique si les joueurs peuvent marcher sur la tuile.
 */
p.walkable = true;

/**
 * int offsetX
 * Décalage de l'image en X.
 */
p.offsetX = 0;

/**
 * int offsetY
 * Décalage de l'image en Y.
 */
p.offsetY = 0;

/**
 * Map Map
 * Carte à laquelle la tuile à été ajoutée.
 */
p.map = null;

/**
 * int posX
 * Position de la tuile sur la carte en X (nb de tuiles).
 */
p.posX = 0;

/**
 * int posY
 * Position de la tuile sur la carte en Y.
 */
p.posY = 0;

/**
 * int posZ
 * Position de la tuile sur la carte en Z.
 */
p.posZ = 0;
 
/**
 * Constructeur.
 */
p.construct = function ( $type, $content, $walkable, $offsetX, $offsetY ) {
        if ( $type === TileType.PNG ) {
                this.type = $type;
        }
        
        if ( $walkable === false ) {
                this.walkable = false;
        }
        
        if ( typeof $offsetX === typeof 0 ) {
                this.offsetX = $offsetX;
        }
        
        if ( typeof $offsetY === typeof 0 ) {
                this.offsetY = $offsetY;
        }
        
        if ( $content && $content.visible ) {
                this.content = $content;
        }
};

/**
 * void dispose
 * @purpose : Détruit la tuile.
 */
p.dispose = function () {
        this.map = null;
        this.type = null;
        this.content = null;
        this.walkable = null;
        this.offsetX = null;
        this.offsetY = null;      
};


