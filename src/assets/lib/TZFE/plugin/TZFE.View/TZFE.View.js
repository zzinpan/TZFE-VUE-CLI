import TWEEN from "@tweenjs/tween.js";
import Plugin from "../TZFE.Plugin.js";

var canvasStyle = {

	"position": "absolute",
	"z-index": 9999,
	"left": "0px",
	"top": "0px",
	
	"background-color": "green"
	
};

var canvasCssText = Object.keys( canvasStyle ).map( function( key ){
	
	return key + ":" + canvasStyle[ key ] + ";";
	
} ).join("");


export default new Plugin( function( TZFE ){

	TZFE.prototype.createView = function( element ){
		
		var self = this;
		this.view = {
			
			// UI 별도 관리 << 삭제 
			blocks: [],
				
			// html container
			container: null,
			canvas: null,
			ctx: null,
			rafId: null,
			draw: {
				levelBlockBackgroundColor: "#ffffff",
				levelBlockColor: "#000000",
				levelBlockFont: "bold 20px san-serif",
				textBaseline: "middle",
				textAlign: "center"
			},
			animate: function animate( time ){
				
				self.view.rafId = requestAnimationFrame( self.view.animate );
				TWEEN.update( time );
				self.view.ctx.clearRect( 0, 0, self.view.canvas.width, self.view.canvas.height );
				
				self.grid.rows.forEach(function( row ){
					
					row.forEach(function( block ){
						
						if( block == null ){
							return;
						}
						
						self.view.ctx.save();
						self.view.ctx.translate( block.position.x + 50, block.position.y + 50 );
						
						self.view.ctx.fillStyle = self.view.draw.levelBlockBackgroundColor;
						self.view.ctx.fillRect( -block.scale.x / 2, -block.scale.y / 2, block.scale.x, block.scale.y );
						
						self.view.ctx.textAlign = self.view.draw.textAlign;
						self.view.ctx.textBaseline = self.view.draw.textBaseline;
						self.view.ctx.font = self.view.draw.levelBlockFont;
						self.view.ctx.fillStyle = self.view.draw.levelBlockColor;
						self.view.ctx.fillText( block.value, 0, 0 );
						self.view.ctx.restore();
						
					});
					
				});
				
			}
			
		};
		
		
		if( element instanceof HTMLElement ){
			
			this.view.container = element;
			
		}else{
			
			this.view.container = document.querySelector( element );
			
		}
		
		
		this.view.canvas = document.createElement( "canvas" );
		this.view.ctx = this.view.canvas.getContext( "2d" );
		this.view.canvas.style.cssText = canvasCssText;
		this.view.container.appendChild( this.view.canvas );
		
		self.view.rafId = requestAnimationFrame( self.view.animate );
		
		
	};
	
	TZFE.prototype.resize = function(){
		
		var size = this.view.container.getBoundingClientRect();
		console.log( size );
		this.view.canvas.width = size.width;
		this.view.canvas.height = size.height;
		this.view.canvas.style.width = size.width + "px";
		this.view.canvas.style.height = size.height + "px";
		
	};
	
	var oAddBlock = TZFE.Grid.prototype.addBlock;
	TZFE.Grid.prototype.addBlock = function( block ){
		
		var vector2 = oAddBlock.call( this, block );
		
		
		block.scale = new TZFE.Vector2( 0, 0 );
		var tween = new TWEEN.Tween( block.scale )
			.to({ x: 100, y: 100 })
			.easing(TWEEN.Easing.Quadratic.Out);
		
		
		var position = vector2.clone().multiplyScalar( 100 );
//		posiion.x += 50;
//		posiion.y += 50;
		block.position = position;
		
		
		tween.start();
		return vector2;
		
	};
	
	var oMove = TZFE.Grid.prototype.move;
	TZFE.Grid.prototype.move = function( direction ){
		
		var self = this;
		var updates = oMove.call( this, direction );
		updates.forEach(function( update ){
			
			switch( update.type ){
			
				case TZFE.Block.UpdateType.MOVE: {
					
					var block = self.getBlockById( update.id );
					break;
					
				}
			
			}
			
		});
		console.log( updates );
		
	};
	
	
	
} );