class EventBinders {
  constructor() {
    this.numberOfStrings = 4;
    this.stringsArray = [];
    for (let i = 0; i < this.numberOfStrings; i++) {
      this.stringsArray[i] = [];
      for (let j = 0; j < 10; j++) {
        this.stringsArray[i][j] = document.querySelector(`#c${i}s${j}`);
      }
    }
    this.chordContainer = document.querySelector("#chord-container");
    this.startscreen = document.querySelector("#startscreen");
    this.backbutton = document.querySelector("#backbutton");
    this.optionsButton = document.querySelector("#optionsbutton");
    this.aboutButton = document.querySelector("#aboutbutton");
    this.zerochordbutton = document.querySelector("#zerochordbutton");
    this.onechordbutton = document.querySelector("#onechordbutton");
    this.twochordbutton = document.querySelector("#twochordbutton");
    this.zeroKeyDropdown = document.querySelector("#select0key");
    this.oneKeyDropdown = document.querySelector("#select1key");
    this.twoKeyDropdown = document.querySelector("#select2key");
    this.threeKeyDropdown = document.querySelector("#select3key");
    this.zeroChordDropdown = document.querySelector("#select0chordtype");
    this.oneChordDropdown = document.querySelector("#select1chordtype");
    this.twoChordDropdown = document.querySelector("#select2chordtype");
    this.threeChordDropdown = document.querySelector("#select3chordtype");


    this.portrait = window.matchMedia("(orientation: portrait)");
  }

  bindChordButtons(handler) {
    this.zerochordbutton.addEventListener("click", () => {
      handler(0, this.zerochordbutton);
    });
    this.onechordbutton.addEventListener("click", () => {
      handler(1, this.onechordbutton);
    });
    this.twochordbutton.addEventListener("click", () => {
      handler(2, this.twochordbutton);
    });
  }

  bindStartScreen(handler) {
    this.startscreen.addEventListener("click", () => {
      handler();
    });
  }

  bindBackButton(handler) {
    this.backbutton.addEventListener("click", handler);
  }

  bindMouseEnter(handler) {
    for (let i = 0; i < this.numberOfStrings; i++) {
      for (let j = 0; j < 10; j++) {
        this.stringsArray[i][j].addEventListener("mouseenter", () => {
          handler("mouse", { chord: i, string: j });
        });
      }
    }
  }

  bindSelectStart(handler) {
    document.addEventListener("selectstart", (e) => {
      handler(e);
    });
  }

  bindMouseDown(handler) {
    document.addEventListener("mousedown", (e) => {
      handler(e);
    });
  }

  bindMouseUp(handler) {
    document.addEventListener("mouseup", (e) => {
      handler(e);
    });
  }

  bindStringClick(handler) {
    for (let i = 0; i < this.numberOfStrings; i++) {
      for (let j = 0; j < 10; j++) {
        this.stringsArray[i][j].addEventListener("mousedown", () => {
          handler("mouseClick", { chord: i, string: j });
        });
      }
    }
  }

  bindTouchStart(handler) {
    this.chordContainer.addEventListener("touchstart", handler);
  }

  bindTouchEnd(handler) {
    this.chordContainer.addEventListener("touchend", handler);
  }

  bindTouchMove(handler) {
    this.chordContainer.addEventListener("touchmove", handler);
  }

  bindTouchCancel(handler) {
    this.chordContainer.addEventListener("touchcancel", handler);
  }

  bindKeyDown(handler) {
    document.addEventListener("keydown", handler);
  }

  bindKeyUp(handler) {
    document.addEventListener("keyup", handler);
  }

  bindOptionsButton(handler) {
    this.optionsButton.addEventListener("click", handler);
  }

  bindAboutButton(handler) {
    this.aboutButton.addEventListener("click", handler);
  }

  bindKeyDropDown(handler) {
    this.zeroKeyDropdown.addEventListener("change", handler);
    this.oneKeyDropdown.addEventListener("change", handler);
    this.twoKeyDropdown.addEventListener("change", handler);
    this.threeKeyDropdown.addEventListener("change", handler);
  }

  bindChordDropDown(handler) {
    this.zeroChordDropdown.addEventListener("change", handler);
    this.oneChordDropdown.addEventListener("change", handler);
    this.twoChordDropdown.addEventListener("change", handler);
    this.threeChordDropdown.addEventListener("change", handler);
  }

  bindResizeWindow(handler) {
    window.addEventListener("resize", handler);
  }

  bindDetectPortrait(handler) {
    this.portrait.addEventListener("change", handler);
  }
}

module.exports = EventBinders;
