import React from "react";
import { connect } from "react-redux";
import { Card, CardBody, CardTitle, Table, Input, Col } from "reactstrap";
import CartActions from "../actions";
import CART from "../constants";
import { _displayPrice } from "../../../lib/helpers";
import APP from "../../../lib/constants";

class CartSummary extends React.Component {
  render() {
    const { cart } = this.props;
    const subtotal =
      cart && cart.length > 0
        ? Object.keys(cart).reduce((total, obj) => {
            return (
              parseFloat(cart[obj].price) * parseInt(cart[obj].quantity) +
              parseFloat(total)
            );
          }, 0)
        : 0;
    const taxes = subtotal * APP.TAXES.IVA;
    const total = subtotal + taxes;
    return (
      <Card>
        <CardBody>
          <CardTitle>
            <h3>Carrito de compras</h3>
          </CardTitle>
          <Table>
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Monto</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {cart && cart.length > 0
                ? cart.map((p, k) => {
                    return (
                      <tr key={k}>
                        <td>{p.id}</td>
                        <td>
                          {p.name}
                          <br />
                          <span className="text-muted">{p.description}</span>
                        </td>
                        <td>
                          <Col sm={4}>
                            <Input
                              type="number"
                              min={1}
                              value={p.quantity}
                              name="quantity"
                            />
                          </Col>
                        </td>
                        <td>
                          <span className="float-right">
                            {_displayPrice(p.quantity * p.price)}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2} />
                <td>Sub-Total</td>
                <td>
                  <span className="float-right">
                    {subtotal && subtotal > 0
                      ? _displayPrice(subtotal)
                      : _displayPrice(0)}
                  </span>
                </td>
              </tr>
              <tr>
                <td colSpan={2} />
                <td>IVA</td>
                <td>
                  <span className="float-right">
                    {taxes && taxes > 0
                      ? _displayPrice(taxes)
                      : _displayPrice(0)}
                  </span>
                </td>
              </tr>
              <tr>
                <td colSpan={2} />
                <td>Total</td>
                <td>
                  <span className="float-right">
                    {total && total > 0
                      ? _displayPrice(total)
                      : _displayPrice(0)}
                  </span>
                </td>
              </tr>
            </tfoot>
          </Table>
        </CardBody>
      </Card>
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

export const CartSummaryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CartSummary);

export default CartSummaryContainer;
