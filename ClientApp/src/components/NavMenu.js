import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { Row, Col, Container } from 'reactstrap';
export class NavMenu extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                
                <Container>
                    <Col sm="12" md={{ size: 12, offset: 12}}><ul>
                        <li><a href="/fetchemployee">Delivery Person</a></li><li><a href="/fetchcustomer">Customer</a></li><li><a href="/fetchmagazine">Magazine</a></li><li><a href="/logindelivery">Deliveries Today</a></li><li><a href="/home">Logout</a></li>
                        </ul></Col>
                
                    </Container>
             
                {/*  <Navbar color="light" light expand="md">
                <NavbarBrand href="/">reactstrap</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  

               
                   
                        <Nav className="ml-auto" navbar>
                           
                            <NavItem>
                                <NavLink href="/fetchemployee">Delivery Person</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/fetchcustomer">Customer</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/fetchmagazine">Magazine</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/">Logout</NavLink>
                            </NavItem>
                   
                        </Nav>
                    </Collapse>
               
                </Navbar>*/}
            </div>
        );
    }
}