import React from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input, Label, FormGroup, Card, CardBody, Button } from "reactstrap";
import { connect } from "react-redux";
import CatalogActions from "../actions";
import CATALOG from "../constants";

class CreateCategory extends React.Component {
  render() {
    const rootCategories = [
      { id: 1, name: "Categoria uno" },
      { id: 2, name: "Categoria dos" },
      { id: 3, name: "Categoria tres" },
      { id: 4, name: "Categoria cuatro" }
    ];
    return (
      <Card>
        <CardBody>
          <Formik
            initialValues={{
              name: "",
              root: ""
            }}
            onSubmit={(values, { setSubmitting }) => {
              if (
                this.props.createCategory({
                  id: new Date().getUTCMilliseconds(),
                  name: values.name,
                  root: values.root
                })
              ) {
                alert("Se ha creado la categoría");
                setSubmitting(false);
              }
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Ingrese el nombre de la categoría")
            })}
          >
            {props => {
              const {
                values,
                touched,
                errors,
                dirty,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset
              } = props;
              return (
                <form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label>Nombre de la categoría</Label>
                    <Input
                      type="text"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    <ErrorMessage name="name" component="div" />
                  </FormGroup>
                  <FormGroup>
                    <Label>Categoría superior</Label>
                    <Input type="select" name="root">
                      [<option value="0">Seleccione:</option>
                      {rootCategories && rootCategories.length > 0
                        ? rootCategories.map((c, k) => {
                            return (
                              <option key={k} value={c.id}>
                                {c.name}
                              </option>
                            );
                          })
                        : null}
                      ];
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Button
                      type="submit"
                      color="success"
                      disabled={isSubmitting}
                    >
                      Crear categoría
                    </Button>
                  </FormGroup>
                </form>
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
    catalog: state.catalogReducer.catalog
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createCategory: payload =>
      dispatch(CatalogActions(CATALOG.ADD_CATEGORY, payload))
  };
};

export const CreateCategoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCategory);

export default CreateCategoryContainer;
