import React from "react";
import { connect } from "react-redux";
import {
  Form,
  FormGroup,
  Input,
  Button,
  Label,
  Card,
  CardBody,
  Row,
  Col
} from "reactstrap";
import CatalogActions from "../actions";
import CATALOG from "../constants";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

class CreateProduct extends React.Component {
  render() {
    const { categories } = this.props;
    return (
      <Card>
        <CardBody>
          <Formik
            initialValues={{
              name: "",
              description: "",
              categories: "",
              image: "",
              price: 0,
              stock: 0
            }}
            onSubmit={(values, { setSubmitting }) => {
              if (
                this.props.createProduct({
                  id: new Date().getUTCMilliseconds(),
                  name: values.name,
                  description: values.description,
                  categories: values.categories,
                  image: values.image,
                  price: values.price,
                  stock: values.stock
                })
              ) {
                alert("Se ha creado el propducto");
              }
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Ingrese el nombre del producto"),
              description: Yup.string().required("Ingrese una descripción")
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
                    <Label>Nombre del producto</Label>
                    <Input
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.name && touched.name
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    <ErrorMessage name="name" component="div" />
                  </FormGroup>
                  <FormGroup>
                    <Label>Descripción</Label>
                    <Input
                      type="textarea"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.description && touched.description
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    <ErrorMessage name="description" component="div" />
                  </FormGroup>
                  <FormGroup>
                    <Label>Categoría(s)</Label>
                    <Input type="select" name="categories">
                      [<option value="0">Seleccione:</option>
                      {categories && categories.length > 0
                        ? categories.map((c, k) => {
                            return (
                              <option key={k} value={c.id}>
                                {c.name}
                              </option>
                            );
                          })
                        : null}
                      ];
                    </Input>
                    <ErrorMessage name="categories" component="div" />
                  </FormGroup>
                  <FormGroup>
                    <Label>Imagen del producto (URL)</Label>
                    <Input
                      type="text"
                      name="image"
                      value={values.image}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.image && touched.image
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    <ErrorMessage name="image" component="div" />
                  </FormGroup>
                  <FormGroup>
                    <Label>Precio</Label>
                    <Input
                      type="text"
                      name="price"
                      value={values.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage name="price" component="div" />
                  </FormGroup>
                  <FormGroup>
                    <Label>Existencia</Label>
                    <Input
                      type="number"
                      name="stock"
                      value={values.stock}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage name="stock" component="div" />
                  </FormGroup>
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={isSubmitting}
                  >
                    Crear producto
                  </button>
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
    cart: state.cartReducer.cart,
    catalog: state.catalogReducer.catalog,
    categories: state.catalogReducer.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createProduct: payload =>
      dispatch(CatalogActions(CATALOG.ADD_PRODUCT, payload))
  };
};

export const CreateProductContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProduct);

export default CreateProductContainer;
