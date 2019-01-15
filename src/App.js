import React, { Component } from "react";
import { connect } from "react-redux";
import Actions from "./context/catalog/actions";
import Catalog from "./context/catalog/components/Catalog";
import Cart from "./context/cart/components/Cart";
import {
  Container,
  Row,
  Col,
  Button,
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";
import CATALOG from "./context/catalog/constants";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProductDetail from "./context/catalog/components/ProductDetail";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCartPlus, faEye } from "@fortawesome/free-solid-svg-icons";

library.add([faPlus, faCartPlus, faEye]);

const NavigationMenu = props => {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="/#">Home</a>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <a href="/#/product">Producto</a>
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
};

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
      <Router>
        <Container className="App mt-5">
          <header>
            <Row>
              <Col md={6}>
                <Button color="success" onClick={this.createProduct}>
                  Crear producto <FontAwesomeIcon icon="plus" />
                </Button>
              </Col>
              <Col md={6}>
                <Cart />
              </Col>
            </Row>
          </header>
          <br />
          <NavigationMenu />
          <Route path="/" exact component={Catalog} />
          <Route path="/product/:id" component={ProductDetail} />
        </Container>
      </Router>
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
