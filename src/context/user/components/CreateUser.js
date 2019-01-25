import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  Label,
  FormGroup,
  Button,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import UserActions from "../actions";
import USER from "../constants";

class CreateUser extends React.Component {
  render() {
    const initialValues = { name: "", email: "" };
    return (
      <Card>
        <CardBody>
          <CardTitle>
            <h3>Crear usuario</h3>
          </CardTitle>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              if (
                this.props.createUser({
                  id: new Date().getUTCMilliseconds(),
                  name: values.name,
                  email: values.email
                })
              ) {
                alert("Se ha creado el usuario correctamente");
                this.props.history.push("/user/list");
              }
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Ingrese el nombre del usuario"),
              email: Yup.string()
                .email("Invalid email")
                .required("Ingrese la dirección de correo del usuario")
            })}
          >
            {props => {
              const {
                values,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset
              } = props;

              return (
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label>Nombre</Label>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Nombre de usuario"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    <ErrorMessage name="name">
                      {msg => <div className="text-danger">{msg}</div>}
                    </ErrorMessage>
                  </FormGroup>
                  <FormGroup>
                    <Label>Correo electrónico</Label>
                    <Input
                      type="text"
                      name="email"
                      placeholder="Dirección de correo electrónico"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    <ErrorMessage name="email">
                      {msg => <div className="text-danger">{msg}</div>}
                    </ErrorMessage>
                  </FormGroup>
                  <FormGroup>
                    <Button color="primary" disabled={isSubmitting}>
                      Crear usuario
                    </Button>
                    <Button color="default" onClick={handleReset} outline>
                      Limpiar
                    </Button>
                  </FormGroup>
                </Form>
              );
            }}
          </Formik>
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
    createUser: payload => dispatch(UserActions(USER.ADD_USER, payload))
  };
};

export const CreateUserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUser);

export default CreateUserContainer;
