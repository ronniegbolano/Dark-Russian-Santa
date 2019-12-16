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
  console.log("trying new concept");
  displaySize = {width:canvas.width, height:canvas.height};
  const detections = await faceapi.detectAllFaces(canvas).withFaceLandmarks().withFaceDescriptors();
  console.log("detections" + detections.length);
  const resizedDetections = faceapi.resizeResults(detections,displaySize);
  resizedDetections.forEach(detections  => {
    const box = detections.detection.box;
    const drawBox = new faceapi.draw.DrawBox(box, { label: "face" });
    drawBox.draw(canvas);
    console.log(drawBox);
  });

  if(detections[0]){
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
        100,
        150
    );
  }else{
    //write some error your face could not be recognized
    console.log("your face isn't being recognized!")

  }
 
});


