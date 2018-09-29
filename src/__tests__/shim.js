global.requestAnimationFrame = callback => setTimeout(callback, 0);

HTMLCanvasElement.prototype.getContext = () => ({
    clearRect: () => {},
    fillRect: () => {}
});
