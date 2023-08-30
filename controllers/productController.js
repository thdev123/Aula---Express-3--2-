const ProductController = {
  createProduct: (req, res) => {
    console.log("ENTREI AQUI!");
    res.status(201).send("createProduct");
  },
  getAllProducts: (req, res) => {
    console.log("ENTREI AQUI!");
    res.status(201).send("getAllProducts");
  },
  updateProduct: (req, res) => {
    console.log("ENTREI AQUI!");
    res.status(201).send("updateProduct");
  },
  deleteProduct: (req, res) => {
    console.log("ENTREI AQUI!");
    res.status(201).send("deleteProduct");
  },
  getProduct: (req, res) => {
    console.log("ENTREI AQUI!");
    res.status(201).send("getProduct");
  },
};

export default ProductController;
