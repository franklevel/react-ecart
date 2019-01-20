import CatalogContainer from "../context/catalog/components/Catalog";
import CreateProductContainer from "../context/catalog/components/CreateProduct";

const routes = [
  {
    path: "/",
    component: CatalogContainer,
    name: "Catálogo"
  },
  {
    path: "/catalog/product/create",
    name: "Crear producto",
    component: CreateProductContainer
  }
];

export default routes;
