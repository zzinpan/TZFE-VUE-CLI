import Vector2 from "./TZFE.Vector2.js";
import Grid from "./TZFE.Grid.js";
import Util from "./TZFE.Util.js";

import Block from "./TZFE.Block/TZFE.Block.js";
import LevelBlock from "./TZFE.Block/TZFE.LevelBlock.js";

import Direction from "./constant/TZFE.Direction.js";
import Directions from "./constant/TZFE.Directions.js";


function TZFE(){
	
	this.grid = null;
	this.store = [];
	
}

TZFE.Vector2 = Vector2;
TZFE.Util = Util;
TZFE.Grid = Grid;
TZFE.Block = Block;
TZFE.LevelBlock = LevelBlock;
TZFE.Direction = Direction;
TZFE.Directions = Directions;

TZFE.prototype.save = function(){
	
	var vector2 = new Vector2();
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

TZFE.prototype.move = function( direction ){
	
	this.grid.move( direction );
	
};

TZFE.prototype.clear = function( rowCount, columnCount ){
	
	this.grid = new Grid( rowCount, columnCount );
	
};

TZFE.prototype.addBlock = function( block ){
	
	if( block == null ){
		block = new LevelBlock( Util.getRandomInteger( 1, 2 ) );
	}
	return this.grid.addBlock( block );
	
};

TZFE.prototype.print = function(){
	
	console.clear();
	console.log( this.grid.toString() );
	
};

export default TZFE;

