import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SigPad from 'signature_pad';

import signature from './helpers/signature';
import SignaturePad from '../src/SignaturePad';

/**
 * Set the dimension of the HTML canvas element to the given width and height.
 *
 * @param {number} width
 * @param {number} height
 * @return {void}
 */
const scaleCanvas = (width: number, height: number): void => {
    Object.defineProperty(HTMLCanvasElement.prototype, 'offsetWidth', {
        configurable: true,
        value: width,
    });
    Object.defineProperty(HTMLCanvasElement.prototype, 'offsetHeight', {
        configurable: true,
        value: height,
    });
};

describe('Component', () => {
    describe('SignaturePad', () => {
        beforeEach(() => {
            jest.restoreAllMocks();
            scaleCanvas(1024, 768);
        });

        it('renders the component', () => {
            const { queryByTestId } = render(<SignaturePad redrawOnResize />);

            expect(queryByTestId('canvas-element')).toBeInTheDocument();
        });

        it('loads a signature', () => {
            const instance = React.createRef<SignaturePad>();

            render(<SignaturePad ref={instance} redrawOnResize />);

            const signaturePad = instance.current as SignaturePad;

            signaturePad.clear();

            expect(signaturePad.isEmpty()).toBeTruthy();

            signaturePad.fromDataURL(signature);

            expect(signaturePad.isEmpty()).toBeFalsy();
        });

        it('clears the signature pad', () => {
            const instance = React.createRef<SignaturePad>();

            render(<SignaturePad ref={instance} redrawOnResize />);

            const signaturePad = instance.current as SignaturePad;

            signaturePad.fromDataURL(signature);

            expect(signaturePad.isEmpty()).toBeFalsy();

            signaturePad.clear();

            expect(signaturePad.isEmpty()).toBeTruthy();
        });

        it('returns the underlying signature pad instance', () => {
            const instance = React.createRef<SignaturePad>();

            render(<SignaturePad ref={instance} redrawOnResize />);

            const signaturePad = instance.current as SignaturePad;

            expect(signaturePad.instance).toBeInstanceOf(SigPad);
        });

        it('returns a ref to the underlying HTML canvas element', () => {
            const instance = React.createRef<SignaturePad>();

            render(<SignaturePad ref={instance} redrawOnResize />);

            const signaturePad = instance.current as SignaturePad;

            expect(signaturePad.canvas).toBeInstanceOf(Object);
        });

        [
            { name: 'dot size', option: 'dotSize', expected: 3 },
            { name: 'min width', option: 'minWidth', expected: 1 },
            { name: 'max width', option: 'maxWidth', expected: 3 },
            { name: 'throttle', option: 'throttle', expected: 20 },
            { name: 'background color', option: 'backgroundColor', expected: 'rgba(255,255,255)' },
            { name: 'pen color', option: 'penColor', expected: 'red' },
            { name: 'velocity filter weight', option: 'velocityFilterWeight', expected: 1 },
        ].forEach(({ name, option, expected }) => {
            it(`sets and gets the ${name}`, () => {
                const instance = React.createRef<SignaturePad>();

                render(<SignaturePad ref={instance} redrawOnResize />);

                Reflect.set(instance.current as SignaturePad, option, expected);

                expect(Reflect.get(instance.current as SignaturePad, option)).toBe(expected);
            });
        });

        it('returns a signature as a data URL', () => {
            const instance = React.createRef<SignaturePad>();

            render(<SignaturePad ref={instance} redrawOnResize />);

            const signaturePad = instance.current as SignaturePad;

            expect(signaturePad.toDataURL()).toContain('data:image/png;base64');
        });

        it('returns a signature as an array of data points', () => {
            const instance = React.createRef<SignaturePad>();

            render(<SignaturePad ref={instance} redrawOnResize />);

            const signaturePad = instance.current as SignaturePad;

            expect(signaturePad.toData()).toHaveLength(0);
        });

        it('draws a signature from an array of data points', () => {
            const instance = React.createRef<SignaturePad>();

            render(<SignaturePad ref={instance} redrawOnResize />);

            const signaturePad = instance.current as SignaturePad;
            const data = [
                {
                    dotSize: 0,
                    maxWidth: 2.5,
                    minWidth: 0.5,
                    penColor: 'black',
                    velocityFilterWeight: 0.7,
                    points: [{ pressure: 0.5, time: 1641476147709, x: 100, y: 100 }],
                },
            ];

            signaturePad.fromData(data);

            expect(signaturePad.toData()).toStrictEqual(data);
        });

        it('unbinds all event handlers', () => {
            const instance = React.createRef<SignaturePad>();

            render(<SignaturePad ref={instance} redrawOnResize />);

            const signaturePad = instance.current as SignaturePad;
            const spy = jest.spyOn(signaturePad.instance, 'off');

            signaturePad.off();

            expect(spy).toHaveBeenCalled();

            spy.mockRestore();
        });

        it('rebinds all event handlers', () => {
            const instance = React.createRef<SignaturePad>();

            render(<SignaturePad ref={instance} redrawOnResize />);

            const signaturePad = instance.current as SignaturePad;
            const spy = jest.spyOn(signaturePad.instance, 'on');

            signaturePad.on();

            expect(spy).toHaveBeenCalled();

            spy.mockRestore();
        });

        it('does not redraw a signature by default when the viewport dimensions change', () => {
            const instance = React.createRef<SignaturePad>();

            render(<SignaturePad ref={instance} />);

            const signaturePad = instance.current as SignaturePad;
            const spy = jest.spyOn(signaturePad.instance, 'clear');

            scaleCanvas(768, 768);
            act(() => {
                signaturePad.handleResize();
            });

            expect(spy).toHaveBeenCalled();
        });

        it('redraws a signature when the viewport dimensions change', () => {
            const instance = React.createRef<SignaturePad>();

            render(<SignaturePad ref={instance} redrawOnResize />);

            const signaturePad = instance.current as SignaturePad;
            const spy = jest.spyOn(signaturePad.instance, 'toDataURL');

            scaleCanvas(768, 768);
            act(() => {
                signaturePad.handleResize();
            });

            expect(spy).toHaveBeenCalled();
        });

        it('does not redraw a signature when the viewport dimensions have not changed', () => {
            const instance = React.createRef<SignaturePad>();

            render(<SignaturePad ref={instance} redrawOnResize />);

            const signaturePad = instance.current as SignaturePad;
            const spy = jest.spyOn(signaturePad.instance, 'toDataURL');

            signaturePad.handleResize();

            expect(spy).not.toHaveBeenCalled();
        });

        it('does not add the resize event listener on mount', () => {
            const spy = jest.spyOn(window, 'addEventListener');
            const instance = React.createRef<SignaturePad>();

            render(<SignaturePad ref={instance} redrawOnResize width={512} height={512} />);

            expect(spy).not.toHaveBeenCalledWith(
                'resize',
                Reflect.get(instance.current as SignaturePad, 'callResizeHandler'),
            );
        });

        it('adds the resize event listener on mount', () => {
            const spy = jest.spyOn(window, 'addEventListener');
            const instance = React.createRef<SignaturePad>();

            render(<SignaturePad ref={instance} />);

            expect(spy).toHaveBeenCalledWith(
                'resize',
                Reflect.get(instance.current as SignaturePad, 'callResizeHandler'),
            );
        });

        it('removes the resize event listener on unmount', () => {
            const spy = jest.spyOn(window, 'removeEventListener');
            const instance = React.createRef<SignaturePad>();

            const { unmount } = render(<SignaturePad ref={instance} redrawOnResize />);
            const handler = Reflect.get(instance.current as SignaturePad, 'callResizeHandler');

            unmount();

            expect(spy).toHaveBeenCalledWith('resize', handler);
        });

        it('does not remove the resize event listener on unmount', () => {
            const spy = jest.spyOn(window, 'removeEventListener');
            const instance = React.createRef<SignaturePad>();

            const { unmount } = render(<SignaturePad ref={instance} redrawOnResize width={512} height={512} />);
            const handler = Reflect.get(instance.current as SignaturePad, 'callResizeHandler');

            unmount();

            expect(spy).not.toHaveBeenCalledWith('resize', handler);
        });
    });
});
