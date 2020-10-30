import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SigPad from 'signature_pad';
import { debounce } from 'throttle-debounce';

/**
 * @class
 * @classdesc Signature pad component.
 * @extends {PureComponent}
 */
class SignaturePad extends PureComponent {
    static displayName = 'react-signature-pad-wrapper';

    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        options: PropTypes.object,
        redrawOnResize: PropTypes.bool.isRequired,
        debounceInterval: PropTypes.number.isRequired,
        canvasProps: PropTypes.object,
    };

    static defaultProps = {
        redrawOnResize: false,
        debounceInterval: 150,
    };

    /**
     * Create a new signature pad.
     *
     * @param {Object} props
     */
    constructor(props) {
        super(props);

        this.state = { canvasWidth: 0, canvasHeight: 0 };

        this._callResizeHandler = debounce(this.props.debounceInterval, this.handleResize.bind(this));
    }

    /**
     * Initialise the signature pad once the canvas element is rendered.
     *
     * @return {void}
     */
    componentDidMount() {
        if (this._canvas) {
            if (!this.props.width || !this.props.height) {
                this._canvas.style.width = '100%';
            }
            this.scaleCanvas();

            if (!this.props.width || !this.props.height) {
                window.addEventListener('resize', this._callResizeHandler);
            }

            this._signaturePad = new SigPad(this._canvas, this.props.options);
        }
    }

    /**
     * Remove the resize event listener and switch the signature pad off on
     * unmount.
     *
     * @return {void}
     */
    componentWillUnmount() {
        if (!this.props.width || !this.props.height) {
            window.removeEventListener('resize', this._callResizeHandler);
        }

        this._signaturePad.off();
    }

    /**
     * Get the original signature_pad instance.
     *
     * @return {SignaturePad}
     */
    get instance() {
        return this._signaturePad;
    }

    /**
     * Get the canvas ref.
     *
     * @return {Object}
     */
    get canvas() {
        return this._canvas;
    }

    /**
     * Set the radius of a single dot.
     *
     * @param {(number|Function)} dotSize
     * @return {void}
     */
    set dotSize(dotSize) {
        this._signaturePad.dotSize = dotSize;
    }

    /**
     * Get the radius of a single dot.
     *
     * @return {number}
     */
    get dotSize() {
        return this._signaturePad.dotSize;
    }

    /**
     * Set the minimum width of a line.
     *
     * @param {number} minWidth
     * @return {void}
     */
    set minWidth(minWidth) {
        this._signaturePad.minWidth = minWidth;
    }

    /**
     * Get the minimum width of a line.
     *
     * @return {number}
     */
    get minWidth() {
        return this._signaturePad.minWidth;
    }

    /**
     * Get the maximum width of a line.
     *
     * @param {number} maxWidth
     * @return {void}
     */
    set maxWidth(maxWidth) {
        this._signaturePad.maxWidth = maxWidth;
    }

    /**
     * Get the maximum width of a line.
     *
     * @return {number}
     */
    get maxWidth() {
        return this._signaturePad.maxWidth;
    }

    /**
     * Set the throttle for drawing the next point at most once every x ms.
     *
     * @param {number} throttle
     * @return {void}
     */
    set throttle(throttle) {
        this._signaturePad.throttle = throttle;
    }

    /**
     * Get the throttle for drawing the next point at most once every x ms.
     *
     * @return {number}
     */
    get throttle() {
        return this._signaturePad.throttle;
    }

    /**
     * Set the color used to clear the background.
     *
     * @param {string} color
     * @return {void}
     */
    set backgroundColor(color) {
        this._signaturePad.backgroundColor = color;
    }

    /**
     * Get the color used to clear the background.
     *
     * @return {string}
     */
    get backgroundColor() {
        return this._signaturePad.backgroundColor;
    }

    /**
     * Set the color used to draw the lines.
     *
     * @param {string} color
     * @return {void}
     */
    set penColor(color) {
        this._signaturePad.penColor = color;
    }

    /**
     * Get the color used to draw the lines.
     *
     * @return {string}
     */
    get penColor() {
        return this._signaturePad.penColor;
    }

    /**
     * Set weight used to modify new velocity based on the previous velocity.
     *
     * @param {number} weight
     * @return {void}
     */
    set velocityFilterWeight(weight) {
        this._signaturePad.velocityFilterWeight = weight;
    }

    /**
     * Get weight used to modify new velocity based on the previous velocity.
     *
     * @return {number}
     */
    get velocityFilterWeight() {
        return this._signaturePad.velocityFilterWeight;
    }

    /**
     * Set callback that will be triggered on stroke begin.
     *
     * @param {Function} fn
     * @return {void}
     */
    set onBegin(fn) {
        if (!(fn && typeof fn === 'function')) {
            throw new Error('Invalid argument passed to onBegin()');
        }

        this._signaturePad.onBegin = fn;
    }

    /**
     * Set callback that will be triggered on stroke end.
     *
     * @param {Function} fn
     * @return {void}
     */
    set onEnd(fn) {
        if (!(fn && typeof fn === 'function')) {
            throw new Error('Invalid argument passed to onEnd()');
        }

        this._signaturePad.onEnd = fn;
    }

    /**
     * Determine if the canvas is empty.
     *
     * @return {Boolean}
     */
    isEmpty() {
        return this._signaturePad.isEmpty();
    }

    /**
     * Clear the canvas.
     *
     * @return {void}
     */
    clear() {
        this._signaturePad.clear();
    }

    /**
     * Draw a signature from a data URL.
     *
     * @param {string} base64String
     * @return {void}
     */
    fromDataURL(base64String) {
        this._signaturePad.fromDataURL(base64String);
    }

    /**
     * Get the signature data as a data URL.
     *
     * @param {string} mime
     * @return {string}
     */
    toDataURL(mime) {
        return this._signaturePad.toDataURL(mime);
    }

    /**
     * Draw a signature from an array of point groups.
     *
     * @param {Array} data
     * @return {void}
     */
    fromData(data) {
        this._signaturePad.fromData(data);
    }

    /**
     * Get the signature pad data an array of point groups.
     *
     * @return {Array}
     */
    toData() {
        return this._signaturePad.toData();
    }

    /**
     * Turn the signature pad off.
     *
     * @return {void}
     */
    off() {
        this._signaturePad.off();
    }

    /**
     * Turn the signature pad on.
     *
     * @return {void}
     */
    on() {
        this._signaturePad.on();
    }

    /**
     * Handle a resize event.
     *
     * @return {void}
     */
    handleResize() {
        this.scaleCanvas();
    }

    /**
     * Scale the canvas.
     *
     * @return {void}
     */
    scaleCanvas() {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        const width = (this.props.width || this._canvas.offsetWidth) * ratio;
        const height = (this.props.height || this._canvas.offsetHeight) * ratio;

        // Avoid needlessly setting height/width if dimensions haven't changed
        const { canvasWidth, canvasHeight } = this.state;
        if (width === canvasWidth && height === canvasHeight) return;

        let data;
        if (this.props.redrawOnResize && this._signaturePad) {
            data = this._signaturePad.toDataURL();
        }

        this._canvas.width = width;
        this._canvas.height = height;

        this.setState({ canvasWidth: width, canvasHeight: height });

        const ctx = this._canvas.getContext('2d');
        ctx.scale(ratio, ratio);

        if (this.props.redrawOnResize && this._signaturePad) {
            this._signaturePad.fromDataURL(data);
        } else if (this._signaturePad) {
            this._signaturePad.clear();
        }
    }

    /**
     * Render the signature pad component.
     *
     * @return {ReactElement}
     */
    render() {
        const { canvasProps } = this.props;

        return <canvas ref={(ref) => (this._canvas = ref)} {...canvasProps} />;
    }
}

export default SignaturePad;
