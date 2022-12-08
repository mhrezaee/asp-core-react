import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap';


export class AddEmployeeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {deps:[]};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileSelected = this.handleFileSelected.bind(this);
    }

    photoFileName = "anonymous.png";
    imageSrc = process.env.REACT_APP_PHOTOPATH + this.photoFileName;

    componentDidMount() {
        fetch(process.env.REACT_APP_API + 'department')
            .then(resposne => resposne.json())
            .then(data => this.setState({ deps: data }));
    }


    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'employee', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Id: 10,
                Name: event.target.Name.value,
                Department: event.target.Department.value,
                DateOfJoining: event.target.DateOfJoining.value,
                PhotoFileName: this.photoFileName
                })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
            },
                (error) => {
                    alert('Failed');
                })
    }


    handleFileSelected(event) {
        event.preventDefault();
        this.photoFileName = event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API + 'employees/SaveFiles', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                this.imageSrc = process.env.REACT_APP_PHOTOPATH + result;
            }, (error) => {
                alert('failed')
            });
    }


    render() {
        return (
            <div className="container">
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Employee
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="Name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="Name" required
                                            placeholder="Name" />
                                    </Form.Group>
                                    <Form.Group controlId="Department">
                                        <Form.Label>Department</Form.Label>
                                        <Form.Control as="select">
                                            {this.state.deps.map(dep =>
                                                <option key={dep.Id}>{dep.Name}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="DateOfJoining">
                                        <Form.Label>DateOfJoining</Form.Label>
                                        <Form.Control type="date" name="DateOfJoining" required
                                            placeholder="DateOfJoining" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add Employee
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col sm={6}>
                                <Image width="200px" height="200px" src={this.imageSrc} />
                                <input onChange={this.handleFileSelected} type="File" />
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>

                </Modal>
            </div>
        )
    }
}