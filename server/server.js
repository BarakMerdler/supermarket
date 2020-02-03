const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const apiPort = 5000;

//!--- moudle ---!//
mongoose
  .connect(
    "mongodb+srv://admin:SAuxmwfFk49UhfmQ@supermarket-usj8z.mongodb.net/supermarket?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  )
  .then(() => console.log("DB Connected!"))
  .catch(e => {
    console.log("Connection error ", e.error);
  });
const db = mongoose.connection;
autoIncrement.initialize(mongoose.connection);
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected to DB");
});
//!--- Schema for products ---!
const schema = new mongoose.Schema({
  name: "String",
  company: "String",
  price: "Number",
  tags: "String",
  lastUpdate: {
    type: Date,
    default: Date.now
  }
});
schema.plugin(autoIncrement.plugin, "products");
const production = mongoose.model("products", schema);

//!--- schema for companys ---!
const schemaCompanys = new mongoose.Schema({
  name: "String",
  lastUpdate: {
    type: Date,
    default: Date.now
  }
});
schemaCompanys.plugin(autoIncrement.plugin, "companys");
const companys = mongoose.model("companys", schemaCompanys);

//!--- Schema for Departments ---!
const schemaDepartments = new mongoose.Schema({
  name: "String",
  lastUpdate: {
    type: Date,
    default: Date.now
  }
});
schemaDepartments.plugin(autoIncrement.plugin, "departments");
const departments = mongoose.model("departments", schemaDepartments);

//!--- Schema for Customers ---!
const schemaCustomers = new mongoose.Schema({
  first_name: "String",
  last_name: "String",
  email: "String",
  password: "String",
  lastUpdate: {
    type: Date,
    default: Date.now
  }
});
schemaCustomers.plugin(autoIncrement.plugin, "customers");
const customers = mongoose.model("customers", schemaCustomers);

//!--- Schema for Receipts ---!
const schemaReceipts = new mongoose.Schema({
  customersId: "Number",
  products: [{}],
  total: "Number",
  lastUpdate: {
    type: Date,
    default: Date.now
  }
});
schemaReceipts.plugin(autoIncrement.plugin, "receipts");
const receipts = mongoose.model("receipts", schemaReceipts);

//!--- middlewher ---!
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

//!--- routes ---!
app.get("/", (req, res) => {
  res.send("Hello Barak!");
});

//!--- ADD API ---!
app.post("/admin/add", (req, res) => {
  companys.findOne({ name: req.body.company }, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (!result) {
      const company = new companys({
        name: req.body.company
      });
      company.save().catch(err => console.log(err));
    }
  });
  departments.findOne({ name: req.body.tags }, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (!result) {
      const department = new departments({
        name: req.body.tags
      });
      department.save().catch(err => console.log(err));
    }
  });

  const product = new production({
    name: req.body.name,
    company: req.body.company,
    price: req.body.price,
    tags: req.body.tags
  });
  product.save(err => {
    if (err) return console.error(err);
    res.sendStatus(200);
  });
});

//!--- update API ---!
app.post("/admin/update", (req, res) => {
  production.updateOne(
    { _id: req.body._id },
    {
      name: req.body.name,
      company: req.body.company,
      price: req.body.price,
      tags: req.body.tags
    },
    function(err, res) {
      console.log(
        res.n,
        " - Number of documents matched",
        res.nModified,
        "- Number of documents modified"
      );
      res.sendStatus(200);
    }
  );
  res.sendStatus(200);
});

//!--- DELETE API ---!
app.post("/admin/delete", (req, res) => {
  production
    .deleteOne({ _id: req.body._id }, () => {
      console.log("removed");
    })
    .then(res.sendStatus(200))
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

//!--- GET all products API ---!
app.get("/products", (req, res) => {
  production
    .find({})
    .then(product => {
      res.send(product);
    })
    .catch(e => console.log(e));
});

//!--- GET all companys API ---!
app.get("/companys", (req, res) => {
  companys
    .find({})
    .then(company => {
      res.send(company);
    })
    .catch(e => console.log(e));
});

//!--- GET all departments API ---!
app.get("/departments", (req, res) => {
  departments
    .find({})
    .then(department => {
      res.send(department);
    })
    .catch(e => console.log(e));
});

//!--- ADD customers API ---!
app.post("/customers/add", (req, res) => {
  const customer = new customers({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password
  });
  customer.save(err => {
    if (err) return console.error(err);
    res.sendStatus(200);
  });
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
