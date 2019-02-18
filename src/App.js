import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
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
  Nav,
  Collapse,
  NavLink
} from "reactstrap";
import CATALOG from "./context/catalog/constants";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ProductDetail from "./context/catalog/components/ProductDetail";

import logo from "./logo.svg";
import CreateProduct from "./context/catalog/components/CreateProduct";
import CreateCategory from "./context/catalog/components/CreateCategory";
import CartSummary from "./context/cart/components/CartSummary";
import CatalogList from "./context/catalog/components/CatalogList";

import CreateColor from "./context/catalog/components/CreateColor";
import EditColor from "./context/catalog/components/EditColor";
import ColorList from "./context/catalog/components/ColorList";
import CreateUser from "./context/user/components/CreateUser";
import ListUser from "./context/user/components/ListUser";
import LoginUser from "./context/user/components/LoginUser";
import GenericNotFound from "./GenericNotFound";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faTshirt,
  faTag,
  faPalette,
  faUser,
  faShoppingCart,
  faShoppingBasket
} from "@fortawesome/free-solid-svg-icons";
import UserActions from "./context/user/actions";
import USER from "./context/user/constants";
// Iconografía
library.add([
  faTshirt,
  faPalette,
  faTag,
  faUser,
  faShoppingCart,
  faShoppingBasket
]);

const DepthMenu = props => {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="/#">Inicio</a>
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
};

const DashboardMenu = props => {
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Dashboard</NavbarBrand>
        <NavbarToggler onClick={props.toggle} />
        <Collapse isOpen={props.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/user/list">
                <FontAwesomeIcon icon="user" /> Usuarios
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/catalog/product/list">
                <FontAwesomeIcon icon="tshirt" /> Productos
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/order/list">
                <FontAwesomeIcon icon="shopping-cart" /> Pedidos
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/catalog/category/list">
                <FontAwesomeIcon icon="tag" /> Categorías
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/catalog/color/list">
                <FontAwesomeIcon icon="palette" /> Colores
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" onClick={props.logout}>
                Logout
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
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
        <div>
          {this.props.currentUser !== null ? (
            <DashboardMenu logout={this.props.logout} />
          ) : (
            <Navbar className="navbar-dark bg-dark" expand="md">
              <Container>
                <NavbarBrand href="/">
                  <img src={logo} alt="ReactStore" />
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <div>
                      <Cart />
                    </div>
                    <div>
                      <Link to="/user/login">Iniciar Sesión</Link>
                    </div>
                  </NavItem>
                </Nav>
              </Container>
            </Navbar>
          )}
          <Container className="mt-3">
            <DepthMenu />
          </Container>
          <Container className="App">
            <Switch>
              <Route path="/" exact component={Catalog} />
              <Route path="/product/:id" component={ProductDetail} />
              <Route path="/catalog/product/create" component={CreateProduct} />
              <Route
                path="/catalog/category/create"
                component={CreateCategory}
              />
              <Route path="/catalog/product/list" component={CatalogList} />
              <Route path="/catalog/color/create" component={CreateColor} />
              <Route path="/catalog/color/list" component={ColorList} />
              <Route path="/catalog/color/edit/:id" component={EditColor} />
              <Route path="/cart/summary" component={CartSummary} />
              {/* Rutas de Usuario */}
              <Route path="/user/login" component={LoginUser} />
              <Route path="/user/create" component={CreateUser} />
              {/* <Route path="/user/edit/:id" component={EditUser} />*/}
              <Route path="/user/list" component={ListUser} />
              <Route component={GenericNotFound} />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    catalog: state.catalogReducer.catalog,
    currentUser: state.userReducer.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createProduct: payload => dispatch(Actions(CATALOG.ADD_PRODUCT, payload)),
    logout: () => dispatch(UserActions(USER.LOGOUT_USER))
  };
};

export const MyAppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default MyAppContainer;
