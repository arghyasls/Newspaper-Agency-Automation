import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { MagazineData } from './FetchMagazine';
import { Jumbotron, Container } from 'reactstrap';
export class AddMagazine extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: "", loading: true, magList: [], magData: new MagazineData() };
        fetch('api/Magazine/GetMagList')
            .then(response => response.json())
            .then(data => {
                this.setState({ magList: data });
            });
        var empid = this.props.match.params["magid"];
        // This will set state for Edit employee  
        if (empid > 0) {
            fetch('api/Magazine/Details/' + empid)
                .then(response => response.json())
                .then(data => {
                    this.setState({ title: "Edit", loading: false, magData: data });
                });
        }
        // This will set state for Add employee  
        else {
            this.state = { title: "Create", loading: false, magList: [], magData: new MagazineData() };
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
            <h1 id="tn">Magazine Form</h1>
            
            <hr />
            {contents}
        </div>;
    }
    // This will handle the submit form event.  
    handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        // PUT request for Edit employee.  
        if (this.state.magData.magazineId) {
            fetch('api/Magazine/Edit', {
                method: 'PUT',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchmagazine");
                })
        }
        // POST request for Add employee.  
        else {
            fetch('api/Magazine/Create', {
                method: 'POST',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchmagazine");
                })
        }
    }
    // This will handle Cancel button click event.  
    handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchmagazine");
    }
    // Returns the HTML Form to the render() method.  
    renderCreateForm(magData) {
        return (
            <Jumbotron fluid>
                <Container fluid>
           
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="magazineId" value={this.state.magData.magazineId} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Magazine Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="magazineName" defaultValue={this.state.magData.magazineName} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="magazineprice">Magazine Price</label>
                    <div className="col-md-4">
                        <input className="form-control" type="number" data-val="true" name="magazineprice" defaultValue={this.state.magData.magazineprice} required />


                    </div>
                </div >
                
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
                    </form >
                </Container >
            </Jumbotron >
        )
    }
}