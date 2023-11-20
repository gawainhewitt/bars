class DomManager {
  setInitialClass() {
    const elementNames = [
      "startscreen",
      "topbox",
      "zero",
      "one",
      "two",
      "bottombox",
      "optionstop",
      "optionsmiddle",
      "optionsbottom",
      "backbutton"
    ];
    const chordNames = ["chord0name", "chord1name", "chord2name"];
    const stringContainers = [
      "stringscontainer0",
      "stringscontainer1",
      "stringscontainer2"
    ];
    const rightspaces = [
      "chordzerorightspace",
      "chordonerightspace",
      "chordtworightspace"
    ];
    this.stringElementVisibility = [
      ["#zero", "#one", "#two"],
      ["#stringscontainer0", "#stringscontainer1", "#stringscontainer2"],
      ["#chordzerorightspace", "#chordonerightspace", "#chordtworightspace"]
    ];
    const chordBackgroundColours = [
      "chord0colour",
      "chord1colour",
      "chord2colour"
    ];
    const optionsChordBlocks = [
      [
        "optionstopchordname",
        "optionstopchordkey",
        "optionstopchordchordtype",
        "optionstopchordstate"
      ],
      [
        "optionsmiddlechordname",
        "optionsmiddlechordkey",
        "optionsmiddlechordchordtype",
        "optionsmiddlechordstate"
      ],
      [
        "optionsbottomchordname",
        "optionsbottomchordkey",
        "optionsbottomchordchordtype",
        "optionsbottomchordstate"
      ]
    ];

    const chordType = ["chord0type", "chord1type", "chord2type"];

    for (const name of elementNames) {
      const element = document.querySelector(`#${name}`);
      element.className = name;
    }
    for (const name of chordNames) {
      const element = document.querySelector(`#${name}`);
      element.className = "chordname";
    }
    for (let i = 0; i < stringContainers.length; i++) {
      const element = document.querySelector(`#${stringContainers[i]}`);
      element.className = "stringscontainer";
      element.classList.add(chordBackgroundColours[i]);
    }
    for (let chord = 0; chord < 3; chord++) {
      for (let string = 0; string < 10; string++) {
        const element = document.querySelector(`#c${chord}s${string}`);
        element.className = "string";
      }
    }
    for (let i = 0; i < rightspaces.length; i++) {
      const element = document.querySelector(`#${rightspaces[i]}`);
      element.className = "rightspace";
      element.classList.add(chordBackgroundColours[i]);
    }
    // this.optionsInvisible();

    for (let i = 0; i < this.stringElementVisibility.length; i++) {
      for (let j = 0; j < this.stringElementVisibility[i].length; j++) {
        const element = document.querySelector(
          this.stringElementVisibility[i][j]
        );
        element.classList.add("flex");
      }
    }
    for (let i = 0; i < optionsChordBlocks.length; i++) {
      for (let j = 0; j < optionsChordBlocks[i].length; j++) {
        const element = document.querySelector(`#${optionsChordBlocks[i][j]}`);
        element.className = chordBackgroundColours[i];
        element.classList.add("chordname");
        element.classList.add("flexcolumn");
      }
    }
    for (const name of chordType) {
      const element = document.querySelector(`#${name}`);
      element.className = "chordtype";
    }
  }

  setViewHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  switchChords(chord, visible) {
    // const chordBlockClasses = ["zero", "one", "two"];
    if (!visible) {
      for (let i = 0; i < this.stringElementVisibility.length; i++) {
        const element = document.querySelector(
          this.stringElementVisibility[i][chord]
        );
        element.classList.remove("flex");
        element.classList.add("invisible");
      }
    } else {
      for (let i = 0; i < this.stringElementVisibility.length; i++) {
        const element = document.querySelector(
          this.stringElementVisibility[i][chord]
        );
        element.classList.remove("invisible");
        element.classList.add("flex");
      }
    }
  }

  optionsVisible() {
    document.querySelector("#optionscreen").className = "optionscreen";
  }

  optionsInvisible() {
    const optionscreen = document.querySelector("#optionscreen");
    optionscreen.className = "invisible";
  }

  showStart() {
    document.querySelector("#infotext").innerHTML = `<h1>Lines</h1> <br>
    <p>To play:  <br>
    touch or click screen, <br>
    or use QWERTY keys<br>
    on a keyboard<br><br>
    On Apple devices,<br>
    turn off silent mode</p><br><br>`;
  }

  showOptions() {
    document.querySelector("#startscreen").className = "startscreen";
  }

  hideStart() {
    document.querySelector("#startscreen").className = "invisible";
    this.optionsInvisible();
  }

  changeChordName(whichChord, name) {
    document.querySelector(`#chord${whichChord}name`).innerHTML = name;
  }

  changeChordType(whichChord, name) {
    document.querySelector(`#chord${whichChord}type`).innerHTML = name;
  }
}

module.exports = DomManager;
