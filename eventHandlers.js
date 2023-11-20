class EventHandlers {
  constructor(eventBinders, harpSoundControl, domManager) {
    this.eventBinders = eventBinders;
    this.harpSoundControl = harpSoundControl;
    this.domManager = domManager;

    this.ongoingTouches = [];
    this.touchesOnElements = [];
    this.mouseEnterCount = 0;
    this.buttonCount = 0;
    this.mouseDown = false;
    this.keyIsDown = {};
    this.chordState = [false, false, true];

    this.eventBinders.bindMouseEnter(this.stringIsPlucked);
    this.eventBinders.bindStringClick(this.stringIsPlucked);
    this.eventBinders.bindSelectStart(this.disableSelect);
    this.eventBinders.bindMouseDown(this.registerMouseDown);
    this.eventBinders.bindMouseUp(this.registerMouseUp);
    this.eventBinders.bindKeyDown(this.handleKeyDown);
    this.eventBinders.bindKeyUp(this.handleKeyUp);
    this.eventBinders.bindTouchStart(this.handleTouchStart);
    this.eventBinders.bindTouchEnd(this.handleTouchEnd);
    this.eventBinders.bindTouchMove(this.handleTouchMove);
    this.eventBinders.bindTouchCancel(this.handleCancel);
    this.eventBinders.bindChordButtons(this.switchChords);
    this.eventBinders.bindOptionsButton(this.enterOptionScreen);
    this.eventBinders.bindAboutButton(this.aboutScreen);
    this.eventBinders.bindBackButton(this.leaveOptionScreen);
    this.eventBinders.bindKeyDropDown(this.keyMenu);
    this.eventBinders.bindChordDropDown(this.chordMenu);
    this.eventBinders.bindResizeWindow(this.setViewHeight);
    this.eventBinders.bindDetectPortrait(this.setViewHeight);

    this.harpSoundControl.setUpSampler(this.displayStartButton);

    this.domManager.setInitialClass();
    this.setViewHeight();

    this.initialiseChordButtons();
  }

  initialiseChordButtons() {
    let zerochordbutton = document.querySelector("#zerochordbutton");
    let onechordbutton = document.querySelector("#onechordbutton");

    zerochordbutton.click();
    onechordbutton.click();
  }

  switchChords = (button, element) => {
    const state = element.checked;
    console.log(button);
    console.log(state);
    this.domManager.switchChords(button, state);
    this.chordState[button] = state;
    console.log(this.chordState);
  };

  enterOptionScreen = () => {
    this.domManager.optionsVisible();
  };

  leaveOptionScreen = () => {
    this.domManager.optionsInvisible();
  };

  aboutScreen = () => {
    this.domManager.showOptions();
  };

  displayStartButton = () => {
    this.eventBinders.bindStartScreen(this.start);
    this.domManager.showStart();
  };

  start = () => {
    this.harpSoundControl.startAudio();
    this.domManager.hideStart();
  };

  stringIsPlucked = (type, whichString) => {
    if (type === "mouse") {
      if (this.mouseDown) {
        this.harpSoundControl.playNote(whichString);
      }
    } else {
      this.harpSoundControl.playNote(whichString);
    }
  };

  disableSelect = (e) => {
    e.preventDefault();
  };

  registerMouseDown = (e) => {
    const optionscreen = document.querySelector("#optionscreen");
    if (optionscreen.className === "invisible") {
      this.disableSelect(e);
      this.mouseDown = true;
    }
  };

  registerMouseUp = () => {
    this.mouseDown = false;
  };

  handleKeyDown = (e) => {
    let key = e.code;
    if (key in this.keyIsDown === false) {
      this.keyIsDown[key] = true;
      this.#whichKey(key);
    }
  };

  handleKeyUp = (e) => {
    let key = e.code;
    delete this.keyIsDown[key];
  };

  #whichKey = (key) => {
    // prettier-ignore
    const chords = [['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP'],
                    ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon'],
                    ['KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash']];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 10; j++) {
        if (key === chords[i][j] && this.chordState[i]) {
          this.stringIsPlucked("key", { chord: i, string: j });
        }
      }
    }
  };

  keyMenu = (e) => {
    this.domManager.changeChordName(e.srcElement.id[6], e.srcElement.value);
    this.harpSoundControl.chooseRoot(e.srcElement.id[6], e.srcElement.value);
  };

  chordMenu = (e) => {
    // console.log(e);
    // console.log(e.srcElement.id[6]);
    // console.log(e.srcElement.value);
    this.domManager.changeChordType(e.srcElement.id[6], e.srcElement.value);
    this.harpSoundControl.chooseChord(e.srcElement.id[6], e.srcElement.value);
  };

  setViewHeight = () => {
    console.log("set view height");
    this.domManager.setViewHeight();
  };

  handleTouchStart = (e) => {
    e.preventDefault();
    console.log("touch start");
    let touches = e.changedTouches;
    // console.log(touches);
    this.ongoingTouches.push(this.#copyTouch(touches[0]));
    // console.log(this.ongoingTouches);
    this.#showElement(this.ongoingTouches);
  };

  handleTouchEnd = (e) => {
    e.preventDefault();
    let touches = e.changedTouches;
    // console.log("touch end");

    for (let i = 0; i < touches.length; i++) {
      let idx = this.#ongoingTouchIndexById(touches[i].identifier);
      if (idx >= 0) {
        // did we get a match?
        console.log("touchend " + idx);
        this.ongoingTouches.splice(idx, 1); // remove it; we're done
      } else {
        // no match
        console.log("can't figure out which touch to end");
      }
      for (let j = 0; j < this.touchesOnElements.length; j++) {
        if (this.touchesOnElements[j].touch_id === touches[i].identifier) {
          this.touchesOnElements.splice(j, 1);
        }
      }
    }
  };

  handleTouchMove = (e) => {
    e.preventDefault();
    console.log("touch move");
    let touches = e.changedTouches;
    for (let i = 0; i < touches.length; i++) {
      let idx = this.#ongoingTouchIndexById(touches[i].identifier);
      if (idx >= 0) {
        // did we get a match?
        this.ongoingTouches.splice(idx, 1, this.#copyTouch(touches[i]));
        // console.log(this.#copyTouch(touches[i]));
      } else {
        // no match
        console.log("can't figure out which touch to continue");
      }
    }
    this.#showElement(this.ongoingTouches);
  };

  handleCancel = (e) => {
    e.preventDefault();
    console.log("touchcancel.");
    let touches = e.changedTouches;

    for (let i = 0; i < touches.length; i++) {
      let idx = this.ongoingTouchIndexById(touches[i].identifier);
      this.ongoingTouches.splice(idx, 1); // remove it; we're done
    }
  };

  #copyTouch = ({ identifier, clientX, clientY }) => {
    return { identifier, clientX, clientY };
  };

  #ongoingTouchIndexById = (idToFind) => {
    for (let i = 0; i < this.ongoingTouches.length; i++) {
      let id = this.ongoingTouches[i].identifier;
      if (id == idToFind) {
        return i;
      }
    }
    return -1; // not found
  };

  #showElement = () => {
    for (let i = 0; i < this.ongoingTouches.length; i++) {
      let el = document.elementFromPoint(
        this.ongoingTouches[i].clientX,
        this.ongoingTouches[i].clientY
      );
      // console.log(`element = ${el.id}`);

      if (this.#isNewTouchOnElement(i, el.id)) {
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 10; j++) {
            if (el.id === `c${i}s${j}`) {
              this.stringIsPlucked("touch", { chord: i, string: j });
            }
          }
        }
      }
    }
  };

  #isNewTouchOnElement = (idx, el_id) => {
    // console.log(`length of this touches on elements = ${this.touchesOnElements.length}`)
    for (let i = 0; i < this.touchesOnElements.length; i++) {
      // console.log(`touches on elements ${i} ${this.touchesOnElements[i]}`);
      if (
        this.touchesOnElements[i].touch_id ===
        this.ongoingTouches[idx].identifier
      ) {
        if (this.touchesOnElements[i].element_id === el_id) {
          // console.log("already on element");
          return false;
        } else {
          // console.log("same touch new element");
          this.touchesOnElements.splice(i, 1, {
            touch_id: this.ongoingTouches[idx].identifier,
            element_id: el_id
          });
          return true;
        }
      }
    }
    this.touchesOnElements.push({
      touch_id: this.ongoingTouches[idx].identifier,
      element_id: el_id
    });
    return true;
  };
}

module.exports = EventHandlers;
