var textY;

class Box{

    constructor(x, y, w, h, img, postTittle, postTime, postLink) {

        var options = {
            friction: 0.4,
            restitution: 0.6,
            frictionAir: random(0.02, 0.1),
            angle: random(-PI / 2, PI / 2)
                // angle: 0
    
        }
        this.body = Bodies.rectangle(x, y, w, h, options);
        World.add(world, this.body);
        // Body.setAngle(this.body, 0);
        Body.scale(this.body, 0.5, 0.5);
        Body.scale(this.body, 2, 2);
        this.w = w;
        this.h = h;
        this.imgP = img;
        this.isPressed = false;
        this.postTittle = postTittle;
        this.postTime = postTime;
        this.postLink = postLink;
    
    
    
        this.update = function() {
    
    
            if (this.body == mConstraint.body) {
                this.isPressed = true;
            } else {
                this.isPressed = false;
    
            }
    
        }
    
        this.show = function() {
            var pos = this.body.position;
            var angle = this.body.angle;
            push();
            translate(pos.x, pos.y);
            rotate(angle);
            rectMode(CENTER);
            imageMode(CENTER);
            image(this.imgP, 0, 0, this.w, this.h);
    
    //         if (!this.isPressed && !released) {
    //             noStroke();
    //             fill(255, 80); //透明度烟雾弹！
    //             rect(0, 0, this.w, this.h);
    // 
    //         }
    
    
    
            if (this.isPressed) {
                stroke(255, 200, 0);
                strokeWeight(5);
                noFill();
                rect(0, 0, this.w, this.h);
            }
            pop();
    
    
    
        }
    
    
        this.removeBody=function() {
            World.remove(world, this.body);
        }
    
    }


}



//=========
//  边界
//=========

class Boundary{

    constructor(x, y, w, h, pType) {

        var options = {
            friction: 0.3, //f
            restitution: 0.5, //弹性
            // angle: a,
            isStatic: true
        }
        this.body = Bodies.rectangle(x, y, w, h, options);
        World.add(world, this.body);
        this.w = w;
        this.h = h;
        this.pType = pType;
        this.update = function() {
            var xTarget;
            var yTarget;
            if (this.pType == "BOTTOM") {
                xTarget = windowWidth / 2;
                yTarget = windowHeight + this.h / 2;
            } else if (this.pType == "TOP") {
                xTarget = windowWidth / 2;
                yTarget = windowHeight / 5 - this.h / 2;
            } else if (this.pType == "LEFT") {
                xTarget = 0 - this.w / 2;
                yTarget = windowHeight / 2;
            } else if (this.pType == "RIGHT") {
                xTarget = windowWidth + this.w / 2;
                yTarget = windowHeight / 2;
            }
    
            Body.setVelocity(this.body, { x: xTarget - this.body.position.x, y: yTarget - this.body.position.y });
            Body.setPosition(this.body, { x: xTarget, y: yTarget });
    
    
        }
    
    
        this.show = function() {
            var pos = this.body.position;
            var angle = this.body.angle;
    
    
            push();
            rectMode(CENTER);
            translate(pos.x, pos.y);
            // rotate(angle);
            noStroke();
    
            if (this.pType == "TOP") {
                noFill();
            } else { fill(0); }
            rect(0, 0, this.w, this.h);
    
            pop();
    
        }
    
    
    }

}


