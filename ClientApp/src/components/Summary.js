import React, { Component } from 'react';
import { NavMenu } from './NavMenu';
import { Link, NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import * as jsPDF from 'jspdf'
export class Summary extends Component {
    displayName = Summary.name

    constructor(props) {
        super(props);
        this.state = { data: [], loading: true ,date:""};

        this.handlechange = this.handlechange.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    formatDate(timestamp) {
        var x = new Date(timestamp);
        var dd = x.getDate();
        var mm = x.getMonth() + 1;
        var yy = x.getFullYear();
        return dd + "-" + mm + "-" + yy;
    }
    handlechange = () => {
        var id = this.formatDate(this.state.date);
        fetch('/api/Customer/Summary/' + id, {
            method: 'GET',
            headers:
                { "Content-Type": "text" }

        }
        )
            .then(response => response.text())
            .then(data => {
                
                var doc = new jsPDF();

                doc.text(data, 10, 10);
                doc.save(id + '_Summary.pdf');
            });
    }
  
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
       

       

        return (
            <div>
                <div>
                    <input type="date" name="date" onChange={this.onChange}/>


                    <input type="submit" value="Submit" onClick={this.handlechange}/>
                
                    </div>
               <a href="/fetchcustomer"> Return to Customer Management</a>
                </div>)
    }
}


