var placeHeight;
var targetY; //动态上下区域的【目标Y】
var dragPlaceY; //动态上下区域的【实时Y】
var speed = 0.1;
var mouseReady = false;






var prevId = -2; //用于储存最后一个被点击的box对象的ID
var nowId = -1;
var targetTittle = "";
var targetTime = "";
var tittleChars = [];
var timeChars = [];


var isClean = true;
var fullTextWidth;


function isPressed_placeShow() {


    rectMode(CORNER);
    placeHeight = windowHeight / 4;
    targetY = windowHeight;
    if (mConstraint.body) { //【状态1】被点击
        getNowUrl();
        if (mouseY > dragPlaceY) {
            mouseReady = true; //【状态2】拖拽至打开区域
         
        } else {
            mouseReady = false;
        }

        placeShow();

    } else {
        placeOut(); //【状态3】未拖拽至打开去，松开。
    }


}

//------
var wavePx = [];
var targetAngle = [],
    angle = [];
var waveTargetY, waveY;
var targetAmp, amp;
var targetSpeed, speed;

//-------

function waveSetup() {
    let total = 50;
    for (let i = 0; i < total + 1; i++) {
        angle[i] = map(i, 0, total, 0, TWO_PI);
        wavePx[i] = (width + 10) / total * i;

    }
    dragPlaceY = height;
    waveY = height;
    amp = 0;
    speed = 0;
}


function waveShow() {
    let lerpSpeed = 0.075;
    waveY = lerp(waveY, waveTargetY, lerpSpeed);
    amp = lerp(amp, targetAmp, lerpSpeed);
    speed = lerp(speed, targetSpeed, lerpSpeed);

    push();
    translate(0, waveY);
    stroke(0);
    strokeWeight(1);
    fill(255, 255, 0);
    noStroke();
    beginShape();
    if (wavePx != []) {
        for (let i = 0; i < wavePx.length; i++) {
            let y = amp * sin(angle[i]);
            vertex(wavePx[i], y);
            angle[i] += speed;
        }
    }
    vertex(width, height);
    vertex(0, height);

    endShape(CLOSE);

    pop();
}



function isPressed_infoShow() {

    if (mConstraint.body) {
        workTittleGrenerate(); //如果Id发生了更新，则从新生成。
        workInfoShow();
    } else {
        workInfoOut();
    }
}


var tittleSize;

function newTittleSize(nowTittleTextWidth) {
    this.w = nowTittleTextWidth;
    let scale = width * 0.8 / this.w;
    tittleSize *= scale;
    if (tittleSize > 110) {
        tittleSize = 110;
    }

    return tittleSize;
}

function workTittleGrenerate() {

    if (mouseIsPressed) {
        if (mConstraint.body) {
            released = false;
        } else {
            released = true;
        }
    }


    //如果Id发生了更新，则从新生成。
    if (prevId != nowId && !isClean) {
        tittleChars.splice(0, tittleChars.length);
        timeChars.splice(0, timeChars.length);
        isClean = true;
    }

    //NEW GROUP
    if (isClean) {
        tittleSize = windowHeight * 0.08; //目标值
        var timeSize = tittleSize * 0.5;
        var textX;
        var tittlePosY = height / 3 ;

        //=======创建 TITTLE 字符=========
        targetTittle = boxes[nowId].postTittle;
        if (tittleChars.length < targetTittle.length) { //限制只加一次

            textSize(tittleSize);

            tittleSize = newTittleSize(textWidth(targetTittle));
            textSize(tittleSize);
            fullTextWidth = textWidth(targetTittle);
            textX = windowWidth / 2 - fullTextWidth / 2; //第一个字的X
            // textX =0; //第一个字的X
            for (var i = 0; i < targetTittle.length; i++) {
                if (i > 0) {
                    textX = textX + textWidth(targetTittle[i - 1]);
                }
                var f = new TittleChar(targetTittle[i], i, textX, tittlePosY, tittleSize, false);
                tittleChars.push(f);
            }
        }

        //=======创建 TIME 字符=========
        targetTime = boxes[nowId].postTime;
        if (timeChars.length < targetTime.length) {

            textSize(timeSize);
            textAlign(LEFT);
            fullTextWidth = textWidth(targetTime);
            textX = windowWidth / 2 - fullTextWidth / 2; //第一个字的X       
            if (timeChars.length < targetTime.length) {
                for (var i = 0; i < targetTime.length; i++) {
                    if (i > 0) {
                        textX = textX + textWidth(targetTime[i - 1]);
                    }
                    var t = new TittleChar(targetTime[i], i, textX, tittlePosY + tittleSize * 1.2, timeSize, true);
                    timeChars.push(t);
                }

            }

        }

        //=======创建完毕,记录为prevId=========
        if (tittleChars.length == targetTittle.length && timeChars.length == targetTime.length) {
            prevId = nowId;
            isClean = false;
        }


    }



}


function workInfoShow() {
    //portfolio-info
    textAlign(LEFT, BOTTOM);
    if (tittleChars != []) {
        for (var i = 0; i < targetTittle.length; i++) {
            tittleChars[i].in();
            tittleChars[i].show();
        }

    }
    textAlign(LEFT, TOP);
    if (timeChars != []) {
        for (var i = 0; i < targetTime.length; i++) {
            timeChars[i].in();
            timeChars[i].show();
        }
    }

}


function workInfoOut() {
    if (tittleChars != []) {
        for (var i = 0; i < targetTittle.length; i++) {
            tittleChars[i].out();

        }

        for (var i = 0; i < targetTittle.length; i++) {
            tittleChars[i].out_show();
        }
    }


    if (timeChars != []) {
        for (var i = 0; i < targetTime.length; i++) {
            timeChars[i].out();           
        }

        for (var i = 0; i < targetTime.length; i++) {     
            timeChars[i].out_show();
        }

    }



}


function placeShow() {
    //DragPlace



    var prompt = "";
    var speed = 0.3;

    if (mouseReady) {
        targetY = windowHeight - placeHeight;
        dragPlaceY = lerp(dragPlaceY, targetY, speed);

        prompt = "松手打开";
        waveTargetY = targetY;
        targetAmp = 20;
        targetSpeed = 0.2;


    } else {

        targetY = windowHeight - placeHeight / 2;
        dragPlaceY = lerp(dragPlaceY, targetY, speed);

        prompt = "拖拽至此查看详情";
        waveTargetY = targetY;
        targetAmp = 10;
        targetSpeed = 0.1;

    }
    waveShow();

    var infoSize = placeHeight / 10;
    textSize(infoSize);
    // noFill(0);
    noStroke();
    fill(0, 200);
    // strokeWeight(1);
    textStyle(BOLD);
    textAlign(CENTER);
    text(prompt, width / 2, amp * sin(angle[10]) + waveTargetY + placeHeight / 4);

}



function placeOut() {

    waveTargetY = height + 10;
    targetAmp = 0;
    targetSpeed = 0;
    waveShow();

}



var imgShowSinAngle;
var imgMaskAlpha = 255;
var bgImg_h, bgImg_w;

function pressedWorkImgShow() {
    console.log('angle: ' + imgShowSinAngle);

    let angleSpeed = 0.03;

    if (nowId >= 0 && mConstraint.body) {
        bgImg_h = imgP[nowId].height;
        bgImg_w = imgP[nowId].width

        let scale = width / imgP[nowId].width;
        bgImg_w = width;
        bgImg_h = bgImg_h * scale;
        if (bgImg_h < height) {
            let scale = height / bgImg_h;
            bgImg_w *= scale;
            bgImg_h *= scale;
        }

        imgMaskAlpha = map(sin(imgShowSinAngle * angleSpeed), -1, 1, 255, 200);
        imgShowSinAngle += 1;


        image(imgP[nowId], 0, 0, bgImg_w, bgImg_h);
        background(240, imgMaskAlpha);

    } else if (nowId >= 0 && released) {

        let target_imgMaskAlpha = 255;
        imgMaskAlpha = lerp(imgMaskAlpha, target_imgMaskAlpha, 0.05)

        image(imgP[nowId], 0, 0, bgImg_w, bgImg_h);
        background(240, imgMaskAlpha);
        imgShowSinAngle = -PI / 2 / angleSpeed;


    } else {
        imgShowSinAngle = -PI / 2 / angleSpeed;
    }



}

