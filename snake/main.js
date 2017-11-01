

var c=document.getElementById("myCanvas");
var cxt=c.getContext("2d");
cxt.fillStyle="#FF0000";

<<<<<<< HEAD
//pointÀà 
=======
//pointç±» 
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
//×é³ÉsnakeÉíÌåµÄÀà
=======
//ç»„æˆsnakeèº«ä½“çš„ç±»
>>>>>>> gh-pages
function TempPoint(x, y) {
	Point.apply(this,new Array(x,y));
    
}
TempPoint.prototype = new Point();


<<<<<<< HEAD
//FoodµÄÀà
=======
//Foodçš„ç±»
>>>>>>> gh-pages
function Food(x, y) {
	Point.apply(this,new Array(x,y));
}

Food.prototype =  new Point();
<<<<<<< HEAD
//ÔÚ»­²¼ÉÏÌí¼ÓfoodµÄ³ÉÔ±º¯Êý
Food.prototype.add = function(snake){

	//Ëæ»úÈ¡Êý×é±ä³ÉÊ³ÎïµÄ×ó±ß
=======
//åœ¨ç”»å¸ƒä¸Šæ·»åŠ foodçš„æˆå‘˜å‡½æ•°
Food.prototype.add = function(snake){

	//éšæœºå–æ•°ç»„å˜æˆé£Ÿç‰©çš„å·¦è¾¹
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
   //ÅÐ¶ÏÉßÍ·ÊÇ·ñºÍÉßÉíÖØºÏ
=======
   //åˆ¤æ–­è›‡å¤´æ˜¯å¦å’Œè›‡èº«é‡åˆ
>>>>>>> gh-pages
   var bTag = true;
	for (var i = 0; i < snake.nCount - 1; i++) {
                if (snake.aPoints[i].x == this.x || snake.aPoints[i].y == this.y) {
					bTag = false;
                }
	}

	if(bTag){
<<<<<<< HEAD
		//ÔÚ»­²¼ÉÏ´´½¨Õâ¸öfoodPoint
		cxt.beginPath();
		//Ä¿±ê
=======
		//åœ¨ç”»å¸ƒä¸Šåˆ›å»ºè¿™ä¸ªfoodPoint
		cxt.beginPath();
		//ç›®æ ‡
>>>>>>> gh-pages
		cxt.fillStyle = this.sColor;
		cxt.fillRect(this.x, this.y, 5, 5);
		cxt.closePath();
	}else{
		this.add(snake);
	}



}
<<<<<<< HEAD
//É¾³ýÕâ¸öÊ³Îï/Êµ¼ÊÉÏÊÇ°ÑËü±ä³ÉÉßÉíÌåµÄÒ»²¿·Ö
Food.prototype.remove = function(snake){
		//´´½¨Õâ¸öfoodPoint
		cxt.beginPath();
		//Ä¿±ê
=======
//åˆ é™¤è¿™ä¸ªé£Ÿç‰©/å®žé™…ä¸Šæ˜¯æŠŠå®ƒå˜æˆè›‡èº«ä½“çš„ä¸€éƒ¨åˆ†
Food.prototype.remove = function(snake){
		//åˆ›å»ºè¿™ä¸ªfoodPoint
		cxt.beginPath();
		//ç›®æ ‡
>>>>>>> gh-pages
		cxt.fillStyle = "red";
		cxt.fillRect(this.x, this.y, 5, 5);
		cxt.closePath();
	this.add(snake);
}

<<<<<<< HEAD
//snakeÀà
=======
//snakeç±»
>>>>>>> gh-pages
function Snake(){

	Point.apply(this,new Array());
	
<<<<<<< HEAD
	this.nSize = 20;//Ã¿¸ñµÄ´óÐ¡
	this.nCount = 0;//³ÔµôµÄÊ³ÎïÊýÄ¿
	this.nTime = 0; //ÓÃÊ±
	this.nDirect = 1;//µ±Ç°·½Ïò left->2 right->1 up->4 down->3
	this.nType = 0;//×´Ì¬
	this.aPoints = new Array();	//×é³É×Ô¼ºµÄÉíÌåµÄµã
=======
	this.nSize = 20;//æ¯æ ¼çš„å¤§å°
	this.nCount = 0;//åƒæŽ‰çš„é£Ÿç‰©æ•°ç›®
	this.nTime = 0; //ç”¨æ—¶
	this.nDirect = 1;//å½“å‰æ–¹å‘ left->2 right->1 up->4 down->3
	this.nType = 0;//çŠ¶æ€
	this.aPoints = new Array();	//ç»„æˆè‡ªå·±çš„èº«ä½“çš„ç‚¹
>>>>>>> gh-pages

	

}

Snake.prototype = new Point();

<<<<<<< HEAD
//³ÔÊ³ÎïµÄº¯Êý£¬Í¬Ê±»áÔö³¤ÉíÌå
Snake.prototype.eat = function(food){
		if ((this.aPoints[this.nCount -1].x == food.x) && (snake.aPoints[this.nCount -1].y == food.y)) {//Èç¹û³ÔµôÄ¿±ê
=======
//åƒé£Ÿç‰©çš„å‡½æ•°ï¼ŒåŒæ—¶ä¼šå¢žé•¿èº«ä½“
Snake.prototype.eat = function(food){
		if ((this.aPoints[this.nCount -1].x == food.x) && (snake.aPoints[this.nCount -1].y == food.y)) {//å¦‚æžœåƒæŽ‰ç›®æ ‡
>>>>>>> gh-pages
            
            var tempPoint = new TempPoint(this.aPoints[this.nCount -1].x, this.aPoints[this.nCount -1].y);
			this.aPoints.push(tempPoint);
			food.remove(this);
			this.nCount++;

        }
};

<<<<<<< HEAD
//³õÊ¼»¯ÉßµÄÉíÌå£¬³õÊ¼ÓÐ3¸öµã
Snake.prototype.initPoint = function(){
	this.nCount = this.nCount+3;
	this.aPoints[0] = new TempPoint(20, 10);//³õÊ¼Ê±£¬ÉßÓÐÈý½Ú
=======
//åˆå§‹åŒ–è›‡çš„èº«ä½“ï¼Œåˆå§‹æœ‰3ä¸ªç‚¹
Snake.prototype.initPoint = function(){
	this.nCount = this.nCount+3;
	this.aPoints[0] = new TempPoint(20, 10);//åˆå§‹æ—¶ï¼Œè›‡æœ‰ä¸‰èŠ‚
>>>>>>> gh-pages
	this.aPoints[1] = new TempPoint(15, 10);
	this.aPoints[2] = new TempPoint(10, 10);
};

<<<<<<< HEAD
//ÖØ»æÉßµÄÉíÌå
=======
//é‡ç»˜è›‡çš„èº«ä½“
>>>>>>> gh-pages
Snake.prototype.reDisplay = function (x,y)
{
	cxt.clearRect(x-1,y-1,7,7);


<<<<<<< HEAD
	//´òÓ¡ÓÎÏ·½çÃæ
	cxt.beginPath();
	//Éß
=======
	//æ‰“å°æ¸¸æˆç•Œé¢
	cxt.beginPath();
	//è›‡
>>>>>>> gh-pages
	cxt.fillStyle = "red";
	var index = 0;
	for (index in this.aPoints) {
	cxt.fillRect(this.aPoints[index].x, this.aPoints[index].y, 5, 5);
	}

	cxt.closePath();
}

<<<<<<< HEAD
//Ì°³ÔÉßÏòÇ°ÅÜµÄº¯Êý
=======
//è´ªåƒè›‡å‘å‰è·‘çš„å‡½æ•°
>>>>>>> gh-pages
Snake.prototype.run = function(x,y){

		var tempPoint = new TempPoint(this.aPoints[this.nCount -1].x, this.aPoints[this.nCount -1].y);

<<<<<<< HEAD
		//°ÑÐÂ½¨Á¢µÄpoint¼ÓÈëPointsÊý×é
=======
		//æŠŠæ–°å»ºç«‹çš„pointåŠ å…¥Pointsæ•°ç»„
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
//Ì°³ÔÉß¼ì²âÅö×²µÄº¯Êý
=======
//è´ªåƒè›‡æ£€æµ‹ç¢°æ’žçš„å‡½æ•°
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
//´´½¨snake¶ÔÏó
var snake = new Snake(0,0);
//´´½¨food¶ÔÏó
var food = new Food();
//ÉèÖÃÊ³ÎïÑÕÉ«
food.setColor("blue");
food.add(snake);
//³õÊ¼»¯
snake.initPoint();
snake.reDisplay();

//ÏìÓ¦°´¼üÏûÏ¢£¬¸Ä±äÉßµÄ·½Ïò
=======
//åˆ›å»ºsnakeå¯¹è±¡
var snake = new Snake(0,0);
//åˆ›å»ºfoodå¯¹è±¡
var food = new Food();
//è®¾ç½®é£Ÿç‰©é¢œè‰²
food.setColor("blue");
food.add(snake);
//åˆå§‹åŒ–
snake.initPoint();
snake.reDisplay();

//å“åº”æŒ‰é”®æ¶ˆæ¯ï¼Œæ”¹å˜è›‡çš„æ–¹å‘
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
//ÔÚ½çÃæÉÏÏÔÊ¾µÄÄÚÈÝ
=======
//åœ¨ç•Œé¢ä¸Šæ˜¾ç¤ºçš„å†…å®¹
>>>>>>> gh-pages
function Show(score){

	var myScore = document.getElementById("myScore");

	myScore.innerText=score;
	var myTime = document.getElementById("myTime");

	myTime.innerText=Date();
}


<<<<<<< HEAD
//ÔÝÍ££¬¿ªÊ¼°´Å¥
=======
//æš‚åœï¼Œå¼€å§‹æŒ‰é’®
>>>>>>> gh-pages
var type = false;
function Restart(){

	var myScore = document.getElementById("myButton");

<<<<<<< HEAD
	if(myButton.innerText == "¿ªÊ¼"){
		type = false;
		myButton.innerText="ÔÝÍ£";

	}else{
		type = true;
		myButton.innerText="¿ªÊ¼";
=======
	if(myButton.innerText == "å¼€å§‹"){
		type = false;
		myButton.innerText="æš‚åœ";

	}else{
		type = true;
		myButton.innerText="å¼€å§‹";
>>>>>>> gh-pages

	}

	
	
}

<<<<<<< HEAD
//Õû¸öº¯ÊýµÄÆô¶¯Èë¿Ú£¬°´ÕÕÒ»¶¨µÄÊ±¼äÔÚ½øÐÐÑ­»·
function Looper() {

	//ÀûÓÃevent¶ÔÏó´¦Àí°´¼üÏûÏ¢
	var bTag = false;//ÓÎÏ·ÊÇ·ñÊ§°Ü
=======
//æ•´ä¸ªå‡½æ•°çš„å¯åŠ¨å…¥å£ï¼ŒæŒ‰ç…§ä¸€å®šçš„æ—¶é—´åœ¨è¿›è¡Œå¾ªçŽ¯
function Looper() {

	//åˆ©ç”¨eventå¯¹è±¡å¤„ç†æŒ‰é”®æ¶ˆæ¯
	var bTag = false;//æ¸¸æˆæ˜¯å¦å¤±è´¥
>>>>>>> gh-pages
	if(!type){
	
	var nPoint = new TempPoint(snake.aPoints[0].x,snake.aPoints[0].y);

<<<<<<< HEAD
	switch (snake.nDirect) {//left:2 right:1 up:4 down:3 ÉßµÄ·½Ïò
=======
	switch (snake.nDirect) {//left:2 right:1 up:4 down:3 è›‡çš„æ–¹å‘
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
	//ÏÈ¼ì²âÅö×²

	
	//ÅÐ¶ÏÉßÊÇ·ñÅöµ½ÁË×ÔÉí
=======
	//å…ˆæ£€æµ‹ç¢°æ’ž

	
	//åˆ¤æ–­è›‡æ˜¯å¦ç¢°åˆ°äº†è‡ªèº«
>>>>>>> gh-pages
	bTag = snake.crash(nPoint.x,nPoint.y);

	

<<<<<<< HEAD
	//È»ºóÏòÇ°ÅÜ
	snake.run(nPoint.x,nPoint.y);
	//×îºó³ÔÊ³Îï
	snake.eat(food);

	//ÅÐ¶Ï×²Ç½
=======
	//ç„¶åŽå‘å‰è·‘
	snake.run(nPoint.x,nPoint.y);
	//æœ€åŽåƒé£Ÿç‰©
	snake.eat(food);

	//åˆ¤æ–­æ’žå¢™
>>>>>>> gh-pages
	if(nPoint.x <= 0||nPoint.x >= 200||nPoint.y <= 0|| nPoint.y >= 100){

		bTag = true;
		console.log(bTag);
	}
	
	}



	Show(snake.nCount);
	if (bTag) {
<<<<<<< HEAD
		alert("ÓÎÏ·ÖÕÖ¹");
=======
		alert("æ¸¸æˆç»ˆæ­¢");
>>>>>>> gh-pages
	}else{
		setTimeout("Looper()", 500);
	}
}

<<<<<<< HEAD
//Æô¶¯º¯Êý
=======
//å¯åŠ¨å‡½æ•°
>>>>>>> gh-pages
Looper();
