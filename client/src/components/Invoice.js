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
  const addToApproveList = props.addToApproveList;
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          data-invoice={invoice_number}
          onChange={event => addToApproveList(event)}
        ></input>
      </td>
      <td>{invoice_number}</td>
      <td>{vendor_name}</td>
      <td>{remittance_address}</td>
      <td>{total}</td>
      <td>{invoice_date.split("T")[0]}</td>
      <td>{due_date.split("T")[0]}</td>
    </tr>
  );
}
