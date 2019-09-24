import React, { Component } from "react";
import "regenerator-runtime/runtime";
import "core-js/stable";
import styles from "../styles/index.css";
import Invoice from "./Invoice";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unapprovedInvoices: [],
      invoiceNumbersToApprove: {}
    };
  }
  async componentDidMount() {
    const response = await fetch("/invoices/unapproved");
    const unapprovedInvoices = await response.json();
    console.log(unapprovedInvoices);
    this.setState({ unapprovedInvoices });
  }

  addToApproveList(event) {
    const invoiceNumber = event.target.dataset.invoice;
    const invoiceNumbersToApprove = { ...this.state.invoiceNumbersToApprove };
    if (event.target.checked) {
      invoiceNumbersToApprove[invoiceNumber] = true;
    } else {
      delete invoiceNumbersToApprove[invoiceNumber];
    }
    console.log(invoiceNumbersToApprove);
    this.setState({ invoiceNumbersToApprove });
  }

  render() {
    return (
      <>
        <h2>Unapproved Invoices</h2>
        <table>
          <tr>
            <th>Select</th>
            <th>Invoice Number</th>
            <th>Vendor Name</th>
            <th>Vendor Address</th>
            <th>Invoice Total</th>
            <th>Invoice Date</th>
            <th>Due Date</th>
            <th>Approve</th>
          </tr>
          {this.state.unapprovedInvoices.map(invoiceData => (
            <Invoice
              invoiceData={invoiceData}
              addToApproveList={this.addToApproveList.bind(this)}
            />
          ))}
        </table>
      </>
    );
  }
}

export default App;
//comment
