import React, { Component } from 'react';
import { NavMenu } from './NavMenu';
import { Link, NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Jumbotron, Container } from 'reactstrap';
import { Table } from 'reactstrap';
export class FetchEmployee extends Component {
    displayName = FetchEmployee.name

    constructor(props) {
        super(props);
        this.state = { info: [], loading: true };

        fetch('api/Employee/Index')
            .then(response => response.json())
            .then(data => {
                this.setState({info: data, loading: false });
            });
        
    }
     handleDelete(id,e) {
        {
             {
                 
                 console.log('Parameter', id);
                 if (!window.confirm("Do you want to delete employee with Id: " + id))
                    return;
                else {
                    fetch('api/Employee/Delete/' + id, {
                        method: 'delete'
                    }).then(data => {
                        this.setState(
                            {
                               info: this.state.info.filter((rec) => {
                                    return (rec.employeeId !== id);
                                })
                            });
                    });
                }
            }
        }
    }


       handleEdit(id,e) {
           {
               
                this.props.history.push("/employee/edit/" + id);
            }
        }
    

     renderForecastsTable(info) {
        return (
            <Table>
                <thead>
                    <tr>
                        <th></th>
                        <th>EmployeeId</th>
                        <th>Name</th>
                        <th>Pincode</th>
                       
                        <th>Address</th>
                        <th>Username</th>
                    </tr> 
                </thead>
                <tbody>
                    {info.map(emp =>
                        <tr key={emp.employeeId}>
                            <td></td>
                            <td>{emp.employeeId}</td>
                            <td>{emp.name}</td>
                            <td>{emp.pincode}</td>
                            
                            <td>{emp.address}</td>
                            <td>{emp.username}</td>
                            <td>
                                <Button color="warning" onClick={(e) => this.handleEdit(emp.employeeId, e)}>Edit</Button>{' '}

                                <Button color="danger" onClick={(e) => this.handleDelete(emp.employeeId, e)}>Delete</Button>{' '}

                               
                            </td>  
                        </tr>
                    )}
                </tbody>
            </Table>
        );
    }

        render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            :this.renderForecastsTable(this.state.info);

            return (
              
                    <div>
                    <NavMenu></NavMenu>
                    <Jumbotron fluid>
                        <Container fluid>
                <h1 className="display-3">Delivery Personnel</h1>
                
                <p>
                    <Link to="/addemployee">Create New</Link>
                </p>
                            {contents}
                        </Container>
                    </Jumbotron>
            </div>);  
    }
}

export class EmployeeData {
    employeeId = 0;
    name = "";
    pincode= "";
    salary= "";
    address = "";
    username = "";
}
