<template>
	
	<div class="board" v-bind:style="style">
		<!-- 흠.. rows가 갱신되기때문에 신규 객체가 생성되어 애니메이션이 작동안하는듯 -->
<!-- 		<keep-alive> -->
		
		<block class="block" :is="blocks" v-bind:block="block" v-bind:rowIndex="rowIndex" v-bind:columnIndex="columnIndex"></block>
		

<!-- 		</keep-alive>		 -->
	</div>
  
</template>

<script>

import TZFE from "../assets/lib/TZFE/TZFE.js";
import block from "./block.vue";

export default {
	
	name: 'board',
	components: { "block": block },
	
	props: [ "tzfe" ],
	
	data(){
		
		const b = new TZFE.LevelBlock( 4 );
		const v = this.tzfe.addBlock( b );
		
		return {
			
			style: {
				
				width: "0px",
				height: "0px"
				
			},
			
			blocks: "a",
			
			block: b,
			rowIndex: v.y,
			columnIndex: v.x
			
		};
		
	},
	
	mounted(){

		const columnCount = this.tzfe.grid.columnCount;
		const rowCount = this.tzfe.grid.rowCount;
		
		this.style.width = columnCount * 100 + "px";
		this.style.height = rowCount * 100 + "px";
		
	},
	
	methods: {
		
		getBlocks(){
			
			return this.tzfe.grid.rows.reduce(( blocks, row )=>{
				
				row.forEach(( block )=>{
					
					if( block == null ){
						return;
					}
					blocks[ block.id ] = block;
					
				});
				
				return blocks;
				
			}, {});
			
		}
		
	}
	
	
}

</script>

<style scope>

.board {

	border-radius: 10px;
	box-shadow: 0px 0px 0px 1px white;
	
}


</style>