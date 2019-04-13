import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { FetchEmployee } from './components/FetchEmployee';
import { AddEmployee } from './components/AddEmployee';
import { FetchCustomer } from './components/FetchCustomer';
import { AddCustomer } from './components/AddCustomer';
import { FetchMagazine } from './components/FetchMagazine';

import { AddMagazine } from './components/AddMagazine';
import { Login } from './components/Login';
import { LoginD } from './components/LoginD';
import { Register } from './components/Register';
import { Summary} from './components/Summary';
export default class App extends Component {
  displayName = App.name

  render() {
    return (
        <Layout>
            <Route exact path='/' component={Login} />
        <Route exact path='/home' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route path='/fetchemployee' component={FetchEmployee} />
            <Route path='/getsummary' component={Summary} />
            <Route path='/addemployee' component={AddEmployee} />
           
            <Route path='/employee/edit/:empid' component={AddEmployee} />  
            <Route path='/fetchcustomer' component={FetchCustomer} />
            <Route path='/addcustomer' component={AddCustomer} />

            <Route path='/customer/edit/:custid' component={AddCustomer} />  
            <Route path='/fetchmagazine' component={FetchMagazine} />
            <Route path='/addmagazine' component={AddMagazine} />
            <Route path='/logindelivery' component={LoginD} />
 
            <Route path='/magazine/edit/:magid' component={AddMagazine} />  

      </Layout>
    );
  }
}
