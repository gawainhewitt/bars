const Tone = require("./node_modules/tone");

const EventBinders = require("./eventBinders");
const EventHandlers = require("./eventHandlers");
const BarsSoundControl = require("./barsSoundControl");
const DomManager = require("./domManager");

const eventBinders = new EventBinders();
const barsSoundControl = new BarsSoundControl(Tone);
const domManager = new DomManager();
const eventHandlers = new EventHandlers(
  eventBinders,
  barsSoundControl,
  domManager
);
