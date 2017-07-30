# react-signature-pad-wrapper
A React wrapper for [signature pad](https://github.com/szimek/signature_pad). 

There are some other React packages that are based off the original *signature_pad* plugin (e.g. [react-signature-pad](https://github.com/blackjk3/react-signature-pad), [react-signature-canvas](https://github.com/agilgur5/react-signature-canvas)). This package is different in the sense that it relies on *signature_pad* as a dependency rather than an implementation that is based off of it (like the aforementioned packages).

## Installation
This package is available through npm:
```
npm install --save react-signature-pad-wrapper
```

## Usage
This package implements exactly the same interface as the original *signature_pad* and adds a couple of extra features that make responsive behaviour a little easier to deal with. For a complete overview of the available options and callables see the documentation for [signature pad](https://github.com/szimek/signature_pad).

Import the component like (ES6):
```
import SignaturePad from 'react-signature-pad-wrapper'
```

Options may be passed as a component property during initialization:
```
...
render() {
  return <SignaturePad options={{minWidth: 5, maxWidth: 10, penColor: 'rgb(66, 133, 244)'}} />;
}
...
```

or they can be set during runtime:
```
...
render() {
  return <SignaturePad ref={ref => this.signaturePad = ref} />;
}
...
```
then from somewhere else in the code (assuming the ref is defined):
```
// Call an instance method
this.signaturePad.clear();
this.signaturePad.isEmpty();

// Get/set an object property
this.signaturePad.minWidth = 5;
this.signaturePad.maxWidth = 10;
this.signaturePad.penColor = 'rgb(66, 133, 244)';
```

## Responsiveness
The HTML canvas object sucks when it comes to responsiveness. The approach taken with this plugin is to use a fixed size canvas when a height and width (in pixels) is explicitly passed in as a component property:
```
...
render() {
  return <SignaturePad width={500} height={500} />;
}
...
```

If you want the component to be responsive, simply ommit the width and height property:
```
...
render() {
  return <SignaturePad />;
}
...
```
The canvas width and height will now be updated whenever the window is resized (using a debounced handler). Changing the width and height properties of a HTML canvas object will erase its current content. 

If you'd like to keep what is currently drawn on the canvas you can pass a `redrawOnResize` property to the component and set it to `true` (`redrawOnResize` is `false` by default):
```
...
render() {
  return <SignaturePad redrawOnResize={true} />;
}
...
```
This will save the current canvas content to a base64 data string before performing the resize operation and load it in the canvas right after the resize operation finishes. **Note**: the repeated saving and loading of image data when resizing often will degrade the quality rapidly. There is no easy solution around this unfortunately. Resampling the image data is imagined to help significantly, but this is a rather costly operation in general and not something you would ideally do with JavaScript in the browser on every resize event (even if throttled/debounced).

## Example
This project includes a simple example that demonstrates a responsive sketch pad. To build the example:
```
npm run build:example
```
Then open `example/index.html` in a browser of yout choice.
