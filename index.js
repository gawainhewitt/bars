const Tone = require("./node_modules/tone");

const EventBinders = require("./eventBinders");
const EventHandlers = require("./eventHandlers");
const HarpSoundControl = require("./harpSoundControl");
const DomManager = require("./domManager");

const eventBinders = new EventBinders();
const harpSoundControl = new HarpSoundControl(Tone);
const domManager = new DomManager();
const eventHandlers = new EventHandlers(
  eventBinders,
  harpSoundControl,
  domManager
);
