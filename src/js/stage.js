class Stage {
    constructor( width, height, pacman ) {
        this.width = width,
            this.height = height,
            this.entities = [],
            this.pacman = pacman
    }

    render() {
        this.element = document.createElement( 'div' );
        this.element.className = 'stage';
        this.element.style.width = `${TILE_SIZE * this.width}px`;
        this.element.style.height = `${TILE_SIZE * this.height}px`;
    }
    mount( parent ) {
        this.render();
        parent.appendChild( this.element );
    }
    addEntity( entity ) {
        this.entities.push( entity );
    }
    collisionDetection( x, y ) {
        for ( const item of this.entities ) {
            if ( item.x === x && item.y === y ) {
                return item;
            }
        }
        return null;
    }
    removeEntity( entity ) {
        for ( let i = 0; i < this.entities.length; i++ ) {
            if ( this.entities[i].x === entity.x && this.entities[i].y === entity.y ) {
                this.entities.splice( i, 1 );
            }
        }
        entity.unmount( this.element );
    }
}