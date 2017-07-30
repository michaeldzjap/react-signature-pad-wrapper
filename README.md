# react-signature-pad-wrapper
A React wrapper for [signature pad](https://github.com/szimek/signature_pad). 

There are some other React packages that are based off the original *signature_pad* plugin (e.g. [react-signature-pad](https://github.com/blackjk3/react-signature-pad), [react-signature-canvas](https://github.com/agilgur5/react-signature-canvas)). This package is different in the sense that it relies on *signature_pad* as a dependency rather than an implementation that is based off of it (like the aforementioned packages).

# Installation
This package is available through npm:
```
npm install --save react-signature-pad-wrapper
```

# Usage
This package implements exactly the same interface as the original *signature_pad* and adds a couple of extra features that make responsive behaviour a little easier to deal with. For a complete overview of the available options and callables see the documentation for [signature pad](https://github.com/szimek/signature_pad).

Importing the component like (ES6):
```
import SignaturePad from 'react-signature-pad-wrapper'
```

Options may be passed as a component property during initialization:
```
...
render() {
  return <SignaturePad options={{minWidth: 5, maxWidth: 10, penColor: "rgb(66, 133, 244)"}} />;
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
this.signaturePad.penColor = "rgb(66, 133, 244)";
```

# Responsiveness
