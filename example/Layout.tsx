import * as React from 'react';

import SignaturePad from '../src/SignaturePad';

/**
 * @class
 * @classdesc Layout component.
 * @extends {PureComponent}
 */
class Layout extends React.PureComponent {
    /**
     * The signature pad component reference.
     *
     * @var {RefObject}
     */
    private signaturePadRef = React.createRef<SignaturePad>();

    /**
     * Clear the signature pad.
     *
     * @return {void}
     */
    handleClear(): void {
        const signaturePad = this.signaturePadRef.current;

        if (signaturePad) {
            signaturePad.instance.clear();
        }
    }

    /**
     * Save a signature.
     *
     * @return {void}
     */
    handleSave(): void {
        const signaturePad = this.signaturePadRef.current;

        if (!signaturePad) {
            return;
        }

        if (signaturePad.isEmpty()) {
            // eslint-disable-next-line no-alert
            alert('Please provide a signature first.');
        } else {
            window.open(signaturePad.toDataURL());
        }
    }

    /**
     * Render the title.
     *
     * @return {ReactNode}
     */
    renderTitle(): React.ReactNode {
        return (
            <div className="columns">
                <div className="column">
                    <h1 className="title">React-Signature-Pad-Wrapper</h1>
                    <h2 className="subtitle">responsive example</h2>
                </div>
            </div>
        );
    }

    /**
     * Render the signature pad.
     *
     * @return {ReactNode}
     */
    renderSignaturePad(): React.ReactNode {
        return (
            <div className="columns">
                <div className="column is-10-tablet is-offset-1-tablet is-8-desktop is-offset-2-desktop">
                    <div className="card">
                        <div className="card-content">
                            <div className="content">
                                <SignaturePad redrawOnResize ref={this.signaturePadRef} />
                            </div>
                        </div>
                        <footer className="card-footer">
                            <a className="card-footer-item" onClick={this.handleClear.bind(this)}>
                                Clear
                            </a>
                            <p className="card-footer-item">
                                <span>sign above</span>
                            </p>
                            <a className="card-footer-item" onClick={this.handleSave.bind(this)}>
                                Save
                            </a>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Render the layout component.
     *
     * @return {ReactNode}
     */
    render(): React.ReactNode {
        return (
            <section className="section">
                <div className="container">
                    {this.renderTitle()}
                    {this.renderSignaturePad()}
                </div>
            </section>
        );
    }
}

export default Layout;
