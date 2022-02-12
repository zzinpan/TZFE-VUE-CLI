<template>

<div class="container">
	<intro></intro>
	<game></game>
</div>
  
</template>

<script>

import intro from "./views/intro.vue";
import game from "./views/game.vue";

export default {
	
	name: 'app',
	components: {
		
		"intro": intro,
		"game": game,
		
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

</style>