<template>

<div class="container">
	<intro class="intro" v-bind:class="intro.class"></intro>
	<game class="game" v-bind:class="game.class"></game>
</div>
  
</template>

<script>

import intro from "./components/intro.vue";
import game from "./views/game.vue";

export default {
	
	name: 'app',
	components: {
		
		"intro": intro,
		"game": game,
		
	},
	
	data(){
		
		return {
			
			intro: {
				
				"class": {
					
					show: false
					
				}
				
			},
			
			game: {
				
				"class": {
					
					show: false
					
				}
				
			}
			
		}
		
	},
	
	mounted(){
		
		setTimeout(()=>{
			
			this.intro.class.show = true;
			
		});
		
		setTimeout(()=>{
			
			this.intro.class.show = false;
			
		}, 3000);
		
		setTimeout(()=>{
			
			this.game.class.show = true;
			
		}, 4000);
		
	},
	
	watch: {
		
		
	},
	

	methods: {
		
		
	}
	
}

</script>

<style scope>

.container {
	position: absolute;
	left: 0px;
	top: 0px;
	width: 100%;
	height: 100%;
	background-color: black;
}

.intro {

	transform: translate( -50%, -50% );
	top: 50%;
	left: 50%;
	margin-top: -50px;
	
	opacity: 0;
	transition: all 2s;

}

.intro.show {

	margin-top: 0px;
	opacity: 1;
	transition: all 1s;

}

.game {

	opacity: 0;
	top: 50%;
	left: 50%;
	transition: all 2s;

}

.game.show {

	opacity: 1;
	margin-top: 0px;
	transition: all 1s;

}

</style>