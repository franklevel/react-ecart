import { db } from "../../../lib/db";

export const addProduct = product => {
  db.collection("/catalog").add(product);
};

export const getProducts = () => {
  return db.collection("/catalog").get();
};

export default addProduct;
