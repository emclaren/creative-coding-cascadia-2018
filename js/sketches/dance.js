let video;
let poseNet;
let poses = [];
let color1 = 0;
let color2 = 0;
var videoShowing = false;
var song
var analyzer;
var speed = 1.0;
var x = 0
var slowdown = false;

preload = () => {
  song = loadSound('assets/callmeal.m4a');
}

setup = () => {
  createCanvas(window.innerWidth, window.innerHeight);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);

  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function (results) {
    poses = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();

  // button to hide the video
  button = createButton('Show Video');
  button.mousePressed(toggleVideo);

  // create a new Amplitude analyzer
  analyzer = new p5.Amplitude();
  // Patch the input to an volume analyzer
  analyzer.setInput(song);

  // no fill in the circles
  noFill();
}

modelReady = () =>{
  document.getElementById("status").setAttribute("style", "display:none;");;
}



draw = () => {
  // Get audio amplitude
  var rms = analyzer.getLevel();
  bkg = map(rms, 0, 1, 255, 0)
  background(bkg, bkg, 255, 40);
  if (videoShowing) {
    image(video, 0, 0, width, height);
  }
  stroke(color1, 24, color2);

  // Draw figure
  drawKeypoints();

  // var slow down the speed of the song
  slowDown();
}


// A function to draw ellipses over the detected keypoints
drawKeypoints = () => {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = poses[i].pose.keypoints[j];
      // Only do the following if the pose probability is bigger than 0.2, in this case it slows down the music
      if (keypoint.score < 0.2) {
        slowdown = true;
        x = 0
      }
      else{
        slowdown = false;
      }


      // shoulders
      let leftShoulder = poses[i].pose.keypoints[5]
      let rightShoulder = poses[i].pose.keypoints[6]
      line (leftShoulder.position.x+random(-30, 30), leftShoulder.position.y+random(-30, 30), rightShoulder.position.x+random(-30, 30), rightShoulder.position.y+random(-30, 30) )


      // left arm
      let leftElbow = poses[i].pose.keypoints[7]
      line (leftElbow.position.x+random(-30, 30), leftElbow.position.y+random(-30, 30), leftShoulder.position.x+random(-30, 30), leftShoulder.position.y+random(-30, 30) )

      //right arm
      let rightElbow = poses[i].pose.keypoints[8]
      line (rightElbow.position.x+random(-30, 30), rightElbow.position.y+random(-30, 30), rightShoulder.position.x+random(-30, 30), rightShoulder.position.y+random(-30, 30) )

      // left wrist
      let leftWrist = poses[i].pose.keypoints[9]
      line (leftWrist.position.x+random(-30, 30), leftWrist.position.y+random(-30, 30), leftElbow.position.x+random(-30, 30), leftElbow.position.y+random(-30, 30) )

      // right wrist
      let rightWrist = poses[i].pose.keypoints[10]
      line (rightWrist.position.x+random(-30, 30), rightWrist.position.y+random(-30, 30), rightElbow.position.x+random(-30, 30), rightElbow.position.y+random(-30, 30) )

      // ears
      let leftEar = poses[i].pose.keypoints[3]
      let rightEar = poses[i].pose.keypoints[4]
      let earAvgX = (leftEar.position.x+rightEar.position.x)/2
      let earAvgY = (leftEar.position.y+rightEar.position.y)/2

      // hips
      let leftHip = poses[i].pose.keypoints[11]
      let rightHip = poses[i].pose.keypoints[12]
      let pointmid = (leftHip.position.x+rightHip.position.x)/2
      let pointmid2 = (leftHip.position.y+rightHip.position.y)/2

      // head
      ellipse(earAvgX+random(-30, 30), earAvgY+random(-30, 30), rightEar.position.x-leftEar.position.x +random(-30, 30), rightEar.position.x-leftEar.position.x+random(-30, 30) )
      line(pointmid+random(-30, 30), pointmid2+random(-30, 30), leftShoulder.position.x+random(-30, 30), leftShoulder.position.y+random(-30, 30) )
      line(pointmid+random(-30, 30), pointmid2+random(-30, 30), rightShoulder.position.x+random(-30, 30), rightShoulder.position.y+random(-30, 30) )

      // knees
      let leftKnee = poses[i].pose.keypoints[13]
      let rightKnee = poses[i].pose.keypoints[14]
      line(pointmid+random(-30, 30), pointmid2+random(-30, 30), leftKnee.position.x+random(-30, 30), leftKnee.position.y+random(-30, 30) )
      line(pointmid+random(-30, 30), pointmid2+random(-30, 30), rightKnee.position.x+random(-30, 30), rightKnee.position.y+random(-30, 30) )

      // ankles
      let leftAnkle = poses[i].pose.keypoints[15]
      let rightAnkle = poses[i].pose.keypoints[16]
      line(leftAnkle.position.x+random(-30, 30), leftAnkle.position.y+random(-30, 30) , leftKnee.position.x+random(-30, 30), leftKnee.position.y+random(-30, 30) )
      line(rightAnkle.position.x+random(-30, 30), rightAnkle.position.y+random(-30, 30) , rightKnee.position.x+random(-30, 30), rightKnee.position.y+random(-30, 30) )

      // change stroke based on wrist position
      color1 = map(rightWrist.position.y, 0, height, 255, 0);
      color2 = map(leftWrist.position.y, 0, height, 255, 0);

    }
  }
}

slowDown = () => {
  song.rate(1-x);
  if (slowdown && x<1) {
    x+= .01;
  } else if (slowdown && x>= 1) {
    x = 1;
  } else{
    x = 0;
  }
}

// Toggle video on and off
toggleVideo = () => {
  videoShowing = !videoShowing
}

// Click to start video
mousePressed = () => {

  if (song.isPlaying()) { // .isPlaying() returns a boolean
    song.stop();
    background(255, 0, 0);
  } else {
    song.play();
    background(0, 255, 0);
  }
}