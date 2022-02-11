(function(){
	
	function Vector2( x, y ){

		this.x = 0;
		this.y = 0;
		
		this.set( x, y );
		
	};
	
	Vector2.prototype.set = function( x, y ){
		
		this.x = x;
		this.y = y;
		return this;
		
	};
	
	Vector2.prototype.copy = function( v ){
		
		this.set( v.x, v.y );
		return this;
		
	};
	
	Vector2.prototype.clone = function(){
		
		return new Vector2( this.x, this.y );
		
	};
	
	Vector2.prototype.length = function(){
		
		return Math.sqrt( this.x * this.x + this.y + this.y );
		
	};
	
	Vector2.prototype.normalize = function(){
		
		return this.divideScalar( this.length() || 1 );
		
	};
	
	Vector2.prototype.multiply = function( vector2 ) {

		this.x *= vector2.x;
		this.y *= vector2.y;

		return this;

	}

	Vector2.prototype.multiplyScalar = function( scalar ) {

		this.x *= scalar;
		this.y *= scalar;

		return this;

	}

	Vector2.prototype.divide = function( vector2 ) {

		this.x /= vector2.x;
		this.y /= vector2.y;

		return this;

	}

	Vector2.prototype.divideScalar = function( scalar ) {

		return this.multiplyScalar( 1 / scalar );

	}
	
	Vector2.prototype.getDirectionPropertyName = function() {
		
		var name = "";
		if( this.x != 0 ){
			name += "x";
		}
		if( this.y != 0 ){
			name += "y";
		}
		
		return name;
		
	}
	
	window.TZFE.Vector2 = Vector2;
	
})();