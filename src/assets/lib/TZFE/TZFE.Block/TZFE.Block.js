
import Util from "../TZFE.Util.js";
import UpdateType from "./constant/TZFE.Block.UpdateType.js";

function Block(){
	
	this.id = Util.getRandomId();
	
}

Block.UpdateType = UpdateType;

Block.prototype.equals = function( other ){
	
	return this.id == other.id;
	
};

Block.prototype.clone = function(){
	
	var block = new Block();
	block.id = this.id;
	
	return block;
	
};

export default Block;

