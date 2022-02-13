<template>
	
	<div class="board" v-bind:style="style">
		<template v-for="( row, rowIndex ) in tzfe.grid.rows" v-bind:key="rowIndex">
			<template v-for="( block, columnIndex ) in row">
				<block class="block" v-if="block != null" v-bind:key="columnIndex" v-bind:block="block" v-bind:rowIndex="rowIndex" v-bind:columnIndex="columnIndex"></block>
			</template>
		</template>
	</div>
  
</template>

<script>

import block from "./block.vue";

export default {
	
	name: 'board',
	components: { "block": block },
	
	props: [ "tzfe" ],
	
	data(){
		
		return {
			
			style: {
				
				width: "0px",
				height: "0px"
				
			},
			
			
		};
		
	},
	
	mounted(){

		const columnCount = this.tzfe.grid.columnCount;
		const rowCount = this.tzfe.grid.rowCount;
		
		this.style.width = columnCount * 100 + "px";
		this.style.height = rowCount * 100 + "px";
		
	}
	
	
}

</script>

<style scope>

.board {

	border-radius: 10px;
	box-shadow: 0px 0px 0px 1px white;
	
}


</style>