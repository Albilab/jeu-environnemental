/**
 * Class Player extends Tile
 */
var Player = function ( $type, $content, $walkable, $offsetX, $offsetY )
{
        this.construct ( $type, $content, $walkable, $offsetX, $offsetY );
 
        Ticker.addListener ( this, true );
};
 
var p = Player.prototype = new Tile ();
 
/**
 * Array waintingList
 * Liste d'attente pour les déplacements
 */
p.waitingList = [];
 
/**
 * int decalX, int decalY : décalage (en pixels) entre la position réelle et la position actuelle.
 */
p.decalX = 0;
p.decalY = 0;
 
/**
 * bool needUpdate.
 * Indique la nécessité de mettre à jour les profondeurs.
 */
p.needUpdate = false;


/**
 * int vitesseDeplacement.
 * Indique la vitesse de déplacement en pourcentage
 */
p.vitesseDeplacement = 100;
 
/**
 * void smoothMove
 * @purpose : Déplace le joueur
 * $x, $y : déplacement à effectuer en x et en y.
 */
p.smoothMove = function ( $x, $y ) {
        this.waitingList.push ( [ $x, $y ] );
};
 
/**
 * Execution à chaque image.
 */
p.tick = function ( $e ) {
        if ( this.decalX !== 0 || this.decalY !== 0 ) {
                var typeDeplacement = 'marcher';
                if (typeDeplacement == 'sauter'){
                        if ( this.decalX > 0 ) {
                                this.decalX -= 4;
                                this.content.x += 4;
                        } else if ( this.decalX < 0 ) {
                                this.decalX += 4;
                                this.content.x -= 4;
                        }
         
                        if ( this.decalY > 0 ) {
                                this.decalY -= 4;
                                this.content.y += 4;
                        } else if ( this.decalY < 0 ) {
                                this.decalY += 4;
                                this.content.y -= 4;
                        }
                } else if ( typeDeplacement == 'marcher' ) {
                        if ( this.decalX > 0 ) {
                                console.log('Droite');
                                this.decalX -= 2 * (this.vitesseDeplacement/100);
                                this.content.x += 2 * (this.vitesseDeplacement/100);
                        } else if ( this.decalX < 0 ) {
                                console.log('Gauche');
                                this.decalX += 2 * (this.vitesseDeplacement/100);
                                this.content.x -= 2 * (this.vitesseDeplacement/100);
                        }

                        if ( this.decalY > 0 && this.decalX == 0) {// Descendre
                                console.log('Descendre Unique');
                                this.decalY -= 2 * (this.vitesseDeplacement/100);
                                this.content.y += 2 * (this.vitesseDeplacement/100);
                        } else if ( this.decalY < 0 && this.decalX == 0) { // Monter
                                console.log('Monter Unique');
                                this.decalY += 2 * (this.vitesseDeplacement/100);
                                this.content.y -= 2 * (this.vitesseDeplacement/100);
                        }

                        if ( this.decalY > 0) {// Descendre
                                console.log('Descendre');
                                this.decalY -= 1 * (this.vitesseDeplacement/100);
                                this.content.y += 1 * (this.vitesseDeplacement/100);
                        } else if ( this.decalY < 0) { // Monter
                                console.log('Monter');
                                this.decalY += 1 * (this.vitesseDeplacement/100);
                                this.content.y -= 1 * (this.vitesseDeplacement/100);
                        }
                        
                }
        } else if ( this.needUpdate ) {
                this.map.updateDepth();
                this.needUpdate = false;
        } else if ( this.waitingList.length !== 0 ) {
                var position = this.waitingList.shift();
 
                if ( this.posX - position[0] > 0 || this.posY - position[1] > 0 ) {
                        this.needUpdate = true;
                }
 
                this.posX = position[0];
                this.posY = position[1];
 
                if ( !this.needUpdate ) {
                        this.map.updateDepth ();
                }
 
                var toTile = this.map.getTileAt ( this.posX, this.posY, 0 );
 
                this.decalX = toTile.content.x - this.content.x;
                this.decalY = toTile.content.y - this.content.y;
        }
};
 
/**
 * void move
 * @purpose : Déplace le joueur avec les fleches du clavier
 * $x, $y : déplacement à effectuer en x et en y.
 */
p.move = function ( $x, $y ) {
        /**
         * On teste si le déplacement est possible.
         */
        if ( this.map.getTileAt( this.posX + $x, this.posY + $y, 0 ).walkable ) {
                /**
                 * Le déplacement est possible, donc on l'éffectue.
                 */
                this.posX += $x;
                this.posY += $y;
 
                /**
                 * Enfin, on met à jour la carte.
                 */
                this.map.update ();
        }
};
