import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SigPad from 'signature_pad';
import { debounce } from 'throttle-debounce';

class SignaturePad extends Component {

    static displayName = 'react-signature-pad';

    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        options: PropTypes.object
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

    handleScroll() {
        this.scaleCanvas();
    }

    scaleCanvas() {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        const width = (this.props.width || this._canvas.offsetWidth) * ratio;
        const height = (this.props.height || this._canvas.offsetHeight) * ratio;

        let data;
        if (this._signaturePad) {
            data = this._signaturePad.toDataURL();
        }

        this._canvas.width = width;
        this._canvas.height = height;

        const ctx = this._canvas.getContext('2d');
        ctx.scale(ratio, ratio);

        if (this._signaturePad) {
            this._signaturePad.fromDataURL(data);
        }
    }

    render() {
        return <canvas ref={ref => this._canvas = ref} />;
    }
}

export default SignaturePad;
