
import Vector2 from "./TZFE.Vector2.js";
import Directions from "./constant/TZFE.Directions.js";
import Block from "./TZFE.Block/TZFE.Block.js";
import LevelBlock from "./TZFE.Block/TZFE.LevelBlock.js";
import UpdateType from "./TZFE.Block/constant/TZFE.Block.UpdateType.js";
import Util from "./TZFE.Util.js";

function Grid( columnCount, rowCount ){
	
	this.rowCount = rowCount;
	this.yCount = rowCount;
	
	this.columnCount = columnCount;
	this.xCount = columnCount;
	
	this.rows = new Array( rowCount );
	this.rows.fill();
	this.rows.forEach( function( value, index, rows ){
		
		// Math.max를 위한 fill( null ): undefined의 경우, NaN을 반환
		rows[ index ] = new Array( columnCount ).fill( null );
		
	} );
	
}

Grid.prototype.clone = function(){
	
	var original = this;
	return original.rows.reduce( function( clone, originalRow, rowIndex ){
		
		var cloneRow = clone.rows[ rowIndex ];
		originalRow.forEach( function( originalBlock, blockIndex ){
			
			if( originalBlock == null ){
				
				return;
				
			}
			
			cloneRow[ blockIndex ] = originalBlock.clone();
			
		} );
		
		return clone;
		
		
	}, new Grid( original.columnCount, original.rowCount ) );
	
};

Grid.prototype.getBlockByPosition = function( vector2 ){
	
	return this.rows[ vector2.y ][ vector2.x ];
	
};

Grid.prototype.setBlockByPosition = function( vector2, block ){
	
	this.rows[ vector2.y ][ vector2.x ] = block;
	
};

Grid.prototype.move = function( direction ){

	if( Directions.indexOf( direction ) < 0 ){
		console.warn( "argument is wrong - [0] is not TZFE.Direction." );
		return false;
	}
	
	// x || y
	var prop = direction.getDirectionPropertyName();
	var nonProp = "xy".replace(prop, "");
	
	
	/**
	 * -1, 0 --> 0 ~ 3
	 * 1, 0 --> 3 ~ 0
	 */
	
	var self = this;
	var half = ( self.rowCount - 1 ) / 2;
	var start = half + direction[ prop ] * half;
	
	var updateBlocks = [];
	var vector2 = new Vector2();
	for( var i0=0; i0<self[ nonProp + "Count" ]; ++i0 ){

		for( var i1=start; ( 0<=i1 && i1<self[ prop + "Count" ] ); i1=i1-direction[prop] ){
			
			vector2[ prop ] = i1;
			vector2[ nonProp ] = i0;
			var target = self.getBlockByPosition( vector2 );
			
			if( target == null ){
				continue;
			}
			
			
			var i2 = i1 + direction[prop];
			const w = true;
			while( w ){
				
				if( i2 < 0 ){
					
					var updateBlock = {
						
						type: UpdateType.MOVE,
						id: target.id,
						startPosition: new Vector2(),
						endPosition: new Vector2()
							
					};
					updateBlocks.push( updateBlock );
					
					vector2[ prop ] = i1;
					vector2[ nonProp ] = i0;
					updateBlock.startPosition.copy( vector2 );
					self.setBlockByPosition( vector2, null );
					
					vector2[ prop ] = 0;
					vector2[ nonProp ] = i0;
					updateBlock.endPosition.copy( vector2 );
					self.setBlockByPosition( vector2, target );
					break;
					
				}
				
				if( self[ prop + "Count" ] <= i2 ){
					
					let updateBlock = {
						
						type: Block.UpdateType.MOVE,
						id: target.id,
						startPosition: new Vector2(),
						endPosition: new Vector2()
							
					};
					updateBlocks.push( updateBlock );
					
					vector2[ prop ] = i1;
					vector2[ nonProp ] = i0;
					updateBlock.startPosition.copy( vector2 );
					self.setBlockByPosition( vector2, null );
					
					vector2[ prop ] = self[ prop + "Count" ] - 1;
					vector2[ nonProp ] = i0;
					updateBlock.endPosition.copy( vector2 );
					self.setBlockByPosition( vector2, target );
					break;
					
				}
				
				vector2[ prop ] = i2;
				vector2[ nonProp ] = i0;
				var before = self.getBlockByPosition( vector2 );
				if( before != null ){
					
					// 3. 대상의 왼쪽이 블럭이면, 합친 이력이 있는지 판단
					if( before.merged === true ){
						
						let updateBlock = {
							
							type: Block.UpdateType.MOVE,
							id: target.id,
							startPosition: new Vector2(),
							endPosition: new Vector2()
								
						};
						updateBlocks.push( updateBlock );
						
						// 4. 합쳐졌었으면, 다음 대상탐색 -> 1
						vector2[ prop ] = i1;
						vector2[ nonProp ] = i0;
						updateBlock.startPosition.copy( vector2 );
						self.setBlockByPosition( vector2, null );
						
						vector2[ prop ] = i2 - direction[prop];
						vector2[ nonProp ] = i0;
						updateBlock.endPosition.copy( vector2 );
						self.setBlockByPosition( vector2, target );
						
					}else{
						
						// 5. 안합쳐졌었으면, 대상의 왼쪽블럭 레벨업, 다음 대상 탐색
						
						if( before.value == target.value ){
							
							let updateBlock = {
								
								type: Block.UpdateType.REMOVE,
								id: target.id
									
							};
							updateBlocks.push( updateBlock );
							
							updateBlock = {
									
								type: Block.UpdateType.LEVEL_UP,
								id: before.id
									
							};
							updateBlocks.push( updateBlock );
							
							before.value++;
							before.merged = true;
							
							vector2[ prop ] = i1;
							vector2[ nonProp ] = i0;
							self.setBlockByPosition( vector2, null );
							
						}else{
							
							let updateBlock = {
								
								type: Block.UpdateType.MOVE,
								id: target.id,
								startPosition: new Vector2(),
								endPosition: new Vector2()	
								
							};
							updateBlocks.push( updateBlock );
							
							vector2[ prop ] = i1;
							vector2[ nonProp ] = i0;
							updateBlock.startPosition.copy( vector2 );
							self.setBlockByPosition( vector2, null );
							
							vector2[ prop ] = i2 - direction[prop];
							vector2[ nonProp ] = i0;
							updateBlock.endPosition.copy( vector2 );
							self.setBlockByPosition( vector2, target );
							
						}
						
						
					}
					break;
					
				}
				
				// 2. 대상의 왼쪽이 null이면, 왼쪽으로 이동 ( 반복 )
				i2 = i2 + direction[prop];
				
			}
			
			
		}
		
	}
	
	
	this.rows.forEach( function( row ){
		
		row.forEach( function( block ){
			
			if( block == null ){
				return;
			}
			
			delete block.merged;
			
		} );
		
	} );
	
	return updateBlocks;
	
};


Grid.prototype.getBlanks = function(){
	
	return this.rows.reduce( function( blanks, row, y ){
		
		row.forEach( function( block, x ){
			
			if( block != null ){
				return;
			}
			
			var blank = new Vector2( x, y );
			blanks.push( blank );
			
		} );
		
		return blanks;
		
	}, [] );
	
};

Grid.prototype.addBlock = function( block ){
	
	var blanks = this.getBlanks();
	
	if( blanks.length == 0 ){
		return false;
	}
	
	var randomIndex = Math.floor( Math.random() * blanks.length );
	
	var targetBlank = blanks[ randomIndex ];
	this.rows[ targetBlank.y ][ targetBlank.x ] = block;
	
	return targetBlank;
	
};

Grid.prototype.getMaxLevelBlock = function(){
	
	var levelBlocks = this.rows.reduce( function( levelBlocks, row ){
		
		row.forEach( function( block ){
			
			if( block instanceof LevelBlock == false ){
				return;
			}
			
			levelBlocks.push( block );
			
		} );
		
		return levelBlocks;
		
	}, [] );
	
	
	return levelBlocks.reduce( function( maxLevelBlock, levelBlock ){
		
		if( levelBlock.value < maxLevelBlock.value ){
			return maxLevelBlock;
		}
		
		return levelBlock;
		
	} );
	
};

Grid.prototype.toString = function(){
	
	var self = this;
	var length = 1;
	
	var maxLevelBlock = this.getMaxLevelBlock();
	if( maxLevelBlock != null ){
		length = maxLevelBlock.value.toString().length;
	}
	
	
	// ├─┼─┼─┤
	var lineRow = Util.getLineString( this.columnCount, length, "├", "┼", "┤" );
	var stringBuffer = this.rows.reduce( function( stringBuffer, row, index, blocks ){
		
		
		// │1│2│3│
		var rowStringBuffer = row.map( function( levelBlock ){
			
			var value = "";
			if( levelBlock != null ){
				value = levelBlock.value;
			}
			
			return value.toString().padStart( length, " " );
			
		} );
		
		stringBuffer.push( "│" + rowStringBuffer.join("│") + "│" );
		
		// 마지막 줄
		if( index == blocks.length - 1 ){
			
			stringBuffer.push( Util.getLineString( self.columnCount, length, "└", "┴", "┘" ) );
			
		}else{
			
			stringBuffer.push( lineRow );
			
		}
		
		
		return stringBuffer;
		
		
	}, [ Util.getLineString( this.columnCount, length, "┌", "┬", "┐" ) ] );
	
	
	return stringBuffer.join("\n");
	
};


export default Grid;