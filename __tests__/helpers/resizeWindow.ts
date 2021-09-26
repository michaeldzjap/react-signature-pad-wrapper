import { JSDOM } from 'jsdom';

export interface Global {
    document: Document;
    window: Window;
}

declare const global: Global;

const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');

global.document = dom.window.document;
if (global.document.defaultView) {
    global.window = global.document.defaultView;
}

global.window.resizeTo = (width, height) => {
    global.window = Object.assign(window, { innerWidth: width || global.window.innerWidth });
    global.window = Object.assign({ innerHeight: height || global.window.innerHeight });
    global.window.dispatchEvent(new Event('resize'));
};
