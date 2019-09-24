const express = require("express");
const app = express();
const port = 3000;

const invoicesModel = require("./db/model/invoices");

//utils
const tryCatch = require("./utils/tryCatch");

//middleware
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.static("../dist"));

app.get("/invoices/all", async (req, res) => {
  tryCatch(async () => {
    const invoices = await invoicesModel.get.all();
    res.status(200).send(invoices);
  }, res);
});

app.get("/invoices/unapproved", async (req, res) => {
  tryCatch(async () => {
    const invoices = await invoicesModel.get.unapproved();
    res.status(200).send(invoices);
  });
});

app.post("/invoices", async (req, res) => {
  tryCatch(async () => {
    const invoice = req.body;
    console.log("The invoice", invoice);
    await invoicesModel.post.invoice(invoice);
    res.status(200).send({ message: "invoice submitted successfully" });
  }, res);
});

app.put("/invoices/approve", async (req, res) => {
  tryCatch(async () => {
    const invoiceNumbers = req.body.invoiceNumbers;
    await invoicesModel.put.approve(invoiceNumbers);
    res.status(200).send({ message: "Invoices Approved" });
  }, res);
});

app.listen(port, () => console.log(`2ULaundry listening on port ${port}!`));
