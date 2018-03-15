/**
 * Created by wy007 on 2015/10/21.
 */



$('#broadcast').marquee({
    duration: 8000,  //speed in milliseconds of the marquee
    gap: 0,  //gap in pixels between the tickers
    delayBeforeStart: 0,  //time in milliseconds before the marquee will start animating
    direction: 'left',  //'left' or 'right'
    duplicated: true  //true or false - should the marquee be duplicated to show an effect of continues flow
});

$(".elric-dial-unit").append('');
//$(".gray").remove();

var speedTimes = 0,
    lottery={
        index:-1,	//��ǰת�����ĸ�λ�ã����λ��
        count:0,	//�ܹ��ж��ٸ�λ��
        timer:0,	//setTimeout��ID����clearTimeout���
        speed:20,	//��ʼת���ٶ�
        times:0,	//ת������
        cycle:50,	//ת��������������������Ҫת�����ٴ��ٽ���齱����
        prize:-1,	//�н�λ��
        init:function(id){
            if ($("#"+id).find(".elric-dial-unit").length>0) {
                $lottery = $("#"+id);
                $units = $lottery.find(".elric-dial-unit");
                this.obj = $lottery;
                this.count = $units.length;
                $lottery.find(".lottery-unit-"+this.index).addClass("active");

            };
        },
        roll:function(){
            var index = this.index;
            var count = this.count;
            var lottery = this.obj;
            $(lottery).find(".lottery-unit-"+index).removeClass("active");
            index += 1;
            if (index>count-1) {
                index = 0;
            };
            $(lottery).find(".lottery-unit-"+index).addClass("active");
            this.index=index;
            return false;
        },
        stop:function(index){
            this.prize=index;
            return false;
        }
    };

function roll(){
    lottery.times += 1;
    lottery.roll();
    if (lottery.times > lottery.cycle+10 && lottery.prize==lottery.index) {
        clearTimeout(lottery.timer);
        lottery.prize=-1;
        lottery.times=0;
        click=false;
        console.log(speedTimes);

    }else{
        if (lottery.times<lottery.cycle) {
            lottery.speed -= 10;
        }else if(lottery.times==lottery.cycle) {
            var index = Math.random()*(lottery.count)|0;
            lottery.prize = index;
        }else{
            if (lottery.times > lottery.cycle+10 && ((lottery.prize==0 && lottery.index==7) || lottery.prize==lottery.index+1)) {
                lottery.speed += 110;
            }else{
                lottery.speed += 20;
            }
        }
        if (lottery.speed<40) {
            lottery.speed=40;
        };
        //console.log(lottery.times+'^^^^^^'+lottery.speed+'^^^^^^^'+lottery.prize);
        lottery.timer = setTimeout(roll,lottery.speed);
        speedTimes += lottery.speed;
    }
    return false;
}

var click=false;

window.onload=function(){
    lottery.init('lottery');
    $("#lottery .btn-start").click(function(){
        if (click) {
            return false;
        }else{
            speedTimes = 0;
            lottery.speed=100;
            roll();
            click=true;
            return false;
        }
    });
};