const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
var http = require("http").createServer(app);
var io = require("socket.io")(http);

const port = process.env.PORT || 3000;

const invoicesModel = require("./db/model/invoices");

//utils
const tryCatch = require("./utils/tryCatch");

//middleware
const bodyParser = require("body-parser");

//for development only
const corsOptions = {
  origin: "http://127.0.0.1:3030",
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname + "/../dist")));

io.on("connection", function(socket) {
  console.log("a user connected");
});

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
    console.log("Posting invoice... ", invoice);
    await invoicesModel.post.invoice(invoice);
    res.status(200).send({ message: "invoice submitted successfully" });
    io.emit("updateUnapprovedInvoices");
  }, res);
});

app.post("/invoices/seed", async (req, res) => {
  tryCatch(async () => {
    await invoicesModel.seed();
    res.status(200).send({ message: "10 invoices seeded" });
    io.emit("updateUnapprovedInvoices");
  }, res);
});

app.put("/invoices/approve", async (req, res) => {
  tryCatch(async () => {
    const invoiceNumbers = req.body.invoiceNumbers;
    if (invoiceNumbers.length === 0) {
      res.status(400).send({ message: "Select some invoices to approve" });
      return;
    }
    await invoicesModel.put.approve(invoiceNumbers);
    res.status(200).send({ message: "Invoices Approved" });
  }, res);
});

http.listen(port, () => console.log(`2ULaundry listening on port ${port}!`));
