import React from "react";

class Cart extends React.Component {
  render() {
    return (
      <div style={{ float: "right" }}>
        <b>Carrito:({this.props.items.length})</b>
      </div>
    );
  }
}

export default Cart;
