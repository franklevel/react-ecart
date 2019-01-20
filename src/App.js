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

import logo from "./logo.svg";
import CreateProduct from "./context/catalog/components/CreateProduct";
import CreateCategory from "./context/catalog/components/CreateCategory";
import CartSummary from "./context/cart/components/CartSummary";
import CatalogList from "./context/catalog/components/CatalogList";
import routes from "./lib/routes";
import CreateColor from "./context/catalog/components/CreateColor";
import EditColor from "./context/catalog/components/EditColor";
import ColorList from "./context/catalog/components/ColorList";

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
      <Router routes={routes}>
        <div>
          <Navbar className="navbar-dark bg-dark" expand="md">
            <Container>
              <NavbarBrand href="/">
                <img src={logo} />
              </NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Cart />
                </NavItem>
              </Nav>
            </Container>
          </Navbar>
          <Container className="mt-3">
            <NavigationMenu />
          </Container>
          <Container className="App">
            <Route path="/" exact component={Catalog} />
            <Route path="/product/:id" component={ProductDetail} />
            <Route path="/catalog/product/create" component={CreateProduct} />
            <Route path="/catalog/category/create" component={CreateCategory} />
            <Route path="/catalog/product/list" component={CatalogList} />
            <Route path="/catalog/color/create" component={CreateColor} />
            <Route path="/catalog/color/list" component={ColorList} />
            <Route path="/catalog/color/edit/:id" component={EditColor} />
            <Route path="/cart/summary" component={CartSummary} />
          </Container>
        </div>
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
