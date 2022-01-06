import * as React from 'react';
import { mount } from 'enzyme';
import SigPad from 'signature_pad';

import signature from './helpers/signature';
import SignaturePad from '../src/SignaturePad';

describe('Component', () => {
    describe('SignaturePad', () => {
        const signaturePad = mount<SignaturePad>(<SignaturePad redrawOnResize />);
        const instance = signaturePad.instance();

        it('renders the component', () => {
            expect(signaturePad.exists()).toBeTruthy();
        });

        it('loads a signature', () => {
            expect(instance.isEmpty()).toBeTruthy();

            instance.fromDataURL(signature);

            expect(instance.isEmpty()).toBeFalsy();
        });

        it('clears the signature pad', () => {
            instance.fromDataURL(signature);

            expect(instance.isEmpty()).toBeFalsy();

            instance.clear();

            expect(instance.isEmpty()).toBeTruthy();
        });

        it('returns the underlying signature pad instance', () => {
            const signaturePad = instance.instance;

            expect(signaturePad).toBeInstanceOf(SigPad);
        });

        it('returns a ref to the underlying HTML canvas element', () => {
            const canvas = instance.canvas;

            expect(canvas).toBeInstanceOf(Object);
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
                Reflect.set(instance, option, expected);

                expect(Reflect.get(instance, option)).toBe(expected);
            });
        });

        it('returns a signature as a data URL', () => {
            const url = instance.toDataURL();

            expect(url).toContain('data:image/png;base64');
        });

        it('returns a signature as an array of data points', () => {
            const data = instance.toData();

            expect(data).toHaveLength(0);
        });

        it('draws a signature from an array of data points', () => {
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
            const spy = jest.spyOn(instance.instance, 'off');

            instance.off();

            expect(spy).toHaveBeenCalled();
        });

        it('rebinds all event handlers', () => {
            const spy = jest.spyOn(instance.instance, 'on');

            instance.on();

            expect(spy).toHaveBeenCalled();
        });

        it('scales the canvas when resizing the viewport', () => {
            const spy = jest.spyOn(instance, 'scaleCanvas');

            instance.handleResize();

            expect(spy).toHaveBeenCalled();
        });

        it('removes the resize event listener on unmount', () => {
            const spy = jest.spyOn(window, 'removeEventListener');

            signaturePad.unmount();

            expect(spy).toHaveBeenCalled();
        });
    });
});
