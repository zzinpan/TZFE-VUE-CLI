
import Vector2 from "../TZFE.Vector2.js"

const Direction = {
	
	UP: new Vector2( 0, -1 ),
	RIGHT: new Vector2( 1, 0 ),
	DOWN: new Vector2( 0, 1 ),
	LEFT: new Vector2( -1, 0 )
		
};

Object.defineProperty( Direction, {
	
	value: "get"
	
} );

export default Direction;
	
