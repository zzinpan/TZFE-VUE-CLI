
function TZFE(){
	
	this.grid = null;
	this.store = [];
	
}

TZFE.prototype.save = function(){
	
	var vector2 = new TZFE.Vector2();
	var before = this.store[ this.store.length - 1 ];
	
	
	if( before == null ){
		this.store.push( this.grid.clone() );
		return true;
	}
	
	
	var isUpdate = this.grid.rows.some( function( nowRow, rowIndex ){
		
		return nowRow.some( function( nowBlock, columnIndex ){
			
			var beforeBlock = before.getBlockByPosition( vector2.set( columnIndex, rowIndex ) );
			
			if( beforeBlock == null && nowBlock == null ){
				return false;
			}
			
			if( beforeBlock == null ){
				return true;
			}
			
			if( nowBlock == null ){
				return true;
			}

			return nowBlock.equals( beforeBlock ) == false;
			
		} );
		
	} );

	
	if( isUpdate ){
		this.store.push( this.grid.clone() );
	}
	
	return isUpdate;
	
};


TZFE.prototype.up = function(){
	
	this.grid.move( TZFE.Direction.UP );
	
};
TZFE.prototype.right = function(){
	
	this.grid.move( TZFE.Direction.RIGHT );
	
};
TZFE.prototype.down = function(){
	
	this.grid.move( TZFE.Direction.DOWN );
	
};
TZFE.prototype.left = function(){
	
	this.grid.move( TZFE.Direction.LEFT );
	
};
TZFE.prototype.clear = function( rowCount, columnCount ){
	
	this.grid = new TZFE.Grid( rowCount, columnCount );
	
};

TZFE.prototype.addBlock = function( block ){
	
	if( block == null ){
		block = new TZFE.LevelBlock( TZFE.Util.getRandomInteger( 1, 2 ) );
	}
	this.grid.addBlock( block );
	
};

TZFE.prototype.print = function(){
	
	console.clear();
	console.log( this.grid.toString() );
	
};

export default TZFE;

