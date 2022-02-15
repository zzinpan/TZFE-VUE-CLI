<template>
	
	<div class="board" v-bind:style="style"></div>
  
</template>

<script>

export default {
	
	name: 'board',
	components: {},
	
	props: [ "tzfe" ],
	
	data(){
		
		return {
			
			style: {
				
				width: "0px",
				height: "0px"
				
			}
			
		};
		
	},
	
	mounted(){

		const columnCount = this.tzfe.grid.columnCount;
		const rowCount = this.tzfe.grid.rowCount;
		
		this.style.width = columnCount * 100 + "px";
		this.style.height = rowCount * 100 + "px";
		
		this.tzfe.createView( this.$el );
		
	},
	
	methods: {
		
		
	}
	
	
}

</script>

<style scope>

.board {

	border-radius: 10px;
	box-shadow: 0px 0px 0px 1px white;
	
}


</style>