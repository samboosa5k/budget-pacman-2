//  Constants
const TILE_SIZE = 85;
//  Player selction
const player = document.getElementById( 'player' );
//  Env selection
const app = document.getElementById( 'app' );





document.addEventListener( 'DOMContentLoaded', () => {
  const app = document.querySelector( '#app' );
  const width = 20;
  const height = 20;
  const stage = new Stage( width, height );
  stage.mount( app );
  const stageArea = document.querySelector( '.stage' );

  const newPacman = new Pacman( 0, 0, 0, stage );
  newPacman.mount( stageArea );

  // console.log( stage.entities )
  // console.log( stage.collisionDetection( 1, 1 ) )
  // console.log( stage.collisionDetection( 2, 2 ) )

  // stage.removeEntity(bomb);
  fetch( `http://bootcamp.podlomar.org/api/pacman?width=${width}&height=${height}` )
    .then( response => response.json() )
    .then( item => {
      console.log( item )
      console.log( item.walls )
      for ( const wall of item.walls ) {
        const wallElem = new Entity( wall.x, wall.y, 'wall' );
        wallElem.mount( stageArea );
        stage.addEntity( wallElem );
      }
      for ( const apple of item.apples ) {
        const appleElem = new Entity( apple.x, apple.y, 'apple' );
        appleElem.mount( stageArea );
        stage.addEntity( appleElem );
      }
      for ( const bomb of item.bombs ) {
        const bombElem = new Entity( bomb.x, bomb.y, 'bomb' );
        bombElem.mount( stageArea );
        stage.addEntity( bombElem );
      }

    } )
} );
