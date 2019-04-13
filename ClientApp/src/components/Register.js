import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            username: '',
            password: '',
            name: '',
            email: '',
            redirectToReferrer: false,
            redirectToLogin: false
        };
        
        this.onChange = this.onChange.bind(this);

        this.register = this.register.bind(this);
        
    }


   
    register(event) {
        event.preventDefault();
        const data = new FormData(event.target);
       
        fetch('api/User/Create', {

            method: 'POST',
            body: data,
        }).then((response) => response.json())
            .then((responseJson) => {

                this.setState({ redirectToLogin: true });
            })



        //sessionStorage.setItem('userData',JSON.stringify(responseJson));
        //
        //}
        //});
    }



    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/");
    }
    
    render() {


        
        if (this.state.redirectToLogin) {
            return (<Redirect to={'/'} />)
        }




        return (


            <form onSubmit={this.register} >
                <div className="form-group row" >
                    <input type="hidden" name="id" value={this.state.id} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.name} required />
                    </div>
                </div >
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="username">User Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="username" defaultValue={this.state.username} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="password">Password</label>
                    <div className="col-md-4">
                        <input className="form-control" data-val="true" name="password" defaultValue={this.state.password} required />

                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="email" >Email</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="email" defaultValue={this.state.email} required />
                    </div>
                </div>


                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    
                </div >
                <a href="/">Back to Homepage </a>
            </form >

     
        );
    }
}
export default Register;
