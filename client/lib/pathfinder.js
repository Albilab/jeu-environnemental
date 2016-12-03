/**
 * IA Pathfinder
 */
var Pathfinder = {
        /**
         * int NODE_DISTANCE_VALUE : valeur d'un déplacement entre deux nodes adjacentes.
         */
        NODE_DISTANCE_VALUE: 100,

        /**
         * Array m_openList : liste ouverte.
         */
        openList: null,

        /**
         * Array m_closeList : liste fermée.
         */
        closeList: null,

        /**
         * Fonction findPath.
         * Array $graph : Graphe.
         * Node $start : Node de départ.
         * Node $end : Node d'arrivée.
         */
        findPath: function ( $graph, $start, $end ) {
                /**
                 * Initialisation des listes.
                 */
                this.openList = [];
                this.closeList = [];

                /**
                 * Variable destinée à accueillir le chemin final.
                 */
                var finalPath = [];

                 /**
                  * Node courante.
                  */
                var currentNode = null;

                /**
                 * Algo :
                 * On ajoute la node de départ à la liste ouverte.
                 */
                this.addToOpenList( $start );

                while ( this.openList.length > 0 ) {
                        /**
                         * On boucle jusqu'à ce que la liste ouverte soit vide.
                         * On récupère la node avec le plus petit F, avec la méthode "getCurrentNode".
                         */
                        currentNode = this.getCurrentNode ();

                        /**
                         * Si "currentNode" est la node d'arrivée, on arrête.
                         */
                        if ( currentNode === $end ) {
                                break;
                        }

                        /**
                         * On bascule "currentNode" dans la liste fermée.
                         */
                        this.addToCloseList ( currentNode );

                        /**
                         * Récupération des voisins de "currentNode".
                         */
                        var neighbours = this.getNeighbours ( currentNode, $graph );

                        /**
                         * On examine les voisins de "currentNode".
                         */
                        for ( var i = 0, max = neighbours.length; i < max; ++i ) {
                                var node = neighbours[i];

                                /**
                                 * Si la node est dans la liste fermée, où est un obstacle, on l'ignore.
                                 */
                                 if ( !(this.isOnCloseList( node ) || node.walkable === false) ) {
                                       /**
                                        * Sinon, on continue.
                                        * On calcule les nouvelles valeurs de g, h et f.
                                        */
                                        var newG=node.parent.g + this.NODE_DISTANCE_VALUE;
                                        var newH=(Math.abs($end.line-node.line)+Math.abs($end.col-node.col))*this.NODE_DISTANCE_VALUE;
                                        var newF=newH+newG;

                                        if ( this.isOnOpenList( node ) ) {
                                                /**
                                                 * Si la node est déjà dans la liste ouverte :
                                                 * On compare la nouvelle valeur de g à l'anciène,
                                                 * Si elle est inférieure, on met à jour f, g et h,
                                                 * et on fait de currentNode son parent.
                                                 */
                                                if ( newG < node.g ) {
                                                        node.g = newG;
                                                        node.h = newH;
                                                        node.f = newF;
                                                        node.parent = currentNode;
                                                }
                                        } else {
                                                /**
                                                 * Si la node n'est pas dans la liste ouverte :
                                                 * On fait de currentNode son parent.
                                                 * On met à jour f, g et h.
                                                 * On ajoute la node à la liste ouverte.
                                                 */
                                                node.g = newG;
                                                node.h = newH;
                                                node.f = newF;
                                                node.parent = currentNode;
                                                this.addToOpenList ( node );
                                        }
                                }

                        }
                 }

                /**
                 * La boucle s'est arrêtée.
                 * Deux solution :
                 * - Soit la liste ouverte est vide, donc il n'y a pas de solution :
                 * - Soit la liste ouverte n'est pas vide, donc le résultat a été trouvé.
                 */
                if ( this.openList.length === 0 )
                {
                        return finalPath;
                }

                /**
                 * Il y a une solution :
                 * On doit refaire le chemin à l'envers.
                 */
                var lastNode = $end;
                while ( lastNode !== $start )
                {
                        finalPath.push ( lastNode );
                        lastNode = lastNode.parent;
                }

                return finalPath.reverse();
        },

        /**
         * Function removeFromCloseList
         * Node $node : node à supprimer de la liste fermée.
         */
        removeFromCloseList: function ( $node )
        {
                var index = this.closeList.indexOf ( $node );

                if ( index !== -1 )
                {
                        this.closeList.splice ( index, 1 );
                }
        },

        /**
         * Function removeFromOpenList
         * Node $node : node à supprimer de la liste ouverte.
         */
        removeFromOpenList: function ( $node )
        {
                var index = this.openList.indexOf ( $node );

                if ( index !== -1 )
                {
                        this.openList.splice ( index, 1 );
                }
        },

        /**
         * Function addToCloseList
         * Node $node : node à ajouter à la liste fermée.
         */
        addToCloseList: function ( $node )
        {
                this.removeFromOpenList ( $node );
                this.closeList.push ( $node );
        },

        /**
         * Function addToOpenList
         * Node $node : node à ajouter à la liste ouverte.
         */
        addToOpenList: function ( $node )
        {
                this.removeFromCloseList ( $node );
                this.openList.push ( $node );
        },

        /**
         * Function getCurrentNode
         */
        getCurrentNode: function ()
        {
                var min_f = 1000000;
                var current_node = null;

                for ( var i = 0, max = this.openList.length; i < max; ++i )
                {
                        var node = this.openList[i];

                        if ( node.f < min_f )
                        {
                                min_f = node.f;
                                current_node = node;
                        }
                }
                return current_node;
        },

        /**
         * Function getNeighbours
         * Node $node : Node pour laquelle il faut chercher les voisins.
         * Array $graph : Graphe dans lequel il faut chercher.
         */
        getNeighbours: function ( $node, $graph )
        {
                var neighbours = [];
                var diagonal = true;
                // A droite
                if ( $node.line > 0 )
                {
                        neighbours.push ( $graph[$node.line - 1][$node.col] );
                }
                // A gauche
                if ( $node.line + 1 < $graph.length )
                {
                        neighbours.push ( $graph[$node.line + 1][$node.col] );
                }
                // en haut
                if ( $node.col > 0 )
                {
                        neighbours.push ( $graph[$node.line][$node.col - 1] );
                }
                // en bas
                if ( $node.col + 1 < $graph[0].length )
                {
                        neighbours.push ( $graph[$node.line][$node.col + 1] );
                }
                if (diagonal){
                        // diago gauche
                        if ( $node.line + 1 < $graph.length && $node.col > 0 )
                        {
                                neighbours.push ( $graph[$node.line + 1 ][$node.col - 1] );
                        }
                        // diago droite
                        if ( $node.col + 1 < $graph[0].length && $node.line > 0 )
                        {
                                neighbours.push ( $graph[$node.line - 1][$node.col + 1] );
                        }
                        // diago haut
                        if ( $node.col > 0 && $node.line > 0)
                        {
                                neighbours.push ( $graph[$node.line - 1][$node.col - 1] );
                        }
                        // diago bas
                        if ( $node.line + 1 < $graph.length && $node.col + 1 < $graph[0].length )
                        {
                                neighbours.push ( $graph[$node.line + 1][$node.col + 1] );
                        }
                }

                return neighbours;
        },

        /**
         * Function isOnOpenList
         * Node $node : Node à chercher dans la liste ouverte.
         */
        isOnOpenList: function ( $node )
        {
                return ( this.openList.indexOf ( $node ) !== -1 );
        },

        /**
         * Function isOnCloseList
         * Node $node : Node à chercher dans la liste fermée.
         */
        isOnCloseList: function ( $node )
        {
                return ( this.closeList.indexOf ( $node ) !== -1 );
        }
};