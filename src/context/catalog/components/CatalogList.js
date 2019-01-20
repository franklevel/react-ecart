import React from "react";
import { Card, CardBody, CardTitle, Button, Table, Col, Row } from "reactstrap";
import { connect } from "react-redux";
import CatalogActions from "../actions";
import CATALOG from "../constants";
import { Link } from "react-router-dom";
import { _displayPrice, truncate } from "../../../lib/helpers";

class CatalogList extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
  }

  handleRemoveProduct(e) {
    const id = parseInt(e.target.value);
    const { catalog } = this.props;
    const product =
      catalog && catalog.length > 0
        ? catalog.find(p => {
            return p.id === id;
          })
        : null;

    /*  const filtered = catalog.filter(p => {
      return p.id !== id;
    }); */
    alert(JSON.stringify(product));
    this.props.removeProduct(product);
  }

  render() {
    const { catalog } = this.props;
    return (
      <div>
        <Row>
          <Col sm={12}>
            <Link to="/catalog/product/create">
              <Button color="success">Crear producto</Button>{" "}
            </Link>
          </Col>
        </Row>
        <Card className="mt-3">
          <CardBody>
            <CardTitle>Catálogo de productos</CardTitle>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Existencia</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {catalog && catalog.length > 0
                  ? catalog.map((p, k) => {
                      return (
                        <tr key={k}>
                          <td>{p.id}</td>
                          <td>{p.name}</td>
                          <td>{truncate(p.description, 26)}</td>
                          <td>{_displayPrice(p.price)}</td>
                          <td>{p.stock}</td>
                          <td>
                            <Button
                              color="danger"
                              onClick={e => this.handleRemoveProduct(e)}
                              value={p.id}
                              size="sm"
                              outline
                            >
                              Eliminar
                            </Button>{" "}
                            <Button color="info" size="sm" outline>
                              Modificar
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
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
    createProduct: payload => dispatch(CatalogActions(CATALOG.ADD_PRODUCT)),
    removeProduct: payload =>
      dispatch(CatalogActions(CATALOG.REMOVE_PRODUCT, payload))
  };
};

export const CatalogListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CatalogList);

export default CatalogListContainer;
