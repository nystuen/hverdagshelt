import React from 'react';
import { Col, Modal, Button } from 'react-bootstrap';

export class InfoModule extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      show: true
    };
    this.handleHide = this.handleHide.bind(this);
  }
  handleHide() {
    this.setState({ show: false });
  }

  render(){
    return(
      <Col>
        <Modal
          show={this.state.show}
          onHide={this.handleHide}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              Informasjon om poengssystemet
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Du får 10 poeng for hvert problem du varsler om som blir fullført.
            Disse poengene kan du bruke på gratis parkering i din kommune.
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Col>
    );
  }

}