const fs = require("fs");
const html = fs.readFileSync("./index.html");
document.documentElement.innerHTML = html;

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

const EventBinders = require("../../eventBinders");

describe("bindChordButtons", () => {
  test("chord buttons call handler function", () => {
    const eventBinders = new EventBinders();

    let zerochordbutton = document.querySelector("#zerochordbutton");
    let onechordbutton = document.querySelector("#onechordbutton");
    const chordMock = jest.fn();

    eventBinders.bindChordButtons(chordMock);

    zerochordbutton.click();

    expect(chordMock).toHaveBeenCalledWith(0, zerochordbutton);

    onechordbutton.click();

    expect(chordMock).toHaveBeenCalledWith(1, onechordbutton);
  });
});

describe("bindStartScreen", () => {
  test("calls handler function", () => {
    const eventBinders = new EventBinders();

    let startscreen = document.querySelector("#startscreen");
    const startScreenMock = jest.fn();

    eventBinders.bindStartScreen(startScreenMock);
    startscreen.click();

    expect(startScreenMock).toHaveBeenCalled();
  });
});

describe("bindBackButton", () => {
  test("calls handler function", () => {
    const eventBinders = new EventBinders();

    let backButton = document.querySelector("#backbutton");
    const backButtonMock = jest.fn();

    eventBinders.bindBackButton(backButtonMock);
    backButton.click();

    expect(backButtonMock).toHaveBeenCalled();
  });
});

describe("bindMouseEnter", () => {
  test("strings call handler function when mouse enters", () => {
    const eventBinders = new EventBinders();

    let stringsArray = [];
    for (let i = 0; i < 3; i++) {
      stringsArray[i] = [];
      for (let j = 0; j < 10; j++) {
        stringsArray[i][j] = document.querySelector(`#c${i}s${j}`);
      }
    }
    const mouseEnterMock = jest.fn();

    eventBinders.bindMouseEnter(mouseEnterMock);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 10; j++) {
        stringsArray[i][j].dispatchEvent(new MouseEvent("mouseenter"));
        expect(mouseEnterMock).toHaveBeenCalledWith("mouse", {
          chord: i,
          string: j
        });
      }
    }
  });
});

describe("bindSelectStart", () => {
  test("calls handler function", () => {
    const eventBinders = new EventBinders();

    const selectstartMock = jest.fn();
    eventBinders.bindSelectStart(selectstartMock);

    document.dispatchEvent(new Event("selectstart"));

    expect(selectstartMock).toHaveBeenCalled();
  });
});

describe("bindMouseDown", () => {
  test("calls handler function", () => {
    const eventBinders = new EventBinders();

    const mousedownMock = jest.fn();
    eventBinders.bindMouseDown(mousedownMock);

    document.dispatchEvent(new MouseEvent("mousedown"));

    expect(mousedownMock).toHaveBeenCalled();
  });
});

describe("bindMouseUp", () => {
  test("calls handler function", () => {
    const eventBinders = new EventBinders();

    const mouseupMock = jest.fn();
    eventBinders.bindMouseUp(mouseupMock);

    document.dispatchEvent(new MouseEvent("mouseup"));

    expect(mouseupMock).toHaveBeenCalled();
  });
});

describe("bindStringClick", () => {
  test("calls handler function", () => {
    const eventBinders = new EventBinders();

    let stringsArray = [];
    for (let i = 0; i < 3; i++) {
      stringsArray[i] = [];
      for (let j = 0; j < 10; j++) {
        stringsArray[i][j] = document.querySelector(`#c${i}s${j}`);
      }
    }

    const mouseClickMock = jest.fn();
    eventBinders.bindStringClick(mouseClickMock);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 10; j++) {
        stringsArray[i][j].dispatchEvent(new MouseEvent("mousedown"));
        expect(mouseClickMock).toHaveBeenCalledWith("mouseClick", {
          chord: i,
          string: j
        });
      }
    }
  });
});

describe("bindTouchStart", () => {
  test("calls handler function", () => {
    const eventBinders = new EventBinders();

    const touchstartMock = jest.fn();
    eventBinders.bindTouchStart(touchstartMock);

    document
      .querySelector("#chord-container")
      .dispatchEvent(new TouchEvent("touchstart"));

    expect(touchstartMock).toHaveBeenCalled();
  });
});

describe("bindTouchEnd", () => {
  test("calls handler function", () => {
    const eventBinders = new EventBinders();

    const touchendMock = jest.fn();
    eventBinders.bindTouchEnd(touchendMock);

    document
      .querySelector("#chord-container")
      .dispatchEvent(new TouchEvent("touchend"));

    expect(touchendMock).toHaveBeenCalled();
  });
});

describe("bindTouchend", () => {
  test("calls handler function", () => {
    const eventBinders = new EventBinders();

    const touchendMock = jest.fn();
    eventBinders.bindTouchEnd(touchendMock);

    document
      .querySelector("#chord-container")
      .dispatchEvent(new TouchEvent("touchend"));

    expect(touchendMock).toHaveBeenCalled();
  });
});

describe("bindTouchMove", () => {
  test("calls handler function", () => {
    const eventBinders = new EventBinders();

    const touchmoveMock = jest.fn();
    eventBinders.bindTouchMove(touchmoveMock);

    document
      .querySelector("#chord-container")
      .dispatchEvent(new TouchEvent("touchmove"));

    expect(touchmoveMock).toHaveBeenCalled();
  });
});

describe("bindTouchCancel", () => {
  test("calls handler function", () => {
    const eventBinders = new EventBinders();

    const touchcancelMock = jest.fn();
    eventBinders.bindTouchCancel(touchcancelMock);

    document
      .querySelector("#chord-container")
      .dispatchEvent(new TouchEvent("touchcancel"));

    expect(touchcancelMock).toHaveBeenCalled();
  });
});

describe("bindKeyDown", () => {
  test("calls handler function", () => {
    const eventBinders = new EventBinders();

    const keydownMock = jest.fn();
    eventBinders.bindKeyDown(keydownMock);

    document.dispatchEvent(new Event("keydown"));

    expect(keydownMock).toHaveBeenCalled();
  });
});

describe("bindKeyUp", () => {
  const eventBinders = new EventBinders();

  test("calls handler function", () => {
    const keyupMock = jest.fn();
    eventBinders.bindKeyUp(keyupMock);

    document.dispatchEvent(new Event("keyup"));

    expect(keyupMock).toHaveBeenCalled();
  });
});

describe("bindOptionsButton", () => {
  test("call handler function", () => {
    const eventBinders = new EventBinders();

    let optionsbutton = document.querySelector("#optionsbutton");

    const optionsMock = jest.fn();

    eventBinders.bindOptionsButton(optionsMock);
    optionsbutton.click();

    expect(optionsMock).toHaveBeenCalled();
  });
});

describe("bindAboutButton", () => {
  test("calls handler function", () => {
    const eventBinders = new EventBinders();

    let aboutbutton = document.querySelector("#aboutbutton");

    const aboutMock = jest.fn();

    eventBinders.bindAboutButton(aboutMock);
    aboutbutton.click();

    expect(aboutMock).toHaveBeenCalled();
  });
});

describe("bindKeyDropDown", () => {
  const eventBinders = new EventBinders();

  let dropDown = document.querySelector("#select0key");

  const keyMock = jest.fn();

  eventBinders.bindKeyDropDown(keyMock);
  dropDown.dispatchEvent(new Event("change"));

  expect(keyMock).toHaveBeenCalled();
});

describe("bindChordDropDown", () => {
  const eventBinders = new EventBinders();

  let dropDown = document.querySelector("#select0chordtype");

  const chordMock = jest.fn();

  eventBinders.bindChordDropDown(chordMock);
  dropDown.dispatchEvent(new Event("change"));

  expect(chordMock).toHaveBeenCalled();
});

describe("bindResizeWindow", () => {
  test("calls handler function", () => {
    const eventBinders = new EventBinders();

    const resizeMock = jest.fn();

    eventBinders.bindResizeWindow(resizeMock);

    window.dispatchEvent(new Event("resize"));

    expect(resizeMock).toHaveBeenCalled();
  });
});

// describe("bindDetectPortrait", () => {
//   test("calls handler function", () => {
//     const eventBinders = new EventBinders();

//     const portraitMock = jest.fn();

//     eventBinders.bindDetectPortrait(portraitMock);

//     window.innerWidth = 20;
//     window.innerHeight = 100;

//     window.dispatchEvent(new Event("resize"));

//     expect(portraitMock).toHaveBeenCalled();
//   });
// });
