import React from "react";
import { connect } from "react-redux";
import {
  Form,
  Label,
  FormGroup,
  Input,
  Button,
  Card,
  CardBody,
  CardTitle
} from "reactstrap";
import CatalogActions from "../actions";
import CATALOG from "../constants";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

class EditColor extends React.Component {
  render() {
    const { colors } = this.props;
    const id = parseInt(this.props.match.params.id);
    const c = colors.find(item => {
      return item.id === id;
    });
    console.log(c);
    return (
      <Card>
        <CardBody>
          <CardTitle>
            <h3>Editar color</h3>
          </CardTitle>
          <Formik
            initialValues={{
              id: c ? c.id : "",
              name: c ? c.name : "",
              value: c ? c.value : ""
            }}
            onSubmit={(values, { setSubmitting }) => {
              if (
                this.props.editColor({
                  id: id,
                  name: values.name,
                  value: values.value
                })
              ) {
                this.props.history.push("/catalog/color/list");
              }
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Ingrese el nombre del color"),
              value: Yup.string().required(
                "Ingrese el valor de color en formato haxadecimal"
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
                  <FormGroup>
                    <Label>Nombre</Label>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Nombre del color"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    <ErrorMessage name="name" component="div" />
                  </FormGroup>
                  <FormGroup>
                    <Label>Valor</Label>
                    <Input
                      type="text"
                      name="value"
                      placeholder="Valor hexadecimal del color"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.value}
                    />
                    <ErrorMessage name="value" component="div" />
                  </FormGroup>
                  <FormGroup>
                    <Button
                      type="submit"
                      color="primary"
                      disabled={isSubmitting}
                    >
                      Actualizar
                    </Button>
                    <Button
                      color="default"
                      onClick={() => {
                        this.props.history.goBack();
                      }}
                      outline
                    >
                      Cancelar
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
    colors: state.catalogReducer.colors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editColor: payload => dispatch(CatalogActions(CATALOG.EDIT_COLOR, payload))
  };
};

export const EditColorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditColor);

export default EditColorContainer;
