


function loadMatterJs() {


    //加载matter.js
    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);
    canvasMouse = Mouse.create(canvas.elt);
    canvasMouse.pixelRatio = pixelDensity();
    World.add(world, canvasMouse);
    engine.world.gravity.y = -0.1;


    let options = {
        mouse: canvasMouse
    }
    mConstraint = MouseConstraint.create(engine, options);
    World.add(world, mConstraint);

    rectMode(CENTER);
    let h = 50;
    let heightMax = height * 10;
    let widthMax = width * 10;
    let ground1 = new Boundary(width / 2, height, widthMax, h, "BOTTOM");
    let ground2 = new Boundary(width / 2, height / 3, widthMax, h, "TOP");
    let ground3 = new Boundary(0, height / 2, h, heightMax, "LEFT");
    let ground4 = new Boundary(width, height / 2, h, heightMax, "RIGHT");
    boundaries.push(ground1);
    boundaries.push(ground2);
    boundaries.push(ground3);
    boundaries.push(ground4);



    //创建带有图像的box
    for (let i = 0; i < imgP.length; i++) {
        let imgScale = imgScaleNum(imgP[i].width);
        boxes.push(
            new Box(random(50, width - 50), random(height, height / 2),
                imgP[i].width * imgScale, imgP[i].height * imgScale,
                imgP[i],
                postTittle[i],
                postTimes[i],
                postLinks[i]
            ));
    }


}


function showAllBoxes(){
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].update();
        boxes[i].show();
    }
}


function showAllBoundaries(){
    for (let i = 0; i < boundaries.length; i++) {
        boundaries[i].update();
        boundaries[i].show();
    }
}

// 获取当前点击的对象的链接


function getNowUrl(){

    for (var i = 0; i < boxes.length; i++) {
        if (boxes[i].body == mConstraint.body) {
            nowLink = boxes[i].postLink;
          
        }
    }

 
}



function imgScaleNum(w) {
    this.w = w;
    let scaleTarget;
    if (windowWidth < windowHeight) {
        scaleTarget = (windowWidth / 5) / this.w;

    } else {
        scaleTarget = (windowHeight / 5) / this.w;
    }
    return scaleTarget;
}


function getNowId() {

    if (mConstraint.body) {
        for (var i = 0; i < boxes.length; i++) {
            if (boxes[i].body == mConstraint.body) {
                nowId = i; //实时判断当次点击的对象Id，进而确定是否和上次是一样的对象。
            }
        }
    }

}