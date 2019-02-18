import React from "react";
import { connect } from "react-redux";
import {
  Card,
  CardTitle,
  CardBody,
  FormGroup,
  Button,
  Label,
  Input,
  Col
} from "reactstrap";
import { Formik, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import UserActions from "../actions";
import USER from "../constants";

class LoginUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginText: "Acceder"
    };
  }
  render() {
    return (
      <Col
        sm={6}
        md={6}
        style={{
          margin: "0 auto",
          float: "none",
          marginBottom: "10px"
        }}
      >
        <Card>
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
              if (
                this.props.login({
                  username: values.username,
                  password: values.password
                })
              ) {
                this.props.history.push("/user/list");
              }
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().required("Ingrese el nombre del usuario"),
              password: Yup.string().required(
                "Ingrese la contraseña de usuario"
              )
            })}
          >
            {props => {
              const {
                values,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit
              } = props;

              return (
                <Form onSubmit={handleSubmit}>
                  <CardBody>
                    <CardTitle>
                      <h3>Login</h3>
                      <FormGroup>
                        <Label>Usuario</Label>
                        <Input
                          type="text"
                          name="username"
                          placeholder="Nombre de usuario"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.username}
                        />
                        <ErrorMessage name="username">
                          {msg => <div className="text-danger">{msg}</div>}
                        </ErrorMessage>
                      </FormGroup>
                      <FormGroup>
                        <Label>Contraseña</Label>
                        <Input
                          type="password"
                          name="password"
                          placeholder="Contraseña de usuario"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                        />
                        <ErrorMessage name="password">
                          {msg => <div className="text-danger">{msg}</div>}
                        </ErrorMessage>
                      </FormGroup>
                      <FormGroup>
                        <Button color="primary" disabled={isSubmitting}>
                          {this.state.loginText}
                        </Button>
                      </FormGroup>
                    </CardTitle>
                  </CardBody>
                </Form>
              );
            }}
          </Formik>
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.userReducer.currentUser
  };
};

const mapDispatchToProps = dispatach => {
  return {
    login: payload => dispatach(UserActions(USER.LOGIN_USER, payload))
  };
};

export const LoginUserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginUser);

export default LoginUserContainer;
