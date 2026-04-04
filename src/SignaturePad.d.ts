import * as React from 'react';
import * as PropTypes from 'prop-types';
import SigPad, { type FromDataUrlOptions, type Options, type PointGroup, type ToSVGOptions } from 'signature_pad';
type Props = {
    width?: number;
    height?: number;
    options?: Options;
    canvasProps?: {
        [key: string]: string | {
            [key: string]: string;
        };
    };
} & DefaultProps;
type DefaultProps = {
    redrawOnResize: boolean;
    debounceInterval: number;
};
type State = {
    canvasWidth: number;
    canvasHeight: number;
};
declare class SignaturePad extends React.PureComponent<Props, State> {
    static displayName: string;
    static propTypes: {
        width: PropTypes.Requireable<number>;
        height: PropTypes.Requireable<number>;
        options: PropTypes.Requireable<object>;
        canvasProps: PropTypes.Requireable<object>;
        redrawOnResize: PropTypes.Requireable<boolean>;
        debounceInterval: PropTypes.Requireable<number>;
    };
    static readonly defaultProps: DefaultProps;
    private readonly canvasRef;
    private signaturePad;
    private readonly callResizeHandler;
    constructor(props: Props);
    componentDidMount(): void;
    componentWillUnmount(): void;
    get instance(): SigPad;
    get canvas(): React.RefObject<HTMLCanvasElement | null>;
    set dotSize(dotSize: number);
    get dotSize(): number;
    set minWidth(minWidth: number);
    get minWidth(): number;
    set maxWidth(maxWidth: number);
    get maxWidth(): number;
    set throttle(throttle: number);
    get throttle(): number;
    set backgroundColor(color: string);
    get backgroundColor(): string;
    set penColor(color: string);
    get penColor(): string;
    set velocityFilterWeight(weight: number);
    get velocityFilterWeight(): number;
    isEmpty(): boolean;
    clear(): void;
    redraw(): void;
    fromDataURL(dataUrl: string, options?: FromDataUrlOptions): void;
    toDataURL(type?: string, encoderOptions?: number): string;
    toSvgDataUrl(encoderOptions?: ToSVGOptions): string;
    toSVG(svgOptions?: ToSVGOptions): string;
    fromData(data: PointGroup[]): void;
    toData(): PointGroup[];
    off(): void;
    on(): void;
    handleResize(): void;
    scaleCanvas(canvas: HTMLCanvasElement): void;
    render(): React.ReactNode;
}
export default SignaturePad;
