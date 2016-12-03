/**
 * Class Node
 * int $x : Position en x.
 * int $y : Position en y.
 * bool $walkable : Possibilité d'accéder à la node.
 */
var Node = function ( $x, $y, $walkable )
{
        this.construct ( $x, $y, $walkable );
};
 
var p = Node.prototype;
 
/**
 * int g
 */
p.g = 0;
 
/**
 * int h
 */
p.h = 0;
 
/**
 * int f
 */
p.f = 0;
 
/**
 * int col
 */
p.col = 0;
 
/**
 * int line
 */
p.line = 0;
 
/**
 * bool walkable
 */
p.walkable = true;
 
/**
 * Node parent
 */
p.parent = null;
 
/**
 * Constructeur.
 */
p.construct = function ( $x, $y, $walkable )
{
        this.line = $x;
        this.col = $y;
        this.walkable = $walkable;
        this.parent = this;
};