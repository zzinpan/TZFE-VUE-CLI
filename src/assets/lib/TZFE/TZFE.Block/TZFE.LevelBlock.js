(function(){
	
	function LevelBlock( value ){
		
		TZFE.Block.apply( this, arguments );
		this.value = value;
		
	}
	
	LevelBlock.prototype.__proto__ = TZFE.Block.prototype;
	LevelBlock.prototype.equals = function( other ){
		
		return 
			this.id == other.id &&
			this.value == other.value;
		
	};
	LevelBlock.prototype.clone = function(){
		
		var block = new TZFE.LevelBlock( this.value );
		block.id = this.id;
		
		return block;
		
	};
	
	TZFE.LevelBlock = LevelBlock;
	
})();