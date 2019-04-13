import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { EmployeeData } from './FetchEmployee';
import {CustomerData } from './FetchCustomer';
import { Jumbotron, Container } from 'reactstrap';
export class AddCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: "", loading: true, magList: [], cusData: new CustomerData() ,value:[]};
        fetch('api/Magazine/GetMagList')
            .then(response => response.json())
            .then(data => {
                this.setState({ magList: data });
            });
        var empid = this.props.match.params["custid"];
        // This will set state for Edit employee  
        if (empid > 0) {
            fetch('api/Customer/Details/' + empid)
                .then(response => response.json())
                .then(data => {
                    this.setState({ title: "Edit", loading: false, cusData: data });
                });
        }
        // This will set state for Add employee  
        else {
            this.state = { title: "Create", loading: false, magList: [], cusData: new CustomerData() };
        }
        // This binding is necessary to make "this" work in the callback  
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm(this.state.magList);
        return <div>
            <h1 id="tn">Customer Form</h1>
           
            <hr />
            {contents}
        </div>;
    }
    // This will handle the submit form event.  
    handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        var mag = this.state.value.join(",");
        data.set('magazineName', mag);
        
        // PUT request for Edit employee.  
        if (this.state.cusData.customerId) {
            fetch('api/Customer/Edit', {
                method: 'PUT',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchcustomer");
                })
        }
        // POST request for Add employee.  
        else {
            
            fetch('api/Customer/Create', {
                method: 'POST',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchcustomer");
                })
        }
    }
    handleChange(event) {
        //this.setState({value: event.option});
        this.setState({ value: Array.from(event.target.selectedOptions, (item) => item.value) });
    }
    // This will handle Cancel button click event.  
    handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchcustomer");
    }
    handleSubmit(event) {
        
        event.preventDefault();
    }
    // Returns the HTML Form to the render() method.  
    renderCreateForm(magList) {
        return (
            <Jumbotron fluid>
                <Container fluid>
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="customerId" value={this.state.cusData.customerId} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.cusData.name} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Address">Address</label>
                    <div className="col-md-4">
                        <input className="form-control" data-val="true" name="address" defaultValue={this.state.cusData.address} required />
                         
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Pincode" >Pincode</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="pincode" defaultValue={this.state.cusData.pincode} required />
                    </div>
                </div>

                 
 
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="issueDate" >Issue Date</label>
                    <div className="col-md-4">
                        <input className="form-control" type="date" name="issueDate" defaultValue={this.state.cusData.issueDate}  />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="endDate" >End Date</label>
                    <div className="col-md-4">
                        <input className="form-control" type="date" name="endDate" defaultValue={this.state.cusData.endDate} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="billDate" >Bill Date</label>
                    <div className="col-md-4">
                        <input className="form-control" type="date" name="billDate" defaultValue={this.state.cusData.billDate}  />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="paymentMode" >Payment Mode</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="paymentMode" defaultValue={this.state.cusData.paymentMode}  />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="paymentStatus" >Payment Status</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="paymentStatus" defaultValue={this.state.cusData.paymentStatus} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="subscriptionStatus" >Subscription Status</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="subscriptionStatus" defaultValue={this.state.cusData.subscriptionStatus} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="email" >Email</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="email" defaultValue={this.state.cusData.email} />
                    </div>
                </div>
             
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="magazine">Magazine</label>
                    <div className="col-md-4">
                            <select multiple={true} defaultValue={this.state.value} className="form-control" data-val="true" name="magazineName" onChange={this.handleChange}>
                            <option value="">-- Select Magazine --</option>
                            {magList.map(mag =>
                                <option key={mag.magazineId} value={mag.magazineName}>{mag.magazineName}</option>
                            )}
                        </select>
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