function Plugin( setup ){
	
	if( typeof setup == "function" ){
		
		this.setup = setup;
		
	}
	
}

export default Plugin;