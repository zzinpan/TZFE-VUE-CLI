import Plugin from "../TZFE.Plugin.js";


var canvasStyle = {

	"posiiton": "absolute",
	"z-index": 9999,
	"left": "0px",
	"top": "0px",
	
	"background-color": "green"
	
};

var canvasCssText = Object.keys( canvasStyle ).map( function( key ){
	
	return key + ":" + canvasStyle[ key ] + ";";
	
} ).join("");

var prototype = {
	
	createView: function( element ){
		
		
		this.view = {
			
			// html container
			container: null,
			canvas: null,
			ctx: null
			
		};
		
		
		if( element instanceof HTMLElement ){
			
			this.view.container = element;
			
		}else{
			
			this.view.container = document.querySelector( element );
			
		}
		
		
		this.view.canvas = document.createElement( "canvas" );
		this.view.canvas.style.cssText = canvasCssText;
		this.view.container.appendChild( this.view.canvas );
		
		
		this.view.ctx = this.view.canvas.getContext( "2d" );
		
		
	}
		
};

var methodNames = Object.keys( prototype );

export default new Plugin( function( TZFE ){
	
	
	methodNames.forEach(function( methodName ){
		
		TZFE.prototype[ methodName ] = prototype[ methodName ];
		
	});
	
	
} );