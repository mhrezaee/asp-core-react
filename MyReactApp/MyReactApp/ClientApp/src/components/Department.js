import React, { Component } from 'react';

export class Department extends Component {
    static displayName = Department.name;

    render() {
        return (
            <div className="container">
                <h3 className="m-3 d-flex justify-content-left">
                    this is department page
                </h3>
            </div>
        );
    }
}
