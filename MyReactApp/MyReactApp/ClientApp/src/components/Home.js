import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div className="container">
                <h3 className="m-3 d-flex justify-content-left">
                    my react app home page!
                </h3>
            </div>
        );
    }
}
