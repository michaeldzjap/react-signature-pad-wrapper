import React from 'react';
import {mount} from 'enzyme';

import './helpers/resizeWindow';
import signature from './helpers/signature';
import SignaturePad from '../src/SignaturePad';

describe('Component', () => {
    describe('SignaturePad', () => {
        const signaturePad = mount(<SignaturePad />);
        const instance = signaturePad.instance();

        it('renders the component', () => {
            expect(signaturePad.exists()).toBeTruthy();
        });

        it('loads a signature', () => {
            // Signature pad should be empty initially
            expect(instance.isEmpty()).toBeTruthy();

            // Load a signature
            instance.fromDataURL(signature);
            expect(instance.isEmpty()).toBeFalsy();
        });

        it('clears the signature pad', () => {
            // Load a signature
            instance.fromDataURL(signature);
            expect(instance.isEmpty()).toBeFalsy();

            instance.clear();
            expect(instance.isEmpty()).toBeTruthy();
        });

        it('fails to assign an invalid value to the onBegin option', () => {
            const fn = () => instance.onBegin = 100;

            expect(fn).toThrow('Invalid argument passed to onBegin()');
        });

        it('fails to assign an invalid value to the onEnd option', () => {
            const fn = () => instance.onEnd = 'a';

            expect(fn).toThrow('Invalid argument passed to onEnd()');
        });
    });
});
