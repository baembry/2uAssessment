const db = require("../index");
const faker = require("faker");
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
      return result;
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
      return result;
    }
  },
  async seed() {
    let fakeInvoices = [];
    fakeInvoices.length = 5;
    fakeInvoices.fill({});
    fakeInvoices = fakeInvoices.map(_ => {
      const invoice = {
        invoice_number: faker.random.number(),
        total: faker.finance.amount(),
        currency: "USD",
        invoice_date: faker.date.recent(),
        due_date: faker.date.future(),
        vendor_name: faker.company.companyName(),
        remittance_address:
          faker.address.streetAddress() +
          " " +
          faker.address.city() +
          " " +
          faker.address.zipCode()
      };
      return this.post.invoice(invoice);
    });
    return await Promise.all(fakeInvoices);
  }
};
