
import Block from "./TZFE.Block.js";

function LevelBlock( value ){
	
	Block.apply( this, arguments );
	this.value = value;
	
}

LevelBlock.prototype.__proto__ = Block.prototype;
LevelBlock.prototype.equals = function( other ){
	
	return this.id == other.id && this.value == other.value;
	
};
LevelBlock.prototype.clone = function(){
	
	var block = new LevelBlock( this.value );
	block.id = this.id;
	
	return block;
	
};

export default LevelBlock;

