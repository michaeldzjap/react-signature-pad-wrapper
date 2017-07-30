import React, { Component } from 'react';

import SignaturePad from '../src';

class Layout extends Component {

    handleClear() {
        this.signaturePad.instance.clear();
    }

    handleSave() {
        if (this.signaturePad.isEmpty()) {
            alert('Please provide a signature first.');
        } else {
            window.open(this.signaturePad.toDataURL());
        }
    }

    renderTitle() {
        return (
            <div className="columns">
                <div className="column">
                    <h1 className="title">React-Signature-Pad</h1>
                    <h2 className="subtitle">responsive example</h2>
                </div>
            </div>
        );
    }

    renderSignaturePad() {
        return (
            <div className="columns">
                <div className="column is-10-tablet is-offset-1-tablet is-8-desktop is-offset-2-desktop">
                    <div className="card">
                        <div className="card-content">
                            <div className="content">
                                <SignaturePad redrawOnResize={true} ref={ref => this.signaturePad = ref} />
                            </div>
                        </div>
                        <footer className="card-footer">
                            <a className="card-footer-item" onClick={this.handleClear.bind(this)}>Clear</a>
                            <p className="card-footer-item">
                                <span>sign above</span>
                            </p>
                            <a className="card-footer-item" onClick={this.handleSave.bind(this)}>Save</a>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }

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
