import React from "react";
import { connect } from "react-redux";
import { Card, CardTitle, CardBody, Table, Button, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import USER from "../constants";
import UserActions from "../actions";

class ListUser extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveUser = this.handleRemoveUser.bind(this);
  }

  handleRemoveUser(e) {
    const id = parseInt(e.target.value);
    const user = this.props.users.find(item => {
      return item.id === id;
    });
    this.props.removeUser(user);
  }

  render() {
    const { users } = this.props;
    return (
      <Card>
        <CardBody>
          <CardTitle>
            <h3>Lista de usuarios</h3>
          </CardTitle>
          <Row>
            <Col>
              <Link to="/user/create">
                <Button color="primary">Crear usuario</Button>
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
                    <th>E-mail</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {users && users.length > 0
                    ? users.map((u, k) => {
                        return (
                          <tr key={k}>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>
                              <Link to={`/user/edit/${u.id}`}>
                                <Button size="sm" color="info" outline>
                                  Editar
                                </Button>
                              </Link>{" "}
                              <Button
                                color="danger"
                                size="sm"
                                onClick={e => this.handleRemoveUser(e)}
                                value={u.id}
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
    users: state.userReducer.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeUser: payload => dispatch(UserActions(USER.REMOVE_USER, payload))
  };
};

export const ListUserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListUser);

export default ListUserContainer;
