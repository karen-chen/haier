<template>
	<div class="buysuccess">
		<div class="right">
			<img src="../../assets/czlImg/survey_tips.png" >
			<p>核销成功</p>
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
		padding:pTR(185);
		.right{
			text-align: center;
			img{
				width:pTR(120);
				height:pTR(120);
				display: inline-block;
			}
			p{
				color:#f52b3a;
				font-size:pTR(36);
				padding-top:pTR(80);
			}
		}
		
	}
</style>