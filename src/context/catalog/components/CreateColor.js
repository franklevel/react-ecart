import React from "react";
import { connect } from "react-redux";
import {
  Card,
  CardTitle,
  CardBody,
  Input,
  Button,
  Form,
  Label,
  FormGroup,
  Row,
  Col
} from "reactstrap";
import CatalogActions from "../actions";
import CATALOG from "../constants";
import { Link } from "react-router-dom";

class CreateColor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      value: undefined,
      isSubmitting: false,
      isDisabled: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      isSubmitting: true
    });
    const { name, value } = this.state;
    const id = new Date().getMilliseconds();
    if (this.props.createColor({ id: id, name: name, value: value })) {
      alert("Se ha creado el color correctamente");
    } else {
      alert("Ha fallado la creación del color, intente de nuevo.");
    }
  }

  handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    });

    if (
      this.state.name &&
      this.state.name.length > 3 &&
      (this.state.value && this.state.value.length > 3)
    ) {
      this.setState({
        isDisabled: false
      });
    } else {
      this.setState({
        isDisabled: true
      });
    }
  }

  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>
            <h3>Crear color</h3>
          </CardTitle>
          <Row>
            <Col>
              <Link to="/catalog/color/list">
                <Button color="primary">Lista de colores</Button>
              </Link>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label>Nombre</Label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    onChange={e => this.handleInput(e)}
                    value={this.state.name}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Valor</Label>
                  <Input
                    type="text"
                    name="value"
                    placeholder="Valor hexadecimal"
                    onChange={e => this.handleInput(e)}
                    value={this.state.value}
                  />
                </FormGroup>
                <FormGroup>
                  <Button color="success" disabled={this.state.isDisabled}>
                    Crear color
                  </Button>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    colors: state.catalogReducer.colors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createColor: payload => dispatch(CatalogActions(CATALOG.ADD_COLOR, payload))
  };
};

export const CreateColorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateColor);

export default CreateColorContainer;
