import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { EmployeeData } from './FetchEmployee';
import { Jumbotron, Container } from 'reactstrap';
export class AddEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: "", loading: true, magList: [], empData: new EmployeeData() };
        fetch('api/Magazine/GetMagList')
            .then(response => response.json())
            .then(data => {
                this.setState({ magList: data });
            });
        var empid = this.props.match.params["empid"];
        // This will set state for Edit employee  
        if (empid > 0) {
            fetch('api/Employee/Details/' + empid)
                .then(response => response.json())
                .then(data => {
                    this.setState({ title: "Edit", loading: false, empData: data });
                });
        }
        // This will set state for Add employee  
        else {
            this.state = { title: "Create", loading: false, magList: [], empData: new EmployeeData() };
        }
        // This binding is necessary to make "this" work in the callback  
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
   render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm(this.state.magList);
        return <div>
            <h1 id="tn">Employee Form</h1>
            
            <hr />
            {contents}
        </div>;
    }
    // This will handle the submit form event.  
     handleSave(event) {
        event.preventDefault();
         const data = new FormData(event.target);
         
        // PUT request for Edit employee.  
        if (this.state.empData.employeeId) {
            fetch('api/Employee/Edit', {
                method: 'PUT',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchemployee");
                })
        }
        // POST request for Add employee.  
        else {
            fetch('api/Employee/Create', {
                method: 'POST',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchemployee");
                })
        }
    }
    // This will handle Cancel button click event.  
    handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchemployee");
    }
    // Returns the HTML Form to the render() method.  
     renderCreateForm(cityList) {
         return (
             <Jumbotron fluid>
                 <Container fluid>
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="employeeId" value={this.state.empData.employeeId} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.empData.name} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="pincode">Delivery Pincode</label>
                    <div className="col-md-4">
                        <input className="form-control" data-val="true" name="pincode" defaultValue={this.state.empData.pincode} required />
                           
                     
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="address" >Home Address</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="address" defaultValue={this.state.empData.address} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="salary">Salary</label>
                    <div className="col-md-4">
                        <input className="form-control" data-val="true" name="salary" defaultValue={this.state.empData.salary} required />
                            
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="username">Username</label>
                    <div className="col-md-4">
                        <input className="form-control" data-val="true" name="username" defaultValue={this.state.empData.username} required />

                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="password">Password</label>
                    <div className="col-md-4">
                        <input className="form-control" data-val="true" name="password" defaultValue={this.state.empData.password} required />

                    </div>
                </div >
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
                     </form >
                 </Container>
             </Jumbotron>
        )
    }
}