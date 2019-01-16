import React, { Component } from "react";
import { connect } from "react-redux";
import Actions from "./context/catalog/actions";
import Catalog from "./context/catalog/components/Catalog";
import Cart from "./context/cart/components/Cart";
import {
  Container,
  Breadcrumb,
  BreadcrumbItem,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  Nav
} from "reactstrap";
import CATALOG from "./context/catalog/constants";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProductDetail from "./context/catalog/components/ProductDetail";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCartPlus, faEye } from "@fortawesome/free-solid-svg-icons";
import logo from "./logo.svg";
import CreateProduct from "./context/catalog/components/CreateProduct";
import CreateCategory from "./context/catalog/components/CreateCategory";

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
        <Container className="App">
          <Navbar light expand="md">
            <NavbarBrand href="/">
              <img src={logo} />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />

            <Nav className="ml-auto" navbar>
              <NavItem>
                <Cart />
              </NavItem>
            </Nav>
          </Navbar>
          <br />
          <NavigationMenu />
          <Route path="/" exact component={Catalog} />
          <Route path="/product/:id" component={ProductDetail} />
          <Route path="/catalog/product/create" component={CreateProduct} />
          <Route path="/catalog/category/create" component={CreateCategory} />
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
