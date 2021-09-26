import { JSDOM } from 'jsdom';

global.Image = new JSDOM('').window.Image;
global.requestAnimationFrame = (callback) => setTimeout(callback, 0);
