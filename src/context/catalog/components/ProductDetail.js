import React from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardTitle,
  CardBody,
  CardText,
  CardSubtitle,
  Button,
  Input,
  Label,
  Form,
  FormGroup
} from "reactstrap";
import CartActions from "../../cart/actions";
import CART from "../../cart/constants";

class ProductDetailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      quantity: 1
    };
    this._getProductById = this._getProductById.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleChangeQty = this.handleChangeQty.bind(this);
  }

  _getProductById(id) {
    if (!id || !this.props.catalog) return;
    const product = this.props.catalog.find(item => {
      return item.id === parseInt(id);
    });
    return product;
  }

  handleAddToCart(e) {
    const id = parseInt(e.target.value);
    const product = this.props.catalog.find(item => {
      return item.id === id;
    });

    let quantity = this.state.quantity ? this.state.quantity : 1;

    this.props.addToCart({ ...product, quantity: quantity });
  }

  handleChangeQty(e) {
    this.setState({ quantity: e.target.value });
  }

  render() {
    const id = this.props.match.params.id;
    //console.log(id);
    const product = this._getProductById(id);

    //console.log("Producto: ", product);

    return (
      <div>
        <Row>
          <Col sm={6}>
            <Card>
              <CardImg
                top
                width="100%"
                src={
                  product.image
                    ? product.image
                    : "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                }
              />
            </Card>
          </Col>
          <Col sm={6}>
            <Card>
              <CardBody>
                <CardTitle>
                  <h3>{product ? product.name : null}</h3>
                </CardTitle>
                <CardSubtitle className="text-muted">
                  {product.categories
                    ? product.categories.map((c, i) => {
                        return <span key={i}>{c.name}</span>;
                      })
                    : null}
                </CardSubtitle>
                <CardText>
                  {product.description ? product.description : null}
                </CardText>
                <Form>
                  <FormGroup>
                    <Col sm={3}>
                      <Label>Cantidad</Label>
                      <Input
                        type="number"
                        step={1}
                        min={1}
                        name="quantity"
                        placeholder="1"
                        onChange={this.handleChangeQty}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col sm={12}>
                      <Button
                        color="success"
                        value={product ? product.id : 0}
                        onClick={e => this.handleAddToCart(e)}
                        block
                      >
                        Agregar al carrito
                      </Button>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
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

export const ProductDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailView);

export default ProductDetail;
