

var c=document.getElementById("myCanvas");
var cxt=c.getContext("2d");
cxt.fillStyle="#FF0000";

<<<<<<< HEAD
//point�� 
=======
//point类 
>>>>>>> gh-pages
function Point(x, y){
	this.sColor = "red";
	this.x = x;
    this.y = y;
	if (typeof Point._initialized == "undefined") {
		Point.prototype.setColor = function(sColor) {
			this.sColor = sColor
		};
		Point._initialized = true;
	}

}


<<<<<<< HEAD
//���snake�������
=======
//组成snake身体的类
>>>>>>> gh-pages
function TempPoint(x, y) {
	Point.apply(this,new Array(x,y));
    
}
TempPoint.prototype = new Point();


<<<<<<< HEAD
//Food����
=======
//Food的类
>>>>>>> gh-pages
function Food(x, y) {
	Point.apply(this,new Array(x,y));
}

Food.prototype =  new Point();
<<<<<<< HEAD
//�ڻ��������food�ĳ�Ա����
Food.prototype.add = function(snake){

	//���ȡ������ʳ������
=======
//在画布上添加food的成员函数
Food.prototype.add = function(snake){

	//随机取数组变成食物的左边
>>>>>>> gh-pages
	this.x = Math.round(Math.random() * 190);
    if (this.x % 10 > 5) {
		this.x = this.x - this.x % 10 + 5;
    }
	else if (this.x % 10 < 5)
        this.x -= this.x % 10;

	this.y = Math.round(Math.random() * 90);
   if (this.y % 10 > 5) {
        this.y = this.y- this.y % 10 + 5;
   }
   else if (this.y % 10 < 5)
        this.y -= this.y % 10;

<<<<<<< HEAD
   //�ж���ͷ�Ƿ�������غ�
=======
   //判断蛇头是否和蛇身重合
>>>>>>> gh-pages
   var bTag = true;
	for (var i = 0; i < snake.nCount - 1; i++) {
                if (snake.aPoints[i].x == this.x || snake.aPoints[i].y == this.y) {
					bTag = false;
                }
	}

	if(bTag){
<<<<<<< HEAD
		//�ڻ����ϴ������foodPoint
		cxt.beginPath();
		//Ŀ��
=======
		//在画布上创建这个foodPoint
		cxt.beginPath();
		//目标
>>>>>>> gh-pages
		cxt.fillStyle = this.sColor;
		cxt.fillRect(this.x, this.y, 5, 5);
		cxt.closePath();
	}else{
		this.add(snake);
	}



}
<<<<<<< HEAD
//ɾ�����ʳ��/ʵ�����ǰ�������������һ����
Food.prototype.remove = function(snake){
		//�������foodPoint
		cxt.beginPath();
		//Ŀ��
=======
//删除这个食物/实际上是把它变成蛇身体的一部分
Food.prototype.remove = function(snake){
		//创建这个foodPoint
		cxt.beginPath();
		//目标
>>>>>>> gh-pages
		cxt.fillStyle = "red";
		cxt.fillRect(this.x, this.y, 5, 5);
		cxt.closePath();
	this.add(snake);
}

<<<<<<< HEAD
//snake��
=======
//snake类
>>>>>>> gh-pages
function Snake(){

	Point.apply(this,new Array());
	
<<<<<<< HEAD
	this.nSize = 20;//ÿ��Ĵ�С
	this.nCount = 0;//�Ե���ʳ����Ŀ
	this.nTime = 0; //��ʱ
	this.nDirect = 1;//��ǰ���� left->2 right->1 up->4 down->3
	this.nType = 0;//״̬
	this.aPoints = new Array();	//����Լ�������ĵ�
=======
	this.nSize = 20;//每格的大小
	this.nCount = 0;//吃掉的食物数目
	this.nTime = 0; //用时
	this.nDirect = 1;//当前方向 left->2 right->1 up->4 down->3
	this.nType = 0;//状态
	this.aPoints = new Array();	//组成自己的身体的点
>>>>>>> gh-pages

	

}

Snake.prototype = new Point();

<<<<<<< HEAD
//��ʳ��ĺ�����ͬʱ����������
Snake.prototype.eat = function(food){
		if ((this.aPoints[this.nCount -1].x == food.x) && (snake.aPoints[this.nCount -1].y == food.y)) {//����Ե�Ŀ��
=======
//吃食物的函数，同时会增长身体
Snake.prototype.eat = function(food){
		if ((this.aPoints[this.nCount -1].x == food.x) && (snake.aPoints[this.nCount -1].y == food.y)) {//如果吃掉目标
>>>>>>> gh-pages
            
            var tempPoint = new TempPoint(this.aPoints[this.nCount -1].x, this.aPoints[this.nCount -1].y);
			this.aPoints.push(tempPoint);
			food.remove(this);
			this.nCount++;

        }
};

<<<<<<< HEAD
//��ʼ���ߵ����壬��ʼ��3����
Snake.prototype.initPoint = function(){
	this.nCount = this.nCount+3;
	this.aPoints[0] = new TempPoint(20, 10);//��ʼʱ����������
=======
//初始化蛇的身体，初始有3个点
Snake.prototype.initPoint = function(){
	this.nCount = this.nCount+3;
	this.aPoints[0] = new TempPoint(20, 10);//初始时，蛇有三节
>>>>>>> gh-pages
	this.aPoints[1] = new TempPoint(15, 10);
	this.aPoints[2] = new TempPoint(10, 10);
};

<<<<<<< HEAD
//�ػ��ߵ�����
=======
//重绘蛇的身体
>>>>>>> gh-pages
Snake.prototype.reDisplay = function (x,y)
{
	cxt.clearRect(x-1,y-1,7,7);


<<<<<<< HEAD
	//��ӡ��Ϸ����
	cxt.beginPath();
	//��
=======
	//打印游戏界面
	cxt.beginPath();
	//蛇
>>>>>>> gh-pages
	cxt.fillStyle = "red";
	var index = 0;
	for (index in this.aPoints) {
	cxt.fillRect(this.aPoints[index].x, this.aPoints[index].y, 5, 5);
	}

	cxt.closePath();
}

<<<<<<< HEAD
//̰������ǰ�ܵĺ���
=======
//贪吃蛇向前跑的函数
>>>>>>> gh-pages
Snake.prototype.run = function(x,y){

		var tempPoint = new TempPoint(this.aPoints[this.nCount -1].x, this.aPoints[this.nCount -1].y);

<<<<<<< HEAD
		//���½�����point����Points����
=======
		//把新建立的point加入Points数组
>>>>>>> gh-pages
		//this.aPoints.push(tempPoint);
        
		for (var i = this.nCount-1; i > 0 ; i--) {

            this.aPoints[i].x = this.aPoints[i - 1].x;
            this.aPoints[i].y = this.aPoints[i - 1].y;

        }

        this.aPoints[0].x = x;
        this.aPoints[0].y = y;

		//this.aPoints.pop(tempPoint);

        this.reDisplay(tempPoint.x,tempPoint.y);

}

<<<<<<< HEAD
//̰���߼����ײ�ĺ���
=======
//贪吃蛇检测碰撞的函数
>>>>>>> gh-pages
Snake.prototype.crash = function(x,y){

		var index=0;
        for (index in snake.aPoints) {
            if ((snake.aPoints[index].x == x) && (snake.aPoints[index].y == y)) {
                return true;
            }
        }

}



<<<<<<< HEAD
//����snake����
var snake = new Snake(0,0);
//����food����
var food = new Food();
//����ʳ����ɫ
food.setColor("blue");
food.add(snake);
//��ʼ��
snake.initPoint();
snake.reDisplay();

//��Ӧ������Ϣ���ı��ߵķ���
=======
//创建snake对象
var snake = new Snake(0,0);
//创建food对象
var food = new Food();
//设置食物颜色
food.setColor("blue");
food.add(snake);
//初始化
snake.initPoint();
snake.reDisplay();

//响应按键消息，改变蛇的方向
>>>>>>> gh-pages
function KeyPressed(event)
{
	switch (event.keyCode) {
		case 38://up
		snake.nDirect = 4;

		
		break;
		case 40://down
		snake.nDirect = 3;
		
		break;
		case 37://left
		snake.nDirect = 2;
		
		break;
		case 39://right
		snake.nDirect = 1;
		
		break;
	}
}

<<<<<<< HEAD
//�ڽ�������ʾ������
=======
//在界面上显示的内容
>>>>>>> gh-pages
function Show(score){

	var myScore = document.getElementById("myScore");

	myScore.innerText=score;
	var myTime = document.getElementById("myTime");

	myTime.innerText=Date();
}


<<<<<<< HEAD
//��ͣ����ʼ��ť
=======
//暂停，开始按钮
>>>>>>> gh-pages
var type = false;
function Restart(){

	var myScore = document.getElementById("myButton");

<<<<<<< HEAD
	if(myButton.innerText == "��ʼ"){
		type = false;
		myButton.innerText="��ͣ";

	}else{
		type = true;
		myButton.innerText="��ʼ";
=======
	if(myButton.innerText == "开始"){
		type = false;
		myButton.innerText="暂停";

	}else{
		type = true;
		myButton.innerText="开始";
>>>>>>> gh-pages

	}

	
	
}

<<<<<<< HEAD
//����������������ڣ�����һ����ʱ���ڽ���ѭ��
function Looper() {

	//����event����������Ϣ
	var bTag = false;//��Ϸ�Ƿ�ʧ��
=======
//整个函数的启动入口，按照一定的时间在进行循环
function Looper() {

	//利用event对象处理按键消息
	var bTag = false;//游戏是否失败
>>>>>>> gh-pages
	if(!type){
	
	var nPoint = new TempPoint(snake.aPoints[0].x,snake.aPoints[0].y);

<<<<<<< HEAD
	switch (snake.nDirect) {//left:2 right:1 up:4 down:3 �ߵķ���
=======
	switch (snake.nDirect) {//left:2 right:1 up:4 down:3 蛇的方向
>>>>>>> gh-pages
		case 1:

			nPoint.x+=5;
			break;

		case 2:

			nPoint.x-=5;
			break;

		case 3:
			nPoint.y+=5;
			break;

		case 4:
			nPoint.y-=5;
			break;
	}

<<<<<<< HEAD
	//�ȼ����ײ

	
	//�ж����Ƿ�����������
=======
	//先检测碰撞

	
	//判断蛇是否碰到了自身
>>>>>>> gh-pages
	bTag = snake.crash(nPoint.x,nPoint.y);

	

<<<<<<< HEAD
	//Ȼ����ǰ��
	snake.run(nPoint.x,nPoint.y);
	//����ʳ��
	snake.eat(food);

	//�ж�ײǽ
=======
	//然后向前跑
	snake.run(nPoint.x,nPoint.y);
	//最后吃食物
	snake.eat(food);

	//判断撞墙
>>>>>>> gh-pages
	if(nPoint.x <= 0||nPoint.x >= 200||nPoint.y <= 0|| nPoint.y >= 100){

		bTag = true;
		console.log(bTag);
	}
	
	}



	Show(snake.nCount);
	if (bTag) {
<<<<<<< HEAD
		alert("��Ϸ��ֹ");
=======
		alert("游戏终止");
>>>>>>> gh-pages
	}else{
		setTimeout("Looper()", 500);
	}
}

<<<<<<< HEAD
//��������
=======
//启动函数
>>>>>>> gh-pages
Looper();
