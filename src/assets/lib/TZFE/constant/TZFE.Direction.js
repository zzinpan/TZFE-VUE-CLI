
import Vector2 from "../TZFE.Vector2.js"

const Direction = {
	
	UP: new Vector2( 0, -1 ),
	RIGHT: new Vector2( 1, 0 ),
	DOWN: new Vector2( 0, 1 ),
	LEFT: new Vector2( -1, 0 )
		
};

const KeyCode = {
	
	37: Direction.LEFT,
	38: Direction.UP,
	39: Direction.RIGHT,
	40: Direction.DOWN
		
};

Object.defineProperty( Direction, "getByKeyCode", {
	
	value( keyCode ){
		
		return KeyCode[ keyCode ];
		
	}
	
} );

export default Direction;
	
