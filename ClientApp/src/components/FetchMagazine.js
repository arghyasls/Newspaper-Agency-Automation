import React, { Component } from 'react';
import { NavMenu } from './NavMenu';
import { Link, NavLink } from 'react-router-dom';
import { Jumbotron, Container } from 'reactstrap';
import { Button } from 'reactstrap';
export class FetchMagazine extends Component {
    displayName = FetchMagazine.name

    constructor(props) {
        super(props);
        this.state = { info: [], loading: true };

        fetch('api/Magazine/Index')
            .then(response => response.json())
            .then(data => {
                this.setState({ info: data, loading: false });
            });

    }
    handleDelete(id, e) {
        {
            {

                console.log('Parameter', id);
                if (!window.confirm("Do you want to delete magazine with Id: " + id))
                    return;
                else {
                    fetch('api/Magazine/Delete/' + id, {
                        method: 'delete'
                    }).then(data => {
                        this.setState(
                            {
                                info: this.state.info.filter((rec) => {
                                    return (rec.magazined !== id);
                                })
                            });
                    });
                }
            }
        }
    }


    handleEdit(id, e) {
        {

            this.props.history.push("/magazine/edit/" + id);
        }
    }


    renderForecastsTable(info) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th></th>
                        <th>MagazineId</th>
                        <th>Name</th>
                        <th>Price (Rs) </th>
                      
                    </tr>
                </thead>
                <tbody>
                    {info.map(mag =>
                        <tr key={mag.magazineId}>
                            <td></td>
                            <td>{mag.magazineId}</td>
                            <td>{mag.magazineName}</td>
                            <td>{mag.magazinePrice}</td>
                           
                            <td>
                                <Button color="warning" onClick={(e) => this.handleEdit(mag.magazineId, e)}>Edit</Button>{' '}
                                <Button color="danger" onClick={(e) => this.handleDelete(mag.magazineId, e)}>Delete</Button>{' '}

                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderForecastsTable(this.state.info);

        return (

            <div>
                <NavMenu></NavMenu>
                <Jumbotron fluid>
                    <Container fluid>
                        <h1 className="display-3">Magazines</h1>

                <p>
                    <Link to="/addmagazine">Create New</Link>
                </p>
                        {contents}
                    </Container>
                </Jumbotron>

            </div>);
    }
}

export class MagazineData {
    magazineId = 0;
    magazinename = "";
    magazineprice = 0.0;
   
}
