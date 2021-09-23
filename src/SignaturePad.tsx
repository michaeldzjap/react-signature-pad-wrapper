import * as React from 'react';
import * as SigPad from 'signature_pad';
import { debounce } from 'throttle-debounce';

type Props = {
    width?: number;
    height?: number;
    options?: SigPad.SignaturePadOptions;
    canvasProps?: { [key: string]: string };
} & DefaultProps;

type DefaultProps = {
    redrawOnResize: boolean;
    debounceInterval: number;
};

type State = {
    canvasWidth: number;
    canvasHeight: number;
};

/**
 * @class
 * @classdesc Signature pad component.
 * @extends {PureComponent}
 */
class SignaturePad extends React.PureComponent<Props, State> {
    static displayName = 'react-signature-pad-wrapper';

    static defaultProps: DefaultProps = {
        redrawOnResize: false,
        debounceInterval: 150,
    };

    private canvasRef = React.createRef<HTMLCanvasElement>();

    private signaturePad!: SigPad;

    private callResizeHandler!: debounce<() => void>;

    /**
     * Create a new signature pad.
     *
     * @param {Props} props
     */
    constructor(props: Props) {
        super(props);

        this.state = { canvasWidth: 0, canvasHeight: 0 };

        this.callResizeHandler = debounce<() => void>(this.props.debounceInterval, this.handleResize.bind(this));
    }

    /**
     * Initialise the signature pad once the canvas element is rendered.
     *
     * @return {void}
     */
    componentDidMount(): void {
        const canvas = this.canvasRef.current;

        if (canvas) {
            if (!this.props.width || !this.props.height) {
                canvas.style.width = '100%';
            }

            this.scaleCanvas();

            if (!this.props.width || !this.props.height) {
                window.addEventListener('resize', this.callResizeHandler);
            }

            this.signaturePad = new SigPad(canvas, this.props.options);
        }
    }

    /**
     * Remove the resize event listener and switch the signature pad off on
     * unmount.
     *
     * @return {void}
     */
    componentWillUnmount(): void {
        if (!this.props.width || !this.props.height) {
            window.removeEventListener('resize', this.callResizeHandler);
        }

        this.signaturePad.off();
    }

    /**
     * Get the original signature_pad instance.
     *
     * @return {SigPad}
     */
    get instance(): SigPad {
        return this.signaturePad;
    }

    /**
     * Get the canvas ref.
     *
     * @return {Object}
     */
    get canvas(): React.RefObject<HTMLCanvasElement> {
        return this.canvasRef;
    }

    /**
     * Set the radius of a single dot.
     *
     * @param {(number|Function)} dotSize
     * @return {void}
     */
    set dotSize(dotSize: number | (() => number)) {
        this.signaturePad.dotSize = dotSize;
    }

    /**
     * Get the radius of a single dot.
     *
     * @return {number}
     */
    get dotSize(): number | (() => number) {
        return this.signaturePad.dotSize;
    }

    /**
     * Set the minimum width of a line.
     *
     * @param {number} minWidth
     * @return {void}
     */
    set minWidth(minWidth: number) {
        this.signaturePad.minWidth = minWidth;
    }

    /**
     * Get the minimum width of a line.
     *
     * @return {number}
     */
    get minWidth(): number {
        return this.signaturePad.minWidth;
    }

    /**
     * Get the maximum width of a line.
     *
     * @param {number} maxWidth
     * @return {void}
     */
    set maxWidth(maxWidth: number) {
        this.signaturePad.maxWidth = maxWidth;
    }

    /**
     * Get the maximum width of a line.
     *
     * @return {number}
     */
    get maxWidth(): number {
        return this.signaturePad.maxWidth;
    }

    /**
     * Set the throttle for drawing the next point at most once every x ms.
     *
     * @param {number} throttle
     * @return {void}
     */
    set throttle(throttle: number) {
        this.signaturePad.throttle = throttle;
    }

    /**
     * Get the throttle for drawing the next point at most once every x ms.
     *
     * @return {number}
     */
    get throttle(): number {
        return this.signaturePad.throttle;
    }

    /**
     * Set the color used to clear the background.
     *
     * @param {string} color
     * @return {void}
     */
    set backgroundColor(color: string) {
        this.signaturePad.backgroundColor = color;
    }

    /**
     * Get the color used to clear the background.
     *
     * @return {string}
     */
    get backgroundColor(): string {
        return this.signaturePad.backgroundColor;
    }

    /**
     * Set the color used to draw the lines.
     *
     * @param {string} color
     * @return {void}
     */
    set penColor(color: string) {
        this.signaturePad.penColor = color;
    }

    /**
     * Get the color used to draw the lines.
     *
     * @return {string}
     */
    get penColor(): string {
        return this.signaturePad.penColor;
    }

    /**
     * Set weight used to modify new velocity based on the previous velocity.
     *
     * @param {number} weight
     * @return {void}
     */
    set velocityFilterWeight(weight: number) {
        this.signaturePad.velocityFilterWeight = weight;
    }

    /**
     * Get weight used to modify new velocity based on the previous velocity.
     *
     * @return {number}
     */
    get velocityFilterWeight(): number {
        return this.signaturePad.velocityFilterWeight;
    }

    /**
     * Set callback that will be triggered on stroke begin.
     *
     * @param {Function} fn
     * @return {void}
     */
    set onBegin(fn: ((event: MouseEvent) => void) | undefined) {
        if (!(fn && typeof fn === 'function')) {
            throw new Error('Invalid argument passed to onBegin()');
        }

        this.signaturePad.onBegin = fn;
    }

    /**
     * Set callback that will be triggered on stroke end.
     *
     * @param {Function} fn
     * @return {void}
     */
    set onEnd(fn: ((event: MouseEvent) => void) | undefined) {
        if (!(fn && typeof fn === 'function')) {
            throw new Error('Invalid argument passed to onEnd()');
        }

        this.signaturePad.onEnd = fn;
    }

    /**
     * Determine if the canvas is empty.
     *
     * @return {Boolean}
     */
    isEmpty(): boolean {
        return this.signaturePad.isEmpty();
    }

    /**
     * Clear the canvas.
     *
     * @return {void}
     */
    clear(): void {
        this.signaturePad.clear();
    }

    /**
     * Draw a signature from a data URL.
     *
     * @param {string} base64String
     * @return {void}
     */
    fromDataURL(base64String: string): void {
        this.signaturePad.fromDataURL(base64String);
    }

    /**
     * Get the signature data as a data URL.
     *
     * @param {string} mime
     * @return {string}
     */
    toDataURL(mime: string): string {
        return this.signaturePad.toDataURL(mime);
    }

    /**
     * Draw a signature from an array of point groups.
     *
     * @param {Array} data
     * @return {void}
     */
    fromData(data: Array<Array<SigPad.Point>>): void {
        this.signaturePad.fromData(data);
    }

    /**
     * Get the signature pad data an array of point groups.
     *
     * @return {Array}
     */
    toData(): Array<Array<SigPad.Point>> {
        return this.signaturePad.toData();
    }

    /**
     * Turn the signature pad off.
     *
     * @return {void}
     */
    off(): void {
        this.signaturePad.off();
    }

    /**
     * Turn the signature pad on.
     *
     * @return {void}
     */
    on(): void {
        this.signaturePad.on();
    }

    /**
     * Handle a resize event.
     *
     * @return {void}
     */
    handleResize(): void {
        this.scaleCanvas();
    }

    /**
     * Scale the canvas.
     *
     * @return {void}
     */
    scaleCanvas(): void {
        const canvas = this.canvasRef.current;

        if (!canvas) {
            return;
        }

        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        const width = (this.props.width || canvas.offsetWidth) * ratio;
        const height = (this.props.height || canvas.offsetHeight) * ratio;

        // Avoid needlessly setting height/width if dimensions haven't changed
        const { canvasWidth, canvasHeight } = this.state;
        if (width === canvasWidth && height === canvasHeight) return;

        let data;
        if (this.props.redrawOnResize && this.signaturePad) {
            data = this.signaturePad.toDataURL();
        }

        canvas.width = width;
        canvas.height = height;

        this.setState({ canvasWidth: width, canvasHeight: height });

        const ctx = canvas.getContext('2d');

        if (ctx) {
            ctx.scale(ratio, ratio);
        }

        if (data) {
            this.signaturePad.fromDataURL(data);
        } else if (this.signaturePad) {
            this.signaturePad.clear();
        }
    }

    /**
     * Render the signature pad component.
     *
     * @return {ReactNode}
     */
    render(): React.ReactNode {
        const { canvasProps } = this.props;

        return <canvas ref={this.canvasRef} {...canvasProps} />;
    }
}

export default SignaturePad;
