import { Grid, Row, Col, PageHeader, Button } from "react-bootstrap";
import { Component } from "react";
import * as React from "react";
import { history } from "../../../index";

export class CreateAdminsOrEmployees extends Component<Props, State> {
  render() {
    return (
      <Grid>
        <Col md={3} />
        <Col md={6}>
          <Col md={12}>
            <PageHeader>
              Velg brukertype
              <small>
                <p>
                  Et passord vil bli tilsendt på mail til brukeren du oppretter
                </p>
              </small>
            </PageHeader>
          </Col>
          <Col md={12} />
          <Col md={12}>
            <Button type="button" onClick={this.goToRegisterAdmin}>
              Lag ny admin
            </Button>
            <Button type="button" onClick={this.goToRegisterEmployee}>
              Lag ny kommuneansatt
            </Button>
          </Col>
        </Col>
        <Col md={3} />
      </Grid>
    );
  }
  goToRegisterAdmin = () => {
    history.push("/registrer/admin");
  };
  goToRegisterEmployee = () => {
    history.push("/registrer/kommuneansatt");
  };
}
