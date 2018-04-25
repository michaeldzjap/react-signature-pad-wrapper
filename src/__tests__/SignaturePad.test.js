import React from 'react';
import {mount} from 'enzyme';

import './helpers/resizeWindow';
import signature from './helpers/signature';
import SignaturePad from '../SignaturePad';

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
    });
});
