import React, { Component } from "react";
import { connect } from "react-redux";
import Actions from "./context/catalog/actions";
import Catalog from "./context/catalog/components/Catalog";
import Cart from "./context/cart/components/Cart";
import { Container, Row, Col, Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CATALOG from "./context/catalog/constants";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      catalog: []
    };
    this.createProduct = this.createProduct.bind(this);
  }

  createProduct() {
    const id = Math.floor(Math.random() * 1000);
    const name = prompt("Nombre del producto");
    const price = prompt("Precio del producto");
    const stock = prompt("Existencia inicial del producto");
    if (id && name && price && stock) {
      const productData = {
        id,
        name,
        price,
        stock
      };

      this.props.createProduct(productData);
    } else {
      alert("Uno o más de los datos suministrados no es válido");
    }
  }

  render() {
    return (
      <Container className="App mt-5">
        <header>
          <Row>
            <Col md={6}>
              <Button color="success" onClick={this.createProduct}>
                Crear producto
              </Button>
            </Col>
            <Col md={6}>
              <Cart />
            </Col>
          </Row>
        </header>
        <br />
        <Catalog />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    catalog: state.catalogReducer.catalog
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createProduct: payload => dispatch(Actions(CATALOG.ADD_PRODUCT, payload))
  };
};

export const MyAppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default MyAppContainer;
