//==================================
//          定义一个字的类
//==================================

const letters = `冫冖讠厂匚刂冂亻勹厶廴卩阝氵丬忄宀abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`;
var overTime = 15;
var rand = [];
var oneSize;
var showTheTittle = false;


function TittleChar(targetChar, offset, x, y, finalSize, transparent) {
    this.showChar;
    this.targetChar = targetChar;
    this.randChar;
    this.randId;
    this.myCount = 0;
    this.fontSize = 0;
    this.finalSize = finalSize;
    this.alpha = 0;
    this.transparent = transparent;


    this.x = x;
    this.y = y;


    this.offset = random(0, 10);
    this.begin = false;

    this.over = false;

}

TittleChar.prototype.in = function() {

    if (!this.begin) { //in的倒计时，产生一定的开始时差
        this.offset -= 1;
        if (this.offset < 0) {
            this.randId = int(random(0, letters.length - 1));
            this.over = false;
            this.begin = true;
        }
    } else {
        if (this.myCount <= overTime) {
            if (this.myCount % 5 == 0) { //控制变化的速度
                this.randId = int(random(0, letters.length - 1));
            }
            this.randChar = letters[this.randId];
            this.showChar = this.randChar;

            //myCount→fontSizeNow
            var fontSizeNow = sin(this.myCount * (PI / overTime) - PI / 2);
            this.fontSize = map(fontSizeNow, -1, 1, this.finalSize * 0.3, this.finalSize);
            this.alpha = map(fontSizeNow, -1, 1, 0, 200);

            this.myCount += 1;
        } else {
            this.showChar = this.targetChar;

        }
    }


}


TittleChar.prototype.changeToOut = function() {
    if (this.begin) { //in的倒计时，产生一定的开始时差
        this.offset = random(5, 10);
        this.myCount = 0;
        this.showChar = this.targetChar;
        this.begin = false;
    }

}




TittleChar.prototype.out = function() {

    if (!this.begin) {
        this.showChar = this.targetChar;
        if (this.offset < 0) {
            this.randId = int(random(0, letters.length - 1));
            this.begin = true;
        }
        this.offset -= 1;
    } else if (this.begin) {
        if (this.myCount <= overTime) {

            if (this.myCount < 5) {
                this.showChar = this.targetChar;

            } else {
                if (this.myCount % 5 == 0) { //控制变化的速度
                    this.randId = int(random(0, letters.length - 1));
                }

                this.randChar = letters[this.randId];
                this.showChar = this.randChar;

                //myCount→fontSizeNow
                var fontSizeNow = sin(this.myCount * (PI / overTime) + PI / 2);

                this.fontSize = map(fontSizeNow, -1, 1, this.finalSize * 0.8, this.finalSize);
                // this.alpha = map(fontSizeNow, -1, 1, 255, 0);
                this.alpha = map(this.myCount, 0, overTime, 255, 0);

            }


            this.myCount += 1;
        } else {
            //结束，重置
            this.myCount = 0;
            this.fontSize = 0;
            this.alpha = 0;
            this.over = true;
            this.begin = false;
        }
    }



}




TittleChar.prototype.show = function() {
    if (this.transparent) {
        noFill();
        fill(255, 150);
        stroke(0, this.alpha);
        strokeWeight(1);

    } else {
        fill(0, this.alpha);
        stroke(255, 200);
        strokeWeight(3);
        // noStroke();
    }

    textSize(this.fontSize);
    textAlign(LEFT, TOP);
    text(this.showChar, this.x, this.y);


}

TittleChar.prototype.out_show = function() {

    push();
    if (!this.begin) {
        this.showChar = this.targetChar;
        if (!this.transparent) {
            fill(0, this.alpha);
            stroke(255, 200);

        }

    } else {
        noFill();
        stroke(0, this.alpha);
    }
    // 
    if (this.over == false) {

        textSize(this.fontSize);
        textAlign(LEFT, TOP);
        text(this.showChar, this.x, this.y);
    }


    pop();
}

