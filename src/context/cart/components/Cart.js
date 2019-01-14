import React from "react";
import {
  Button,
  Popover,
  PopoverHeader,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import { connect } from "react-redux";
import { _displayPrice } from "../../../lib/helpers";
import CartActions from "../actions";
import CART from "../constants";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  handleRemoveProduct(e) {
    const id = parseInt(e.target.value);
    const cart = this.props.cart.filter(p => {
      return p.id !== id;
    });

    this.props.removeFromCart(cart);
  }

  render() {
    const o = this.props.cart;
    const total =
      o && o.length > 0
        ? Object.keys(o).reduce((total, obj) => {
            return parseFloat(o[obj].price) + parseFloat(total);
          }, 0)
        : 0;
    console.log("Total: ", total);
    return (
      <div align="right">
        <Button id="Popover1" type="button" outline color="secondary">
          Carrito:({this.props.cart.length}) {_displayPrice(total)}
        </Button>
        <Popover
          placement="bottom"
          isOpen={this.state.popoverOpen}
          target="Popover1"
          toggle={this.toggle}
        >
          <PopoverHeader>Carrito de Compras</PopoverHeader>

          <ListGroup>
            {this.props.cart && this.props.cart.length > 0
              ? this.props.cart.map((item, index) => (
                  <ListGroupItem key={index}>
                    {item.name} {"x"}
                    {item.quantity} {_displayPrice(item.price * item.quantity)}{" "}
                    <Button
                      type="button"
                      value={item.id}
                      onClick={e => this.handleRemoveProduct(e)}
                      outline
                    >
                      &times;
                    </Button>
                  </ListGroupItem>
                ))
              : null}

            <ListGroupItem>Total:{_displayPrice(total)}</ListGroupItem>
          </ListGroup>
        </Popover>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cartReducer.cart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: payload =>
      dispatch(CartActions(CART.REMOVE_PRODUCT, payload))
  };
};

export const CartContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);

export default CartContainer;
