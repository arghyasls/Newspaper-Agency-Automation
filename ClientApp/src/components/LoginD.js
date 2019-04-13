import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import '../styles/homepage.css'
import { Jumbotron, Container } from 'reactstrap';
import { Button } from 'react-bootstrap';
export class LoginD extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
            username: '',
          
           
            info: [],
            salary: '',
            date: '',
            delList:[],
            redirectToLogin: false
        };
        fetch('api/Employee/GetUserName')
            .then(response => response.json())
            .then(data => {
                this.setState({ delList: data });
            });
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.handlename = this.handlename.bind(this);
    }
    onUpdate = (val) => {
        this.setState({
            username: val
            
        })
    };
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    login() {
        if (this.state.username) {

            fetch('api/loginD', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "application/x-www-form-urlencoded",
                },

                body: JSON.stringify(this.state),

            }).then((response) => response.json())
                .then(data => {
                    if (data == 1) {
                        var empid = this.state.username;
                        fetch('api/Employee/Delivery/' + empid)
                            .then(response => response.json())
                            .then(data => {
                          
                                this.setState({ info: data });
                            });
                       
                        fetch('api/Employee/Salary/' + empid, {
                            method: 'GET',
                            headers:
                                { "Content-Type": "text" }

                        }
                        )
                            .then(response => response.text())
                            .then(data => {
                                this.setState({ salary: data });
                            });
                        this.setState({ redirectToReferrer: true });
                    }            
                    else {
                        alert('Login for Delivery Person Invalid');
                    }
                });
            //sessionStorage.setItem('userData',JSON.stringify(responseJson));
            //
            //}
            //});
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = mm + '/' + dd + '/' + yyyy;
            this.setState({ date: today });
        }
    }
    handlename(event) {

        this.setState({ username: event.target.value });
        
       
    }
    render() {


        if (this.state.redirectToReferrer || sessionStorage.getItem('userData')) {
            return (
                
                <div>
                    <Jumbotron fluid>
                        <Container fluid>
                            <h3 className="display-3"> Deliveries for Date  {
                                this.state.date

                            }  </h3>
                       
                       
                            <h3 className="display-3"> Delivery Person Name: {this.state.username} </h3>
                       
                       
                <table className='table' >
                    <thead>
                        <tr>
                            <th>No of Deliveries </th>

                            <th>Customer Name</th>
                            <th>Customer Address</th>
                            <th>Magazine Name </th> 
                        </tr>
                    </thead>
                   
                    <tbody>{this.state.info.map(function (item, key) {

                        return (
                            <tr key={key}>
                                <td>{key+1}</td>

                                <td>{item.name}</td>
                                <td>{item.address}</td>
                                <td>{item.magazineName}</td>
                            </tr>
                        )

                    })}</tbody>
                    
                </table>
                            <h3 className="display-3">  Daily Salary earned: Rs {this.state.salary}</h3>
                    <div>
                        <a href="/fetchemployee">Back to Home Page </a>
                            </div>
                        </Container>
                    </Jumbotron>
                </div>

                
             )
        }
       
        




        return (
            <div className="row" id="Body">
                <div>
                    <Jumbotron fluid>
                        <Container fluid>
                            <h1 className="display-3">View Deliveries</h1>
                            <h3 className="display-3">Delivery Person Username</h3>
                            <div>
                               
                                <div >
                                    <select defaultValue={this.state.username} className="form-control" data-val="true" name="username" onChange={this.handlename}>
                                        <option value="">-- Select Delivery Person --</option>
                                        {this.state.delList.map(mag =>
                                            <option key={mag.employeeId} value={mag.username}>{mag.username}</option>
                                        )}
                                    </select>
                                </div>
                            </div >
                
                            <br></br>
                            <Button block
                                bsSize="large"
                    onClick={this.login}
                    type="submit"
                                value="Submit" >
                                <div id="t">Submit </div></Button>{' '}
                            <br></br>
                            <a href="/fetchemployee"> Back to Homepage </a>
                        </Container>
                       
                    </Jumbotron>
                   
                </div>
               
            </div>
        );
    }
}
export default LoginD;
