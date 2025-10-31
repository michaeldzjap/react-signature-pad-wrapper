import { useRef, useCallback, useState, useEffect } from 'react';

import SignaturePad from '../src/SignaturePad';

/**
 * Layout component for the signature pad example.
 * Demonstrates a responsive signature pad with clear and save functionality.
 */
const Layout = () => {
    const signaturePadRef = useRef<SignaturePad>(null);
    const [hasSignature, setHasSignature] = useState(false);
    const [savedSignature, setSavedSignature] = useState<string | null>(null);

    /**
     * Set up event listeners for tracking signature state.
     */
    useEffect(() => {
        const signaturePad = signaturePadRef.current;

        if (!signaturePad) {
            return;
        }

        const handleBeginStroke = () => {
            setHasSignature(true);
        };

        // Add event listeners
        signaturePad.instance.addEventListener('beginStroke', handleBeginStroke);

        // Cleanup event listeners
        return () => {
            signaturePad.instance.removeEventListener('beginStroke', handleBeginStroke);
        };
    }, []);

    /**
     * Clear the signature pad.
     */
    const handleClear = useCallback(() => {
        const signaturePad = signaturePadRef.current;

        if (signaturePad) {
            signaturePad.instance.clear();
            setHasSignature(false);
        }
    }, []);

    /**
     * Save the signature by opening it in a new window.
     */
    const handleSave = useCallback(() => {
        const signaturePad = signaturePadRef.current;

        if (!signaturePad) {
            return;
        }

        if (signaturePad.isEmpty()) {
            alert('Please provide a signature first.');
        } else {
            const dataURL = signaturePad.toDataURL();
            setSavedSignature(dataURL);
        }
    }, []);

    return (
        <section className="section">
            <div className="container">
                <div className="columns">
                    <div className="column has-text-centered">
                        <h1 className="title is-2 has-text-black">Digital Signature Pad</h1>
                        <h2 className="subtitle is-5 has-text-black">Create your signature with ease</h2>
                    </div>
                </div>

                <div className="columns">
                    <div className="column is-10-tablet is-offset-1-tablet is-6-desktop is-offset-3-desktop">
                        <div className="card">
                            <div className="card-content">
                                <div className="content">
                                    <p className="has-text-centered has-text-grey">
                                        Sign in the box below using your mouse or touch screen
                                    </p>
                                    <div>
                                        <SignaturePad redrawOnResize ref={signaturePadRef} />
                                    </div>
                                </div>
                            </div>
                            <footer className="card-footer">
                                <button
                                    type="button"
                                    className="card-footer-item button is-light"
                                    onClick={handleClear}
                                    disabled={!hasSignature}
                                    aria-label="Clear signature"
                                >
                                    <span className="icon">
                                        <i className="fas fa-eraser"></i>
                                    </span>
                                    <span>Clear</span>
                                </button>
                                <div className="card-footer-item">
                                    <span>Sign above</span>
                                </div>
                                <button
                                    type="button"
                                    className="card-footer-item button is-primary"
                                    onClick={handleSave}
                                    aria-label="Save signature"
                                >
                                    <span className="icon">
                                        <i className="fas fa-save"></i>
                                    </span>
                                    <span>Save</span>
                                </button>
                            </footer>
                        </div>
                    </div>
                </div>

                {savedSignature && (
                    <div className="columns">
                        <div className="column is-10-tablet is-offset-1-tablet is-6-desktop is-offset-3-desktop">
                            <div className="card">
                                <div className="card-content">
                                    <h3 className="is-size-5 has-text-centered">✅ Saved Signature</h3>
                                    <div>
                                        <img src={savedSignature || '/placeholder.svg'} alt="Saved signature" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Layout;
