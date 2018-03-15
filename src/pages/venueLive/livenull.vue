<template>
	<div class="buysuccess">
		<div class="right">
			<img src="../../assets/czlImg/cry.png" >
			<p>你所在的城市还没有任何会场直播信息</p>
		</div>
		<div class="address">
			<img src="../../assets/czlImg/address.png">
			<span>武汉</span>
		</div>
	</div>
</template>
<script>
export default {

}
</script>

<style lang="scss"  scoped>
 @import '../../assets/scss/_mixins.scss';
	.buysuccess{
		width:100%;
		min-height:100%;
		background:#fff;
		padding:pTR(185) 0;
		position:relative;
		.right{
			text-align: center;
			img{
				width:pTR(120);
				height:pTR(120);
				display: inline-block;
			}
			p{
				color:#999;
				font-size:pTR(36);
				padding-top:pTR(80);
			}
		}
		.address{
			position:absolute;
			right:pTR(20);
			top:pTR(20);
			img{
				width:pTR(25);
				display: inline-block;
				vertical-align: middle;
			}
			span{
				padding-left:pTR(5);
				color:#333333;
				font-size:pTR(24);
				display: inline-block;
				vertical-align: middle;
			}

		}
		
	}
</style>