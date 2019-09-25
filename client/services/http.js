import tryFetch from "../utils/tryFetch";
const apiRoot = "http://localhost:3000";

export default {
  invoices: {
    get: {
      unapproved() {
        return tryFetch(async () => {
          const response = await fetch(apiRoot + "/invoices/unapproved");
          const unapprovedInvoices = await response.json();
          return unapprovedInvoices;
        });
      }
    },
    approve(invoiceNumbers) {
      return tryFetch(async () => {
        const body = JSON.stringify({
          invoiceNumbers
        });
        const response = await fetch(apiRoot + "/invoices/approve", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body
        });
        const message = await response.json();
        return message;
      });
    },
    post: {
      fakeInvoices() {
        return tryFetch(async () => {
          const response = await fetch(apiRoot + "/invoices/seed", {
            method: "POST"
          });
          return response;
        });
      }
    }
  }
};
