<template>

<div class="container">
	<intro class="intro" v-bind:class="intro.class"></intro>
	<scoreBoard class="scoreBoard" v-bind:class="scoreBoard.class"></scoreBoard>
	<board class="board" :is="tzfe" v-bind:class="board.class" v-bind:tzfe="tzfe"></board>
</div>
  
</template>

<script>

import intro from "./components/intro.vue";
import board from "./components/board.vue";
import scoreBoard from "./components/scoreBoard.vue";

import TZFE from "./assets/lib/TZFE/TZFE.js";
import View from "./assets/lib/TZFE/plugin/TZFE.View/TZFE.View.js";
TZFE.addPlugin( View );

export default {
	
	name: 'app',
	components: {
		
		"intro": intro,
		"board": board,
		"scoreBoard": scoreBoard
		
	},
	
	data(){
		
		return {
		
			tzfe: (()=>{
				
				const tzfe = new TZFE();
				tzfe.clear( 4, 4 );
				tzfe.addBlock();
				tzfe.addBlock();
				return tzfe;
				
			})(),
			
			intro: {
				
				"class": {
					
					show: false
					
				}
				
			},
			
			board: {
				
				"class": {
					
					show: false
					
				}
				
			},
			
			scoreBoard: {
				
				"class": {
					
					show: false
					
				}
				
			}
			
		}
		
	},
	
	created(){
		
		console.log( "[App.vue] created" );
		
		window.addEventListener("keydown", ( e )=>{
			
			const direction = TZFE.Direction.getByKeyCode( e.keyCode );
			if( direction == null ){
				return;
			}
			
			this.tzfe.move( direction );
			const moved = this.tzfe.save();
			if( moved == false ){
				return;
			}
// 			this.tzfe.addBlock();
			console.log( e.keyCode, this.tzfe.print() );
			
		}, false);
		
	},
	
	mounted(){
		
		setTimeout(()=>{
			
			this.intro.class.show = true;
			
		});
		
		setTimeout(()=>{
			
			this.intro.class.show = false;
			
		}, 3000);
		
		setTimeout(()=>{
			
			this.scoreBoard.class.show = true;
			this.board.class.show = true;
			
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

	position: absolute;
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
	transition: all 2s;

}

.board {

	position: absolute;
	opacity: 0;
	transform: translate( -50%, -50% );
	top: 50%;
	left: 50%;
	transition: all 2s;

}

.board.show {

	opacity: 1;
	transition: all 2s;

}

.scoreBoard {

	position: absolute;
	opacity: 0;
	top: 0px;
	left: 0px;
	width: calc( 100% - 20px );
	margin-top: -50px;
	transition: all 2s;
	
}

.scoreBoard.show {
	
	margin-top: 0px;
	opacity: 1;
	transition: all 1s;
	
}


</style>