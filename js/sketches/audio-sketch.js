var car;
var mic;
var numReadings = 10;
var readings = [numReadings];
var readIndex = 0;              // the index of the current reading
var total = 0;                  // the running total
var average = 0;
var sum = 0;
let ycoord=0;
let ghostspeed=1
var c=0
var d=0
function setup() {
    createCanvas(windowWidth, windowHeight);
    // Create an Audio input
    mic = new p5.AudioIn();
    myCar = new Car(150, 2);
    myCar = new Car(150, 2);
    // start the Audio Input.
    // By default, it does not .connect() (to the computer speakers)
    mic.start();
    bg = loadImage("bkg.jpg");


}

function draw() {
    // sum = 0;

    // background(bg);
    background(255, 255, 255,150);
    var vol = mic.getLevel();
    // console.log(readings[5)


    // stroke(0);



    var h = map(vol, 0, .1, height, 0);
    if(h> 150){
        ghostspeed =1;
    }else{
ghostspeed=15
    }
    console.log(height-h)
    // var h= mouseY;
    // console.log("h"+h)
    console.log("mousey"+mouseY)
    console.log("ycoord"+ycoord)

    if(h>height-ycoord +10){
        ycoord-= ghostspeed
        console.log("up")
        if(c > -1){
            c -= .2;
        }
        if(d < 20){
            d++
        }
    }
    else if(h<height-ycoord){
        ycoord+= ghostspeed
        console.log("down")
        if(c< 1){
            c += .2;
        }
        if(d > -20){
            d--
        }
    }


    noFill();


    stroke(255, 60, 90,255);
    strokeWeight(15)
    ellipse(175, height- ycoord, 30, 30);
    arc(170, height-ycoord, 70, 70, 2.2-c,3.8 -c);

    arc(150, height-ycoord -d, 100, 100,  2.5-c ,3.5-c);






    // check the xpos of myCar
    if(myCar.xpos > width)
    {
        myCar.xpos = 0;
    }
    // drive myCar
    myCar.drive();
    // display myCar
    myCar.display();
}
// car constructor
function Car()
{
    this.xpos = width;
    this.ypos = random(height/2, height);
    this.speed = 8;
    this.c = color(255, 2, 51);

    // drive method
    this.drive = function()
    {
        if(this.xpos < -50)
        {
            this.xpos = width;
            this.ypos =random(height/2, height)
        }
        this.xpos = this.xpos - this.speed;
    }

    // brake method
    this.brake = function()
    {
        if(this.speed > 0)
        {
            this.speed = this.speed + 0.05;
        } else {
            this.speed = 0;
        }
    }

    // display method
    this.display = function()
    {
        // body of the car
        // fill(this.c);
        noFill();
        rectMode(CORNER);
        strokeWeight(15)
        rect(this.xpos, this.ypos,  100, height);

        fill(0);
        strokeWeight(3)

    }
}
