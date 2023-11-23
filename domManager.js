class DomManager {
  setInitialClass() {
    const elementNames = [
      "startscreen",
      "topbox",
      "zero",
      "one",
      "two",
      "three",
      "bottombox",
      "optionszero",
      "optionsone",
      "optionstwo",
      "backbutton"
    ];
    const chordNames = ["chord0name", "chord1name", "chord2name", "chord3name"];
    this.stringContainers = [
      "stringscontainer0",
      "stringscontainer1",
      "stringscontainer2",
      "stringscontainer3"
    ];
    const rightspaces = [
      "chordzerorightspace",
      "chordonerightspace",
      "chordtworightspace",
      "chordthreerightspace"
    ];
    this.stringElementVisibility = [
      ["#zero", "#one", "#two", "#three"],
      ["#stringscontainer0", "#stringscontainer1", "#stringscontainer2", "#stringscontainer3"],
      ["#chordzerorightspace", "#chordonerightspace", "#chordtworightspace", "#chordthreerightspace"]
    ];
    this.chordBackgroundColours = [
      "chord0colour",
      "chord1colour",
      "chord2colour",
      "chord3colour"
    ];
    const optionsChordBlocks = [
      [
        "optionszerochordname",
        "optionszerochordkey",
        "optionszerochordblock3",
        "optionszerochordstate"
      ],
      [
        "optionsonechordname",
        "optionsonechordkey",
        "optionsonechordblock3",
        "optionsonechordstate"
      ],
      [
        "optionstwochordname",
        "optionstwochordkey",
        "optionstwochordblock3",
        "optionstwochordstate"
      ],
      [
        "optionsthreechordname",
        "optionsthreechordkey",
        "optionsthreechordblock4",
        "optionsthreechordstate"
      ]
    ];

    for (const name of elementNames) {
      const element = document.querySelector(`#${name}`);
      element.className = name;
    }
    for (const name of chordNames) {
      const element = document.querySelector(`#${name}`);
      element.className = "chordname";
    }
    for (let i = 0; i < this.stringContainers.length; i++) {
      const element = document.querySelector(`#${this.stringContainers[i]}`);
      element.className = "stringscontainer";
      element.classList.add(this.chordBackgroundColours[i]);
    }
    for (let chord = 0; chord < this.stringContainers.length; chord++) {
      for (let string = 0; string < 10; string++) {
        const element = document.querySelector(`#c${chord}s${string}`);
        element.className = "string";
      }
    }
    for (let i = 0; i < rightspaces.length; i++) {
      const element = document.querySelector(`#${rightspaces[i]}`);
      element.className = "rightspace";
      element.classList.add(this.chordBackgroundColours[i]);
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
        element.className = this.chordBackgroundColours[i];
        element.classList.add("chordname");
        element.classList.add("flexcolumn");
      }
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
    document.querySelector("#infotext").innerHTML = `<h1>Bars</h1> <br>
    <p>To play:  <br>
    touch or click screen, <br>
    or use ZXCV keys<br>
    on a keyboard<br><br>
    On Apple devices,<br>
    turn off silent mode</p><br><br>`;
  }

  showOptions() {
    document.querySelector("#startscreen").className = "startscreen";
  }

  changeBowingButtonStyle(name) {
    const blue = "rgb(0, 114, 178)";
    const reddishpurple = "rgb(204, 121, 167)";
    const styles = {
      bowing: {
        backgroundColor: blue,
        boxShadow: `6px 0px 0px ${reddishpurple}`
      },
      plucking: {
        backgroundColor: reddishpurple,
        boxShadow: `6px 0px 0px ${blue}`
      }
    }
    const button = document.querySelector("#bowingbuttontext")
    button.innerHTML = name.toUpperCase();
    button.style.backgroundColor = styles[name].backgroundColor;
    button.style.boxShadow = styles[name].boxShadow;
  }

  showStrings(numberOfStrings, stringsArray) {
    for (let i = 0; i < numberOfStrings; i++) {
      for (let j = 0; j < stringsArray[i].length; j++) {
        stringsArray[i][j].className = "string";
      };
    }
  }

  hideStrings(numberOfStrings, stringsArray) {
    for (let i = 0; i < numberOfStrings; i++) {
      for (let j = 0; j < stringsArray[i].length; j++) {
        stringsArray[i][j].className = "invisible";
      };
    }
  }

  stringPlayColour(string) {
    const element = document.querySelector(`#${this.stringContainers[string]}`);
    console.log(`stringplaycolour element is ${string}`)
    element.classList.remove(this.chordBackgroundColours[string]);
    element.classList.add("playcolour");
  }

  stringStopColour(string) {
    const element = document.querySelector(`#${this.stringContainers[string]}`);
    element.classList.remove("playcolour");
    element.classList.add(this.chordBackgroundColours[string]);
  }

  showPluck(numberOfStrings, pluckArray) {
    console.log("show pluck");
    for (let i = 0; i < numberOfStrings; i++) {
      pluckArray[i].className = "pluck-container";
    }
  }

  hidePluck(numberOfStrings, pluckArray) {
    console.log("hide pluck");
    for (let i = 0; i < numberOfStrings; i++) {
      pluckArray[i].className = "invisible";
    }
  }

  hideStart() {
    document.querySelector("#startscreen").className = "invisible";
    this.optionsInvisible();
  }

  changeChordName(whichChord, name) {
    document.querySelector(`#chord${whichChord}name`).innerHTML = name;
  }
}

module.exports = DomManager;
