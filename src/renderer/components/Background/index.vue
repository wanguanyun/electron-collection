<template>
<div class="canvas-wrap">
    <div id="canvas" class="gradient"></div>
</div>
</template>

<script>
import { render } from './start'
export default {
  name: 'background',
  methods: {
    render: render
  },
  mounted() {
    this.render()
  }
}
</script>

<style scoped>
#canvas{
	width:100%;
	height:100%;;
	overflow: hidden;
	position:fixed;
	top:0;
	left:0;          
}
.canvas-wrap{
	position:relative;
    z-index:-1;
}
</style>
