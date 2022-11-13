import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddEmployeeModal } from './AddEmployeeModal';
import { EditEmployeeModal } from './EditEmployeeModal';

export class Employee extends Component {

    constructor(props) {
        super(props);
        this.state = { emps: [], addModalShow: false, editModalShow: false }
    }

    refreshList() {
        fetch(process.env.REACT_APP_API + 'employee')
            .then(response => response.json())
            .then(data => { this.setState({ emps: data }); });
    }

    componentDidMount() {
        this.refreshList();
    }

    //componentDidUpdate() {
    //    this.refreshList();
    //}

    static displayName = Department.name;

    deleteEmployee(empId) {
        if (window.confirm('Are you sure?!')) {
            fetch(process.env.REACT_APP_API + 'employee/' + empId, {
                method: 'DELETE',
                header: { 'Accept': 'application/json', 'Content-Type': 'application/josn' }
            }
            )

        }
    }


    render() {
        const { emps, empid, empname, depmt, photofilename,doj } = this.state;
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
                            <th>Id</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>DateOfJoin</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp =>
                            <tr key={emp.Id}>
                                <td>{emp.Id}</td>
                                <td>{emp.Name}</td>
                                <td>{emp.Department}</td>
                                <td>{emp.DateOfJoining}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                            onClick={() => this.setState({
                                                editModalShow: true, empid: emp.Id, empname: emp.Name,
                                                depmt: emp.Department, photofilename: emp.PhotoFileName, doj: emp.DateOfJoining
                                            })}  >
                                            Edit
                                        </Button>
                                        <Button className="mr-2" variant="danger"
                                            onClick={() => this.deleteEmployee(emp.Id)}  >
                                            Delete
                                        </Button>
                                        <EditemployeeModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            empid={empid}
                                            empname={depname}
                                            depmt={depmt}
                                            photofilename={photofilename}
                                            doj={doj}
                                        />
                                    </ButtonToolbar>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant='primary'
                        onClick={() => this.setState({ addModalShow: true })}>
                        Add Employee</Button>

                    <AddEmployeeModal show={this.state.addModalShow}
                        onHide={addModalClose} />
                </ButtonToolbar>
            </div>
        );
    }
}
