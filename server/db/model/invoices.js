const db = require("../index");

module.exports = {
  post: {
    async invoice({
      invoice_number,
      total,
      currency,
      invoice_date,
      due_date,
      vendor_name,
      remittance_address
    }) {
      const queryString = `INSERT INTO invoices (invoice_number, total, currency, invoice_date, due_date, vendor_name, remittance_address) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      const result = await db.queryAsync(queryString, [
        invoice_number,
        total,
        currency,
        invoice_date,
        due_date,
        vendor_name,
        remittance_address
      ]);
      console.log(result);
    }
  },

  get: {
    async all() {
      const invoices = await db.queryAsync(`SELECT * FROM invoices`);
      return invoices;
    },
    async unapproved() {
      const unapprovedInvoices = await db.queryAsync(
        `SELECT * FROM invoices WHERE approved = 0`
      );
      return unapprovedInvoices;
    }
  },

  put: {
    async approve(invoice_numbers) {
      const invoiceNumbersString = `(${invoice_numbers.toString()})`;
      const queryString = `UPDATE invoices 
            SET approved = 1
            WHERE invoice_number IN ${invoiceNumbersString}`;
      const result = await db.queryAsync(queryString);
      console.log(result);
    }
  }
};
