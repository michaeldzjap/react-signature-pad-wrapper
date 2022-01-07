import * as React from 'react';
import { mount } from 'enzyme';
import SigPad from 'signature_pad';

import signature from './helpers/signature';
import SignaturePad from '../src/SignaturePad';

describe('Component', () => {
    describe('SignaturePad', () => {
        beforeEach(() => {
            jest.restoreAllMocks();
        });

        it('renders the component', () => {
            const signaturePad = mount<SignaturePad>(<SignaturePad redrawOnResize />);

            expect(signaturePad.exists()).toBeTruthy();
        });

        it('loads a signature', () => {
            const signaturePad = mount<SignaturePad>(<SignaturePad redrawOnResize />);
            const instance = signaturePad.instance();

            expect(instance.isEmpty()).toBeTruthy();

            instance.fromDataURL(signature);

            expect(instance.isEmpty()).toBeFalsy();
        });

        it('clears the signature pad', () => {
            const signaturePad = mount<SignaturePad>(<SignaturePad redrawOnResize />);
            const instance = signaturePad.instance();

            instance.fromDataURL(signature);

            expect(instance.isEmpty()).toBeFalsy();

            instance.clear();

            expect(instance.isEmpty()).toBeTruthy();
        });

        it('returns the underlying signature pad instance', () => {
            const signaturePad = mount<SignaturePad>(<SignaturePad redrawOnResize />);
            const instance = signaturePad.instance();

            expect(instance.instance).toBeInstanceOf(SigPad);
        });

        it('returns a ref to the underlying HTML canvas element', () => {
            const signaturePad = mount<SignaturePad>(<SignaturePad redrawOnResize />);
            const instance = signaturePad.instance();

            expect(instance.canvas).toBeInstanceOf(Object);
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
                const signaturePad = mount<SignaturePad>(<SignaturePad redrawOnResize />);
                const instance = signaturePad.instance();

                Reflect.set(instance, option, expected);

                expect(Reflect.get(instance, option)).toBe(expected);
            });
        });

        it('returns a signature as a data URL', () => {
            const signaturePad = mount<SignaturePad>(<SignaturePad redrawOnResize />);
            const instance = signaturePad.instance();

            expect(instance.toDataURL()).toContain('data:image/png;base64');
        });

        it('returns a signature as an array of data points', () => {
            const signaturePad = mount<SignaturePad>(<SignaturePad redrawOnResize />);
            const instance = signaturePad.instance();

            expect(instance.toData()).toHaveLength(0);
        });

        it('draws a signature from an array of data points', () => {
            const signaturePad = mount<SignaturePad>(<SignaturePad redrawOnResize />);
            const instance = signaturePad.instance();

            const data = [
                {
                    dotSize: 0,
                    maxWidth: 2.5,
                    minWidth: 0.5,
                    penColor: 'black',
                    points: [{ pressure: 0.5, time: 1641476147709, x: 100, y: 100 }],
                },
            ];

            instance.fromData(data);

            expect(instance.toData()).toBe(data);
        });

        it('unbinds all event handlers', () => {
            const signaturePad = mount<SignaturePad>(<SignaturePad redrawOnResize />);
            const instance = signaturePad.instance();
            const spy = jest.spyOn(instance.instance, 'off');

            instance.off();

            expect(spy).toHaveBeenCalled();

            spy.mockRestore();
        });

        it('rebinds all event handlers', () => {
            const signaturePad = mount<SignaturePad>(<SignaturePad redrawOnResize />);
            const instance = signaturePad.instance();
            const spy = jest.spyOn(instance.instance, 'on');

            instance.on();

            expect(spy).toHaveBeenCalled();

            spy.mockRestore();
        });

        it('scales the canvas when resizing the viewport', () => {
            const signaturePad = mount<SignaturePad>(<SignaturePad redrawOnResize />);
            const instance = signaturePad.instance();
            const spy = jest.spyOn(instance, 'scaleCanvas');

            instance.handleResize();

            expect(spy).toHaveBeenCalled();
        });

        it('does not add the resize event listener on mount', () => {
            const spy = jest.spyOn(window, 'addEventListener');
            const signaturePad = mount<SignaturePad>(<SignaturePad redrawOnResize width={512} height={512} />);

            expect(spy).not.toHaveBeenCalledWith('resize', Reflect.get(signaturePad.instance(), 'callResizeHandler'));
        });

        it('adds the resize event listener on mount', () => {
            const spy = jest.spyOn(window, 'addEventListener');

            const signaturePad = mount<SignaturePad>(<SignaturePad />);

            expect(spy).toHaveBeenCalledWith('resize', Reflect.get(signaturePad.instance(), 'callResizeHandler'));
        });

        it('removes the resize event listener on unmount', () => {
            const spy = jest.spyOn(window, 'removeEventListener');
            const signaturePad = mount<SignaturePad>(<SignaturePad redrawOnResize />);
            const handler = Reflect.get(signaturePad.instance(), 'callResizeHandler');

            signaturePad.unmount();

            expect(spy).toHaveBeenCalledWith('resize', handler);
        });

        it('does not remove the resize event listener on unmount', () => {
            const spy = jest.spyOn(window, 'removeEventListener');
            const signaturePad = mount<SignaturePad>(<SignaturePad redrawOnResize width={512} height={512} />);
            const handler = Reflect.get(signaturePad.instance(), 'callResizeHandler');

            signaturePad.unmount();

            expect(spy).not.toHaveBeenCalledWith('resize', handler);
        });
    });
});
