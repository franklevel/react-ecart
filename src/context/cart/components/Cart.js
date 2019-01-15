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
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCartPlus,
  faEye,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import APP from "../../../lib/constants";

library.add([faPlus, faCartPlus, faEye, faTrashAlt]);

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
    const subtotal =
      o && o.length > 0
        ? Object.keys(o).reduce((total, obj) => {
            return (
              parseFloat(o[obj].price) * parseInt(o[obj].quantity) +
              parseFloat(total)
            );
          }, 0)
        : 0;
    const taxes = subtotal * APP.TAXES.IVA;
    const total = subtotal + taxes;

    return (
      <div align="right">
        <Button id="Popover1" type="button" outline color="secondary">
          Carrito:({this.props.cart.length}){" "}
          {total > 0 ? _displayPrice(total) : _displayPrice(0)}
        </Button>
        <Popover
          placement="bottom"
          isOpen={this.state.popoverOpen}
          target="Popover1"
          toggle={this.toggle}
        >
          <PopoverHeader>Carrito de Compras</PopoverHeader>
          <ListGroup className="list-group-flush">
            {this.props.cart && this.props.cart.length > 0
              ? this.props.cart.map((item, index) => (
                  <ListGroupItem key={index}>
                    {item.name}{" "}
                    <span className="text-muted">
                      {"x"}
                      {item.quantity}
                    </span>{" "}
                    {item.price * item.quantity > 0
                      ? _displayPrice(item.price * item.quantity)
                      : 0}{" "}
                    <Button
                      type="button"
                      value={item.id}
                      onClick={e => this.handleRemoveProduct(e)}
                      size="sm"
                      color="light"
                      className="float-right"
                    >
                      &times;
                    </Button>
                  </ListGroupItem>
                ))
              : null}

            <ListGroupItem>
              Sub-Total:
              <b className="float-right">
                {subtotal && subtotal !== 0
                  ? _displayPrice(subtotal)
                  : _displayPrice(0)}
              </b>
            </ListGroupItem>
            <ListGroupItem>
              IVA:
              <b className="float-right">
                {taxes && taxes !== 0 ? _displayPrice(taxes) : _displayPrice(0)}
              </b>
            </ListGroupItem>
            <ListGroupItem>
              Total:
              <b className="float-right">
                {total && total !== 0 ? _displayPrice(total) : _displayPrice(0)}
              </b>
            </ListGroupItem>
            <ListGroupItem>
              <Button color="primary">Confirmar pedido</Button>
            </ListGroupItem>
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
