import { ctx, fileInput, canvas } from "./variables.js";

const faceDecuction = () => {
  async function loadModels() {
    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
    await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
  }
};
fileInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];

  if (file) {
    if (!faceapi.nets.tinyFaceDetector.params) {
      awaitloadModels();
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const img = await faceapi.bufferToImage(file);
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const detections = await faceapi
      .detectAllFaces(img)
      .withFaceLandmarks()
      .withFaceDescriptors();

    const faceSize = 150;
    const drawOptions = {
      lineWidth: 2,
      drawLines: true,
    };
    detections.forEach((detection) => {
      const box = detection.detection.box;
      const drawBox = new faceapi.draw.DrawBox(box, drawOptions);
      drawBox.draw(canvas);
    });
  }
});
export default faceDecuction;
