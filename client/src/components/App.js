import React, { Component } from "react";
import "regenerator-runtime/runtime";
import "core-js/stable";

//import styles for webpack bundler
import styles from "../styles/index.css";

import http from "../../services/http";
import io from "socket.io-client";
const socket = io();

import Invoice from "./Invoice";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unapprovedInvoices: [],
      invoiceNumbersToApprove: {}
    };
    socket.on("updateUnapprovedInvoices", () => {
      this.getUnapprovedInvoices();
    });
  }
  componentDidMount() {
    this.getUnapprovedInvoices();
  }

  async getUnapprovedInvoices() {
    const unapprovedInvoices = await http.invoices.get.unapproved();
    console.log("unapprovedInvoices ", unapprovedInvoices);
    this.setState({ unapprovedInvoices });
  }

  toggleSelectInvoice(invoiceNumber) {
    const invoiceNumbersToApprove = { ...this.state.invoiceNumbersToApprove };
    if (invoiceNumbersToApprove[invoiceNumber]) {
      delete invoiceNumbersToApprove[invoiceNumber];
    } else {
      invoiceNumbersToApprove[invoiceNumber] = true;
    }
    this.setState({ invoiceNumbersToApprove });
  }

  async approveInvoices() {
    let invoices = { ...this.state.invoiceNumbersToApprove };
    invoices = Object.keys(invoices);
    await http.invoices.approve(invoices);
    await this.getUnapprovedInvoices();
  }

  async makeInvoices() {
    const response = await http.invoices.post.fakeInvoices();
  }

  render() {
    return (
      <>
        <h2>{this.state.unapprovedInvoices.length} Unapproved Invoices</h2>
        <table>
          <tr>
            <th>Invoice Number</th>
            <th>Vendor Name</th>
            <th>Vendor Address</th>
            <th>Invoice Total</th>
            <th>Invoice Date</th>
            <th>Due Date</th>
          </tr>
          {this.state.unapprovedInvoices.map(invoiceData => (
            <Invoice
              key={Math.random()}
              invoiceData={invoiceData}
              toggleSelectInvoice={this.toggleSelectInvoice.bind(this)}
              selected={
                this.state.invoiceNumbersToApprove[invoiceData.invoice_number]
              }
            />
          ))}
        </table>
        <button onClick={this.approveInvoices.bind(this)}>
          Approve Selected Invoices
        </button>
        <button onClick={this.makeInvoices.bind(this)}>
          Make 5 Fake Invoices
        </button>
      </>
    );
  }
}

export default App;
//comment
