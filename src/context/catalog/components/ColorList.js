import React from "react";
import { connect } from "react-redux";
import {
  Card,
  CardTitle,
  CardBody,
  Button,
  Table,
  Row,
  Col,
  Badge
} from "reactstrap";
import { Link } from "react-router-dom";
import CatalogActions from "../actions";
import CATALOG from "../constants";

class ColorList extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveColor = this.handleRemoveColor.bind(this);
  }

  handleRemoveColor(e) {
    const id = parseInt(e.target.value);
    const { colors } = this.props;
    const color = colors.find(item => {
      return item.id === id;
    });
    if (this.props.removeColor(color)) {
      alert("Se ha eliminado el color");
    }
  }

  render() {
    const { colors } = this.props;

    return (
      <Card>
        <CardBody>
          <CardTitle>
            <h3>Lista de colores</h3>
          </CardTitle>
          <Row>
            <Col>
              <Link to="/catalog/color/create">
                <Button color="primary">Crear color</Button>
              </Link>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Valor</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {colors && colors.length > 0
                    ? colors.map((c, k) => {
                        return (
                          <tr key={k}>
                            <td>{c.name}</td>
                            <td>
                              <Badge style={{ backgroundColor: c.value }}>
                                {c.value}
                              </Badge>
                            </td>
                            <td>
                              <Link to={`/catalog/color/edit/${c.id}`}>
                                <Button color="info" size="sm" outline>
                                  Editar
                                </Button>
                              </Link>
                              <Button
                                onClick={e => this.handleRemoveColor(e)}
                                value={c.id}
                                color="danger"
                                size="sm"
                                outline
                              >
                                Eliminar
                              </Button>
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </Table>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    colors: state.catalogReducer.colors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeColor: payload =>
      dispatch(CatalogActions(CATALOG.REMOVE_COLOR, payload))
  };
};

export const ColorListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorList);

export default ColorListContainer;
