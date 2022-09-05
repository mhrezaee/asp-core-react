import React, { Component } from 'react';

export class Employee extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div className="container">
                <h3 className="m-3 d-flex justify-content-left">
                    this is Employee page
                </h3>
            </div>
        );
    }
}
