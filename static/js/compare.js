$(document).ready(function () {
  activeMethod = $(".method-button").filter(".is-selected")[0];
  activeScene = $(".scene-button").filter(".is-selected")[0];
  ourVideo = document.getElementById("ours-comparison");
  compVideo = document.getElementById("others-comparison");
  inputViewNum = 4;
});

function selectCompVideo(method, scene) {
  if (method) {
    activeMethod.classList.remove("is-success", "is-selected");
    activeMethod = method;
  }
  if (scene) {
    activeScene.classList.remove("is-success", "is-selected");
    activeScene = scene;
  }
  activeMethod.classList.add("is-success", "is-selected");
  activeScene.classList.add("is-success", "is-selected");

  methodName = activeMethod.getAttribute("value");
  sceneName = activeScene.getAttribute("value");

  videoTime = ourVideo.currentTime;

  let ourVideoReady = false;
  let compVideoReady = false;

  const checkVideosAndPlay = () => {
    if (ourVideoReady && compVideoReady) {
      ourVideo.currentTime = videoTime;
      compVideo.currentTime = videoTime;
      console.log("Playing videos");
    }
  };

  ourVideo.src = "static/videos/comparison/" + sceneName + "_" + inputViewNum + "_GaussianObject.mp4";
  ourVideo.onloadeddata = () => {
    ourVideoReady = true;
    checkVideosAndPlay();
  };
  ourVideo.load();

  compVideo.src = "static/videos/comparison/" + sceneName + "_" + inputViewNum + "_" + methodName + ".mp4";
  if (methodName == "FSGS") {
    if (sceneName == "oppo_obj_27_pumpkin2" || sceneName == "oppo_obj_29_fabric_toy") {
      compVideo.src = "static/videos/comparison/nota.mp4";
    }
  }
  compVideo.onloadeddata = () => {
    compVideoReady = true;
    checkVideosAndPlay();
  };
  compVideo.load();
}
