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
			
			// html container
			container: null,
			canvas: null,
			ctx: null,
			rafId: null,
			animate: function animate( time ){
				
				self.view.rafId = requestAnimationFrame( animate );
				TWEEN.update( time );
				self.view.ctx.clearRect( 0, 0, self.view.canvas.width, self.view.canvas.height );
				
			}
			
		};
		requestAnimationFrame( animate );
		
		
		if( element instanceof HTMLElement ){
			
			this.view.container = element;
			
		}else{
			
			this.view.container = document.querySelector( element );
			
		}
		
		
		this.view.canvas = document.createElement( "canvas" );
		this.view.canvas.style.cssText = canvasCssText;
		this.view.container.appendChild( this.view.canvas );
		
		
		this.view.ctx = this.view.canvas.getContext( "2d" );
		
		
	};
	
	TZFE.prototype.resize = function(){
		
		var size = this.view.container.getBoundingClientRect();
		console.log( size );
		this.view.canvas.width = size.width;
		this.view.canvas.height = size.height;
		this.view.canvas.style.width = size.width + "px";
		this.view.canvas.style.height = size.height + "px";
		
	};
	
	var originalAddBlock = TZFE.Grid.prototype.addBlock;
	TZFE.Grid.prototype.addBlock = function(){
		
		var position = originalAddBlock.apply( this, arguments );
		self.view.ctx.
		
		
	};
	
	
} );