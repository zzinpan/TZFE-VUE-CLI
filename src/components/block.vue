<template>
	
	<div class="block" v-bind:style="style">{{block.value}}</div>
  
</template>

<script>

export default {
	
	name: 'block',
	components: {},
	props: [ "block", "rowIndex", "columnIndex" ],
	
	data(){
		
		return {
			
			style: {
				
				left: `${ this.columnIndex * 100 }px`,
				top: `${ this.rowIndex * 100 }px`
				
			}
			
		};
		
	},
	
	created(){
		console.log("객체생성ㄷ");
	},
	
	watch: {
		
		rowIndex( value ){
			
			this.style.top = `${ value * 100 }px`;
			
		},
		
		columnIndex( value ){
			
			this.style.left = `${ value * 100 }px`;
			
		}
		
	}
	
	
}

</script>

<style scope>

.block {

	position: absolute; 
	width: 100px; 
	height: 100px; 
	line-height: 100px;
	text-align: center;

	color: white;
	font-weight: bold;
	font-size: 40px;
	box-shadow: 0px 0px 0px 1px white;
	border-radius: 10px;
	
	transition: left, top 0.5s;
	
}

</style>