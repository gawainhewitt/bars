# bars
A playable bowing instrument for orchlab

### Testing

To run tests `npm test`

At the moment there are no tests for touch functionality as they end up calling `document.elementFromPoint()` and this doesn't exist in JSDOM. Consequently percentage is low.

### Accessibility

This instrument is made using vanilla html and javascript and so should be accessible to screen readers.

You can play this instrument using a swiped mouse (with button depressed), the qwerty keyboard or touch.

Colours used have been chosen to be unambiguous both to colourblinds and non-colourblinds using the recommendations in this [paper](https://jfly.uni-koeln.de/color/).

###
