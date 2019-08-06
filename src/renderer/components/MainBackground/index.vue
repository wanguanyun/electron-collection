<template>
<div class="canvas-wrap">
    <canvas  id="cvs" class="gradient"></canvas>
</div>
</template>

<script>
import { render } from './start'
export default {
  name: 'mainbackground',
  methods: {
    render: render
  },
  mounted() {
    this.render()
  }
}
</script>

<style scoped>
#cvs{
	width:100%;
	height:100%;;
	overflow: hidden;
	position:fixed;
	top:0;
	left:0;
    pointer-events: none;
    touch-callout: none;          
}
.canvas-wrap{
	position:relative;
    z-index:-1;
}
</style>
