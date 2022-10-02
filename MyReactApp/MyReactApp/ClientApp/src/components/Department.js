import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddDepartmentModal } from './AddDepartmentModal';
import { EditDepartmentModal } from './EditDepartmentModal';

export class Department extends Component {

    constructor(props) {
        super(props);
        this.state = { deps: [], addModalShow: false, editModalShow : false }
    }

    refreshList() {
        fetch(process.env.REACT_APP_API + 'department')
            .then(response => response.json())
            .then(data => { this.setState({ deps: data }); });
    }

    componentDidMount() {
        this.refreshList();
    }

    //componentDidUpdate() {
    //    this.refreshList();
    //}

    static displayName = Department.name;

    render() {
        const { deps, depid, depname } = this.state;
        let addModalClose = () => {
            this.setState({ addModalShow: false });
            this.refreshList();
        }
        let editModalClose = () => {
            this.setState({ editModalShow: false });
            this.refreshList();
        }

        return (
            <div className="container">
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>DepartmentId</th>
                            <th>DepartmentName</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep => 
                            <tr key={dep.Id }>
                                <td>{dep.Id }</td>
                                <td>{dep.Name }</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                            onClick={() => this.setState({ editModalShow: true, depid: dep.Id, depname: dep.Name })}  >
                                            Edit
                                        </Button>
                                        <EditDepartmentModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            depid={depid}
                                            depname={depname } />
                                    </ButtonToolbar>
                                </td>
                            </tr>
                            )}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant='primary'
                        onClick={() => this.setState({ addModalShow: true })}>
                        Add Department</Button>

                    <AddDepartmentModal show={this.state.addModalShow}
                        onHide={addModalClose} />
                </ButtonToolbar>
            </div>
        );
    }
}
