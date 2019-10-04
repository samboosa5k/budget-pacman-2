/* 

Notes:
- mouth = open OR closed state
- xpos = horizontal position

- pacman will receive stage

*/


class Pacman {
    constructor( mouth, xpos, ypos, stageParam ) {
        this.mouth = mouth;
        this.xpos = xpos;
        this.ypos = ypos;
        this.stageParam = stageParam;
        //  Initialize
        //  Controls should get 'true' parameters by default
        //  If pacman dies, control will be set to false
        this.controls( true );
    }

    detectCollision() {
        return this.stageParam.collisionDetection( this.xpos / 85, this.ypos / 85 ).type;
    }

    controls( param ) {

        document.addEventListener( 'keydown', ( event ) => {

            if ( event.code === 'ArrowRight' ) {
                this.mouth = [170, 0];
                this.moveRight();
            }

            if ( event.code === 'ArrowLeft' ) {
                this.mouth = [0, -85];
                this.moveLeft();
            }

            if ( event.code === 'ArrowUp' ) {
                this.mouth = [0, 85];
                this.moveUp();
            }

            if ( event.code === 'ArrowDown' ) {
                this.mouth = [0, 170];
                this.moveDown();
            }

            this.update();

        } );

        document.addEventListener( 'keyup', ( event ) => {
            if ( event.code === 'ArrowRight' ) {
                this.mouth = [85, 0];
            }

            if ( event.code === 'ArrowLeft' ) {
                this.mouth = [85, -85];
            }

            if ( event.code === 'ArrowUp' ) {
                this.mouth = [85, 85];
            }

            if ( event.code === 'ArrowDown' ) {
                this.mouth = [85, 170];
            }

            this.update();
        } )

    }

    moveUp() {
        this.ypos = this.ypos - TILE_SIZE;

        switch ( this.detectCollision() ) {
            case 'wall':
                this.ypos = this.ypos + 85;
                break;
            case 'apple':
                this.stageParam.removeEntity( this.stageParam.collisionDetection( this.xpos / 85, this.ypos / 85 ) );
                this.stageParam.score += 1;
                break;
            case 'bomb':
                console.log( 'bomb hit' );
                document.body.querySelector( '.stage' ).remove();
                document.body.innerHTML = '<h1 style="font-size: 100px;">YOU LOSE!</h1>';
                this.pacDiv.style.display = 'none';

        }

    }

    moveDown() {
        this.ypos = this.ypos + TILE_SIZE;

        switch ( this.detectCollision() ) {
            case 'wall':
                this.ypos = this.ypos - 85;
                break;
            case 'apple':
                this.stageParam.removeEntity( this.stageParam.collisionDetection( this.xpos / 85, this.ypos / 85 ) );
                this.stageParam.score += 1;
                break;
            case 'bomb':
                console.log( 'bomb hit' );
                document.body.querySelector( '.stage' ).remove();
                document.body.innerHTML = '<h1 style="font-size: 100px;">YOU LOSE!</h1>';
                this.pacDiv.style.display = 'none';
        }
    }

    moveRight() {
        this.xpos = this.xpos + TILE_SIZE;

        switch ( this.detectCollision() ) {
            case 'wall':
                this.xpos = this.xpos - 85;
            case 'apple':
                this.stageParam.removeEntity( this.stageParam.collisionDetection( this.xpos / 85, this.ypos / 85 ) );
                this.stageParam.score += 1;
                break;
            case 'bomb':
                console.log( 'bomb hit' );
                document.body.querySelector( '.stage' ).remove();
                document.body.innerHTML = '<h1 style="font-size: 100px;">YOU LOSE!</h1>';
                this.pacDiv.style.display = 'none';
        }
    }

    moveLeft() {
        this.xpos = this.xpos - TILE_SIZE;

        switch ( this.detectCollision() ) {
            case 'wall':
                this.xpos = this.xpos + 85;
                break;
            case 'apple':
                this.stageParam.removeEntity( this.stageParam.collisionDetection( this.xpos / 85, this.ypos / 85 ) );
                this.stageParam.score += 1;
                break;
            case 'bomb':
                console.log( 'bomb hit' );
                document.body.querySelector( '.stage' ).remove();
                document.body.innerHTML = '<h1 style="font-size: 100px;">YOU LOSE!</h1>';
                this.pacDiv.style.display = 'none';
        }
    }

    render() {
        this.pacDiv = document.createElement( 'div' );
        this.pacDiv.id = 'player';
        this.pacDiv.classList = 'entity entity--pac pacboy-active-light';
    }

    mount( parent ) {
        this.render();
        parent.appendChild( this.pacDiv );
    }

    update() {
        this.pacDiv.style.left = `${this.xpos}px`;
        this.pacDiv.style.top = `${this.ypos}px`;

        //  Written below changes the x/y coordinates of the pacman face sprite
        this.pacDiv.style.backgroundPositionX = `${this.mouth[0]}px`;
        this.pacDiv.style.backgroundPositionY = `${this.mouth[1]}px`;
    }
}