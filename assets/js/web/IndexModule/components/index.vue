<template>
	<div>
		<div>
			xxx1231312xx31313{{msg}}{{msg}}
			<div class="web-font">
				和我在一起，因为你，我会记得那一分钟。从现在开始，我们就是一分钟的朋友。这是事实，你改变不了，因为已经完成了。</div>
			</div>
		<div>
			<img src="../../../../images/web/login_bg.jpg" height="958" width="1920" alt="">
			<img src="../../../../images/web/title.png" height="42" width="214" alt="">
		</div>
		<div class="imgsrc"></div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				msg:'msg112313231312313xxx1311231233'
			}
		},
		mounted(){
		}
	}
</script>
<style lang="scss">
 @import "assets/css/web/public.scss";

.web-font{
    font-family:"webfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
	}
	div{
		background:#f00;
		font-size:20px;
		width:100px;
	}
</style>