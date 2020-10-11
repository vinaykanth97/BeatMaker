function Beatmaker() {
  this.pads = document.querySelectorAll(".pad");
  this.snareAudio = document.querySelector(".snare-audio");
  this.hithatAudio = document.querySelector(".hihat-audio");
  this.kickAudio = document.querySelector(".kick-audio");
  this.index = 0;
  this.bpm = 150;
  this.playBtn = document.querySelector(".play");
  this.isPlaying = null;
  this.muteBtn = document.querySelectorAll(".mute-btn");
  this.musicOptions = document.querySelectorAll(".music-options");
  this.tempoSlider = document.querySelector(".tempo-slider");
}
Beatmaker.prototype.repeater = function () {
  let steps = this.index % 8;
  this.index++;
  let animatePads = document.querySelectorAll(`.b${steps}`);
  animatePads.forEach((pads) => {
    pads.style.animation = "Playtime 0.2s alternate ease 2";
    if (pads.classList.contains("active")) {
      if (pads.classList.contains("snare-pad")) {
        this.snareAudio.play();
        this.snareAudio.currentTime = 0;
      }
      if (pads.classList.contains("kick-pad")) {
        this.kickAudio.play();
        this.kickAudio.currentTime = 0;
      }
      if (pads.classList.contains("hihat-pad")) {
        this.hithatAudio.play();
        this.hithatAudio.currentTime = 0;
      }
    }
  });
};
Beatmaker.prototype.play = function () {
  let interval = (60 / this.bpm) * 1000;
  if (!this.isPlaying) {
    let intervalLooper = setInterval(() => {
      this.repeater();
      this.isPlaying = intervalLooper;
    }, interval);
  } else {
    clearInterval(this.isPlaying);
    this.isPlaying = null;
  }
};
Beatmaker.prototype.ActivePad = function (e) {
  e.target.classList.toggle("active");
};

Beatmaker.prototype.updateBtn = function (e) {
  this.play();
  e.target.classList.toggle("active");
  if (!e.target.classList.contains("active")) {
    e.target.innerText = "Play";
  } else {
    e.target.innerText = "Stop";
  }
};
Beatmaker.prototype.mute = function (e) {
  e.target.classList.toggle("active");
  let mutedIndex = e.target.getAttribute("data-track");
  switch (mutedIndex) {
    case "1":
      this.snareAudio.volume = 0;
      break;
    case "2":
      this.hithatAudio.volume = 0;
      break;
    case "3":
      this.kickAudio.volume = 0;
      break;
  }
};
Beatmaker.prototype.changeMusic = function (e) {
  let selectedId = e.target.id;
  switch (selectedId) {
    case "snare-options":
      this.snareAudio.src = e.target.value;
      break;
    case "hihat-options":
      this.hithatAudio.src = e.target.value;
      break;
    case "kick-options":
      this.kickAudio.src = e.target.value;
      break;
  }
};
Beatmaker.prototype.tempoText = function (e) {
  document.querySelector(".tempo-value").innerText = e.target.value;
};
Beatmaker.prototype.updateTempo = function (e) {
  this.bpm = e.target.value;
  clearInterval(this.isPlaying);
  this.isPlaying = null;
  if (this.playBtn.classList.contains("active")) {
    this.play();
  }
};
const drumKit = new Beatmaker();

drumKit.pads.forEach((pad) => {
  pad.addEventListener("animationend", function () {
    pad.style.animation = "";
  });
  pad.addEventListener("click", function (e) {
    drumKit.ActivePad(e);
  });
});
drumKit.playBtn.addEventListener("click", function (e) {
  drumKit.updateBtn(e);
});
drumKit.muteBtn.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    drumKit.mute(e);
  });
});
drumKit.musicOptions.forEach(function (option) {
  option.addEventListener("change", function (e) {
    drumKit.changeMusic(e);
  });
});
drumKit.tempoSlider.addEventListener("input", function (e) {
  drumKit.tempoText(e);
});
drumKit.tempoSlider.addEventListener("change", function (e) {
  drumKit.updateTempo(e);
});
