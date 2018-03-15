<template>
	<div class="livefaile">
		<img class="faileimg" src="../../assets/czlImg/faile.png">
		<p class="text">定位失败</p>
		<div class="faileBtn">
			<div class="btn1">重新定位</div>
			<div class="btn2">手动选择</div>
		</div>
	</div>
</template>
<script>
export default {

}
</script>

<style lang="scss"  scoped>
 @import '../../assets/scss/_mixins.scss';
	.livefaile{
		width:100%;
		min-height:100%;
		background:#fff;
		padding-top:pTR(180);
		.faileimg{
			width:pTR(120);
			height:pTR(120);
			margin:0 auto;
		}
		.text{
			text-align:center;
			padding-top:pTR(80);
			color:#999999;
			font-size:pTR(36);
		}
		.faileBtn{
			position:absolute;
			bottom:pTR(100);
			width:100%;

			.btn1{
				height:pTR(77);
				width:pTR(562);
				margin:0 auto;
				border-radius:pTR(10);
				background:#f52b3a;
				text-align:center;
				line-height:pTR(77);
				font-size:pTR(36);
				color:#fff;
			}
			.btn2{
				height:pTR(77);
				width:pTR(562);
				margin:pTR(10) auto 0;
				border-radius:pTR(10);
				background:#fff;
				text-align:center;
				line-height:pTR(77);
				font-size:pTR(36);
				color:#f52b3a;
			}
			
		}
	}
</style>