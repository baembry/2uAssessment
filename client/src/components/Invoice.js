import React from "react";

export default function Invoice(props) {
  const {
    invoice_number,
    total,
    invoice_date,
    due_date,
    vendor_name,
    remittance_address
  } = props.invoiceData;
  const { toggleSelectInvoice, selected } = props;
  const classes = ["invoice", selected ? "selected" : null];
  return (
    <tr
      className={classes.join(" ")}
      onClick={() => {
        toggleSelectInvoice(invoice_number);
      }}
    >
      <td>{invoice_number}</td>
      <td>{vendor_name}</td>
      <td>{remittance_address}</td>
      <td>{total}</td>
      <td>{invoice_date.split("T")[0]}</td>
      <td>{due_date.split("T")[0]}</td>
    </tr>
  );
}
