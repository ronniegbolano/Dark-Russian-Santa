var canvas = document.getElementById("canvas");
const video = document.getElementById('video')
var context = canvas.getContext("2d");


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
  context.drawImage(video, 0, 0, 400, 300);
  console.log("trying new concept");
  const detections = await faceapi.detectAllFaces(canvas).withFaceLandmarks().withFaceDescriptors();
  console.log("detections" + detections.length);


});


