$(document).ready(function() {
  preloadVideos();
})

function preloadVideo(url) {
  var video = document.createElement('video');
  video.src = url;
  video.preload = "auto";
  video.style.display = "none";
  document.body.appendChild(video);
}

function preloadVideos() {
  methods = ["3DGS", "DVGO", "DietNeRF", "RegNeRF", "FreeNeRF", "SparseNeRF", "ZeroRF", "FSGS"];
  scenes = ["omni3d_dinosaur_006", "mip360_bonsai", "mip360_garden", "mip360_kitchen", "omni3d_broccoli_003", "omni3d_suitcase_006", "omni3d_hamburger_012", "omni3d_pineapple_013", "omni3d_vase_012", "oppo_obj_27_pumpkin2", "oppo_obj_29_fabric_toy"];
  for (var i = 0; i < methods.length; i++) {
    for (var j = 0; j < scenes.length; j++) {
      preloadVideo("static/videos/comparison/" + scenes[j] + "_4_" + methods[i] + ".mp4");
    }
  }
}
