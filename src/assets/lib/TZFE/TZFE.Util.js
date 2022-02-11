(function(){
	
	TZFE.Util = {
	
		getLineString: function( columnCount, maxLevelValuelength, start, middle, end ){
			
			return start + new Array( columnCount ).fill( "".padStart( maxLevelValuelength, "─" ) ).join( middle ) + end;
			
		},
		
		getRandomId: function(){
			
			return Date.now() + "::" + Math.random() * 100000000000000000;
			
		},
		
		getRandomInteger: function( min, max ){
			
			return Math.round( Math.random() * ( max - min ) ) + min; 
			
		}
			
	};
	
})();