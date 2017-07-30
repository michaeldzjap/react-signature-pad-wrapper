import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SigPad from 'signature_pad';
import { debounce } from 'throttle-debounce';

class SignaturePad extends Component {

    static displayName = 'react-signature-pad-wrapper';

    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        options: PropTypes.object,
        redrawOnResize: PropTypes.bool.isRequired
    }

    static defaultProps = {
        redrawOnResize: false
    }

    constructor(props) {
        super(props);

        this._callScrollHandler = debounce(150, this.handleScroll.bind(this));
    }

    componentDidMount() {
        if (!this.props.width) {
            this._canvas.style.width = '100%';
        }
        if (!this.props.height) {
            this._canvas.style.height = '100%';
        }
        this.scaleCanvas();

        if (!this.props.width || !this.props.height) {
            window.addEventListener('resize', this._callScrollHandler);
        }

        this._signaturePad = new SigPad(this._canvas, this.props.options);
    }

    componentWillUnmount() {
        if (!this.props.width || !this.props.height) {
            window.removeEventListener('resize', this._callScrollHandler);
        }

        this._signaturePad.off();
    }

    /**
     * Get the original signature_pad instance.
     */
    get instance() {
        return this._signaturePad;
    }

    set dotSize(dotSize) {
        this._signaturePad.dotSize = dotSize;
    }

    get dotSize() {
        return this._signaturePad.dotSize;
    }

    set minWidth(minWidth) {
        this._signaturePad.minWidth = minWidth;
    }

    get minWidth() {
        return this._signaturePad.minWidth;
    }

    set maxWidth(maxWidth) {
        this._signaturePad.maxWidth = maxWidth;
    }

    get maxWidth() {
        return this._signaturePad.maxWidth;
    }

    set throttle(throttle) {
        this._signaturePad.throttle = throttle;
    }

    get throttle() {
        return this._signaturePad.throttle;
    }

    set backgroundColor(color) {
        this._signaturePad.backgroundColor = color;
    }

    get backgroundColor() {
        return this._signaturePad.backgroundColor;
    }

    set penColor(color) {
        this._signaturePad.penColor = color;
    }

    get penColor() {
        return this._signaturePad.penColor;
    }

    set velocityFilterWeight(weight) {
        this._signaturePad.velocityFilterWeight = weight;
    }

    get velocityFilterWeight() {
        return this._signaturePad.velocityFilterWeight;
    }

    set onBegin(fn) {
        if (!(fn && typeof fn === 'function')) {
            throw new Error('Invalid argument passed to onBegin()');
        }

        this._signaturePad.onBegin = fn;
    }

    set onEnd(fn) {
        if (!(fn && typeof fn === 'function')) {
            throw new Error('Invalid argument passed to onEnd()');
        }

        this._signaturePad.onEnd = fn;
    }

    isEmpty() {
        return this._signaturePad.isEmpty();
    }

    clear() {
        this._signaturePad.clear();
    }

    fromDataURL(base64String) {
        this._signaturePad.fromDataURL(base64String);
    }

    toDataURL(mime) {
        return this._signaturePad.toDataURL(mime);
    }

    fromData(data) {
        this._signaturePad.fromData(data);
    }

    toData() {
        return this._signaturePad.toData();
    }

    off() {
        this._signaturePad.off();
    }

    on() {
        this._signaturePad.on();
    }

    handleScroll() {
        this.scaleCanvas();
    }

    scaleCanvas() {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        const width = (this.props.width || this._canvas.offsetWidth) * ratio;
        const height = (this.props.height || this._canvas.offsetHeight) * ratio;

        let data;
        if (this.props.redrawOnResize && this._signaturePad) {
            data = this._signaturePad.toDataURL();
        }

        this._canvas.width = width;
        this._canvas.height = height;

        const ctx = this._canvas.getContext('2d');
        ctx.scale(ratio, ratio);

        if (this.props.redrawOnResize && this._signaturePad) {
            this._signaturePad.fromDataURL(data);
        } else {
            this._signaturePad.clear();
        }
    }

    render() {
        return <canvas ref={ref => this._canvas = ref} />;
    }
}

export default SignaturePad;
