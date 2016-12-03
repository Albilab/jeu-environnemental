/**
 * Class Map extends Container
 */
var Map = function (){};
 
var p = Map.prototype = new Container();
 
/**
 * object tiles
 * Tableau de tuiles (une seule dimension).
 */
p.tiles = [];
 
/**
 * int TileWidth
 * Largeur des tuiles (px).
 */
p.tilesWidth = 128;
 
/**
 * int TileHeight
 * Hauteur des tuiles (px).
 */
p.tilesHeight = 64;
 
/**
 * int offsetX
 * Décalage en X.
 */
p.offsetX = 0;
 
/**
 * int offsetY
 * Décalage en Y.
 */
p.offsetY = 0;
 
/**
 * Player player
 * Joueur contrôlable dans le cas de l'utilisation du pathfinding.
 */
p.player = null;
 
/**
 * void addTile
 * @purpose : Ajoute une tuile à la carte.
 * tile $tile : Tuile à ajouter à la carte.
 * int $x : position en X de l'endroit ou ajouter la tuile (en nombre de cases).
 * int $y : position en Y de l'endroit ou ajouter la tuile (en nombre de cases).
 * int $z : position en Z de l'endroit ou ajouter la tuile (en nombre de cases).
 */
p.addTile = function ( $tile, $x, $y, $z ) {
    $tile.posX = $x;
    $tile.posY = $y;
    $tile.posZ = $z;
    $tile.map = this;

    this.tiles.push ( $tile );
    this.addChild ( $tile.content );

    this.update ();

    $tile.content.onClick = function () {
        this.tile.map.movePlayer ( this.tile.posX, this.tile.posY );
    };
};
 
/**
 * void removeTile
 * @purpose : Enlève une tuile de la carte
 * tile $tile : Tuile à supprimer de la carte.
 */
p.removeTile = function ( $tile ) {        
    var index = this.tiles.indexOf ( $tile );

    if ( index === -1 ) {
        throw new Error ( 'Map.removeTile : la tuile à supprimer ne fait pas partie de la carte !' );
    }

    this.removeChild ( $tile.content );
    this.tiles.splice ( index, 1 );

    $tile.dispose();
};
 
/**
 * tile getTileAt
 * @purpose : Renvoie la tuile à la position indiquée.
 * $x, $y, $z : position de la tuile demandée.
 */
p.getTileAt = function ( $x, $y, $z ) { 
    var r_tile = null;
    this.tiles.forEach ( function($tile) {
        if ( $tile.posX === $x && $tile.posY === $y && $tile.posZ === $z ) {
            r_tile = $tile;
        }
    });

    return r_tile;
};
 
/**
 * void updatePos
 * @purpose : Met à jour l'affichage.
 */
p.update = function () {
    this.updatePos();
    this.updateDepth();
};
 
/**
 * void updatePos
 * @purpose : Met à jour l'affichage (positions).
 */
p.updatePos = function () {
    /**
     * Mise à jour des tuiles.
     */
    this.tiles.forEach ( function($tile) {
        $tile.content.x = ( $tile.posY - $tile.posX ) * ($tile.map.tilesWidth/2) + ($tile.offsetX + $tile.map.offsetX);
        $tile.content.y = ( $tile.posY + $tile.posX ) * ($tile.map.tilesHeight/2) + ($tile.offsetY + $tile.map.offsetY);              

        $tile.content.tile = $tile;
    });
};
 
/**
 * void updateDepth
 * @purpose : Met à jour l'affichage (profondeurs).
 */
p.updateDepth = function () {
    /**
     * Tri des tuiles pour gérer les profondeurs.
     */
    this.sortChildren (function($a,$b) {
        $n_a = 5 * ($a.tile.posX + $a.tile.posY) + $a.tile.posZ;
        $n_b = 5 * ($b.tile.posX + $b.tile.posY) + $b.tile.posZ;

        if ( $n_a > $n_b ) {
            return 1;
        } else if ( $n_a < $n_b ) {
            return -1;
        } else {
            return 0;
        }
    });
};
 
/**
 * Array getGraph
 * @purpose : Crée une carte de nodes pour le pathfinding.
 */
p.getGraph = function () {
    var graph = [];

    for ( var i = 0, max = this.tiles.length; i < max; i++ ) {
        var tile = this.tiles[i];

        if ( graph[tile.posX] === undefined ) {
            graph[tile.posX] = [];
        }

        graph[tile.posX][tile.posY] = new Node ( tile.posX, tile.posY, tile.walkable );
    }

    return graph;
};
 
/**
 * void movePlayer
 * int $x, int $y : coordonnées de la tuile d'arrivée
 */
p.movePlayer = function ( $x, $y ) {
    if ( this.player === null ) {
        /**
         * Pas de joueur, donc pas de pathfinding.
         */
        return;
    }
    var playerX, playerY;
    if ( this.player.waitingList.length === 0 ) {
        /**
         * La liste d'attente est vide, on utilise les coordonnées réélles.
         */
        playerX = this.player.posX;
        playerY = this.player.posY;
    } else {
        /**
         * La liste d'attente n'est pas vide, on utilise les coordonnées finales.
         */
        playerX = this.player.waitingList[this.player.waitingList.length-1][0];
        playerY = this.player.waitingList[this.player.waitingList.length-1][1];
    }

    var graph = this.getGraph();
    var start = graph[playerX][playerY];
    var end = graph[$x][$y];

    var path = Pathfinder.findPath ( graph, start, end );

    while ( path.length !== 0 ) {
            var toTile = path.shift ();
            this.player.smoothMove ( toTile.line, toTile.col );
    }
};
 
/**
 * void dispose
 * @purpose : Détruit la carte.
 */
p.dispose = function ()
{
    while ( this.tiles.length > 0 )
    {
        this.removeTile ( this.tiles[0] );
    }

    this.tiles = null;
    this.tilesWidth = null;
    this.tilesHeight = null;
    this.offsetX = null;
    this.offsetY = null;
};