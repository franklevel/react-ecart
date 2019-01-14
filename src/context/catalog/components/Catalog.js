import React from "react";
import { connect } from "react-redux";
//import CATALOG from "../constants";
import CART from "../../cart/constants";
//import CatalogActions from "../actions";
import CartActions from "../../cart/actions";
import {
  Button,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText
} from "reactstrap";
import { Link } from "react-router-dom";

class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.state = {
      modal: false
    };
  }

  _displayPrice = price => {
    return Number.parseFloat(price).toFixed(2) + "$";
  };

  handleAddToCart(e) {
    const id = parseInt(e.target.value);
    const product = this.props.catalog.find(item => {
      return item.id === id;
    });

    this.props.addToCart({ ...product, quantity: 1 });
  }

  handleOnChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    console.log("Name: Value:", name, value);
  }

  render() {
    const productList =
      this.props.catalog && this.props.catalog.length > 0
        ? this.props.catalog.map((item, i) => {
            return (
              <Col key={i} md="4">
                <Card>
                  <CardImg
                    top
                    width="100%"
                    src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                    alt="Card image cap"
                  />
                  <CardBody>
                    <CardTitle>
                      <Link to={"/product/" + item.id}>{item.name}</Link>
                    </CardTitle>
                    <CardSubtitle>
                      Precio: {this._displayPrice(item.price)}
                    </CardSubtitle>
                    <CardText>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </CardText>

                    <Button
                      color="primary"
                      outline
                      onClick={this.handleAddToCart}
                      value={item.id}
                    >
                      Agregar al carrito
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            );
          })
        : null;
    return <Row>{this.props.catalog ? productList : null}</Row>;
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cartReducer.cart,
    catalog: state.catalogReducer.catalog
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: payload => dispatch(CartActions(CART.ADD_PRODUCT, payload))
  };
};

export const CatalogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Catalog);

export default CatalogContainer;
