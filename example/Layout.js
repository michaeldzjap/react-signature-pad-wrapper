import React, { PureComponent } from 'react';

import SignaturePad from '../dist/react-signature-pad-wrapper';

/**
 * @class
 * @classdesc Layout component.
 * @extends {PureComponent}
 */
class Layout extends PureComponent {
    /**
     * Clear the signature pad.
     *
     * @return {void}
     */
    handleClear() {
        this.signaturePad.instance.clear();
    }

    /**
     * Save a signature.
     *
     * @return {void}
     */
    handleSave() {
        if (this.signaturePad.isEmpty()) {
            // eslint-disable-next-line no-alert
            alert('Please provide a signature first.');
        } else {
            window.open(this.signaturePad.toDataURL());
        }
    }

    /**
     * Render the title.
     *
     * @return {ReactElement}
     */
    renderTitle() {
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
     * @return {ReactElement}
     */
    renderSignaturePad() {
        return (
            <div className="columns">
                <div className="column is-10-tablet is-offset-1-tablet is-8-desktop is-offset-2-desktop">
                    <div className="card">
                        <div className="card-content">
                            <div className="content">
                                <SignaturePad redrawOnResize={true} ref={(ref) => (this.signaturePad = ref)} />
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
     * @return {ReactElement}
     */
    render() {
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
