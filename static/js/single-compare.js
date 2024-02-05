$(document).ready(function () {
  activeSingleMethod = $(".single-method-button").filter(".is-selected")[0];
  compVideo = document.getElementById("single-comparison");
  compCanvas = document.getElementById("single-comparison-canvas");
  inputViewNum = 4;
});

function selectSingleCompVideo(method) {
  activeSingleMethod.classList.remove("is-success", "is-selected");
  activeSingleMethod = method;
  activeSingleMethod.classList.add("is-success", "is-selected");

  methodName = activeSingleMethod.getAttribute("value");

  compVideo.src = "static/videos/refresh/mip360_kitchen_" + inputViewNum + "_" + methodName + ".mp4";
  compVideo.load();
}

function playVids() {
  var position = 0.5;
  var vidWidth = compVideo.videoWidth / 2;
  var vidHeight = compVideo.videoHeight;

  var mergeContext = compCanvas.getContext("2d");

  if (compVideo.readyState > 3) {
    compVideo.play();

    function trackLocation(e) {
      // Normalize to [0, 1]
      bcr = compCanvas.getBoundingClientRect();
      position = (e.pageX - bcr.x) / bcr.width;
    }
    function trackLocationTouch(e) {
      // Normalize to [0, 1]
      bcr = compCanvas.getBoundingClientRect();
      position = (e.touches[0].pageX - bcr.x) / bcr.width;
    }

    compCanvas.addEventListener("mousemove", trackLocation, false);
    compCanvas.addEventListener("touchstart", trackLocationTouch, false);
    compCanvas.addEventListener("touchmove", trackLocationTouch, false);

    function drawLoop() {
      mergeContext.drawImage(compVideo, 0, 0, vidWidth, vidHeight, 0, 0, vidWidth, vidHeight);
      var colStart = (vidWidth * position).clamp(0.0, vidWidth);
      var colWidth = (vidWidth - vidWidth * position).clamp(0.0, vidWidth);
      mergeContext.drawImage(compVideo, colStart + vidWidth, 0, colWidth, vidHeight, colStart, 0, colWidth, vidHeight);
      requestAnimationFrame(drawLoop);

      var arrowLength = 0.09 * vidHeight;
      var arrowheadWidth = 0.025 * vidHeight;
      var arrowheadLength = 0.04 * vidHeight;
      var arrowPosY = vidHeight / 10;
      var arrowWidth = 0.007 * vidHeight;
      var currX = vidWidth * position;

      // Draw circle
      mergeContext.arc(currX, arrowPosY, arrowLength * 0.7, 0, Math.PI * 2, false);
      mergeContext.fillStyle = "#FFD79340";
      mergeContext.fill();
      //mergeContext.strokeStyle = "#444444";
      //mergeContext.stroke()

      // Draw border
      mergeContext.beginPath();
      mergeContext.moveTo(vidWidth * position, 0);
      mergeContext.lineTo(vidWidth * position, vidHeight);
      mergeContext.closePath();
      mergeContext.strokeStyle = "#444444";
      mergeContext.lineWidth = 5;
      mergeContext.stroke();

      // Draw arrow
      mergeContext.beginPath();
      mergeContext.moveTo(currX, arrowPosY - arrowWidth / 2);

      // Move right until meeting arrow head
      mergeContext.lineTo(
        currX + arrowLength / 2 - arrowheadLength / 2,
        arrowPosY - arrowWidth / 2
      );

      // Draw right arrow head
      mergeContext.lineTo(
        currX + arrowLength / 2 - arrowheadLength / 2,
        arrowPosY - arrowheadWidth / 2
      );
      mergeContext.lineTo(currX + arrowLength / 2, arrowPosY);
      mergeContext.lineTo(
        currX + arrowLength / 2 - arrowheadLength / 2,
        arrowPosY + arrowheadWidth / 2
      );
      mergeContext.lineTo(
        currX + arrowLength / 2 - arrowheadLength / 2,
        arrowPosY + arrowWidth / 2
      );

      // Go back to the left until meeting left arrow head
      mergeContext.lineTo(
        currX - arrowLength / 2 + arrowheadLength / 2,
        arrowPosY + arrowWidth / 2
      );

      // Draw left arrow head
      mergeContext.lineTo(
        currX - arrowLength / 2 + arrowheadLength / 2,
        arrowPosY + arrowheadWidth / 2
      );
      mergeContext.lineTo(currX - arrowLength / 2, arrowPosY);
      mergeContext.lineTo(
        currX - arrowLength / 2 + arrowheadLength / 2,
        arrowPosY - arrowheadWidth / 2
      );
      mergeContext.lineTo(
        currX - arrowLength / 2 + arrowheadLength / 2,
        arrowPosY
      );

      mergeContext.lineTo(
        currX - arrowLength / 2 + arrowheadLength / 2,
        arrowPosY - arrowWidth / 2
      );
      mergeContext.lineTo(currX, arrowPosY - arrowWidth / 2);

      mergeContext.closePath();

      mergeContext.fillStyle = "#444444";
      mergeContext.fill();
    }
    requestAnimationFrame(drawLoop);
  }
}

Number.prototype.clamp = function (min, max) {
  return Math.min(Math.max(this, min), max);
};

function resizeAndPlay(element) {
  compCanvas.width = element.videoWidth / 2;
  compCanvas.height = element.videoHeight;
  console.log(element.videoWidth, element.videoHeight, compCanvas.width, compCanvas.height);
  element.play();
  element.style.height = "0px";
  playVids();
}
