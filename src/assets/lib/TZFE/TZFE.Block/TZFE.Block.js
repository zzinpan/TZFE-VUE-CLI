/**
 * TZFE.Block Interface
 * 상속 시, prototype 항목 모두 구현 필요
 */
(function(){
	
	function Block(){
		
		this.id = TZFE.Util.getRandomId();
		
	}
	
	Block.prototype.equals = function( other ){
		
		return this.id == other.id;
		
	};
	
	Block.prototype.clone = function(){
		
		var block = new TZFE.Block();
		block.id = this.id;
		
		return block;
		
	};
	
	TZFE.Block = Block;
	
})();