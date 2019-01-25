import React from "react";
import { Card, CardTitle, CardBody } from "reactstrap";

export default class GenericNotFound extends React.Component {
  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>
            <h1>Error 404</h1>
          </CardTitle>
          <h3>Página no encontrada</h3>
        </CardBody>
      </Card>
    );
  }
}
