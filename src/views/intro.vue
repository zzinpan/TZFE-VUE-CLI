<template>

	<div class="logo" v-bind:class="classes">TZFE</div>
  
</template>

<script>

export default {
	
	name: 'intro',
	components: {},
	
	data(){
		
		return {
			
			classes: {
				
				"show": false
				
			}
			
		};
		
	},
	
	activated(){
		
		this.classes.show = false;
		
	},
	
	mounted(){
		
		setTimeout(()=>{
			this.classes.show = true;
		});
		
		setTimeout(()=>{
			this.classes.show = false;
			alert(123);
		}, 3500);
		
	}
	
}

</script>

<style scope>

.logo {
	position: absolute;
	display: inline-block;
	transform: translate( -50%, -50% );
	font-size: 48px;
	font-weight: bold;
	color: white;
	
	left: 50%;
	top: 40%;
	opacity: 0;
	transition: all 0.5s;
}
.logo.show {
	left: 50%;
	top: 50%;
	opacity: 1;
	transition: all 2s;
}

</style>