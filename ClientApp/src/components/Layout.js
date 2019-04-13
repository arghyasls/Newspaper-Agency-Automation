import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  displayName = Layout.name

    render() {
        return (
            
           
                <Container>
                    
                <Row>
                    {this.props.children}
                    </Row>
            </Container>
       
    );
  }
}
