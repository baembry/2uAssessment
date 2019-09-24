const tryCatch = require("../utils/tryCatch");
async function main() {
  const mysql = require("mysql");
  const Promise = require("bluebird");

  const connection = mysql.createConnection({
    host: "remotemysql.com",
    user: "W5FtsMXsvd",
    password: "plbWzQuknD",
    database: "W5FtsMXsvd"
  });

  Promise.promisifyAll(connection);

  connection.connect(error => {
    if (error) {
      console.error("Error connecting to database: ", error);
    } else {
      console.log("Connected to database");
    }
  });
  tryCatch(async () => {
    connection.queryAsync(`CREATE TABLE IF NOT EXISTS invoices (
            invoice_number INT NOT NULL PRIMARY KEY,
            total DOUBLE,
            currency VARCHAR(5),
            invoice_date DATE,
            due_date DATE,
            vendor_name VARCHAR(150),
            remittance_address VARCHAR(255),
            approved BOOLEAN DEFAULT 0
        )`);
  });

  module.exports = connection;
}

main();
