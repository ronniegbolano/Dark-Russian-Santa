var canvas = document.getElementById("canvas");
const video = document.getElementById('video')
var context = canvas.getContext("2d");
var rectangleCanvas = document.getElementById("rectangleCanvas");
var ctx = rectangleCanvas.getContext("2d");




Promise.all([
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}


document.getElementById("snap").addEventListener("click", async () => {
  const container = document.createElement('div');
  container.style.position = 'relative';
  context.drawImage(video, 0, 0, 400, 300);
  displaySize = {width:canvas.width, height:canvas.height};
  const detections = await faceapi.detectAllFaces(canvas).withFaceLandmarks().withFaceDescriptors();
  console.log("detections" + detections.length);
  const resizedDetections = faceapi.resizeResults(detections,displaySize);
  resizedDetections.forEach(detections  => {
    const box = detections.detection.box;
    const drawBox = new faceapi.draw.DrawBox(box, { label: "face" });
    drawBox.draw(canvas);
  });

  //create error messages if there is not exactly one face detected
  if(detections.length > 1){
    alert("Error! There is more than one face detected. Please make sure only one face is detected and try again.");
  }
  else if(detections.length == 1){
    var x = detections[0].detection.box.x;
    var y =  detections[0].detection.box.y;
    var width =  detections[0].detection.box.width;
    var height = detections[0].detection.box.height;
    //save canvas as an image    
    //draw image based on previous image
    ctx.drawImage(
        canvas,
        x,
        y,
        width,
        height,
        0,
        0,
        width,
        height
    );
    
    //convert canvas to image
    var img = rectangleCanvas.toDataURL("image/png");
    <img src="smiley.gif" alt="Smiley face"/>
    document.body.append('<img src="'+img+'"/>');
  }else{
    //write some error your face could not be recognized
    alert("Error! Your face isn't being recognized! Please try again in better lighting.");
  }
 
});


