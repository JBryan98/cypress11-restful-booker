import {
  Given,
  When,
  Then,
  DataTable,
} from "@badeball/cypress-cucumber-preprocessor";
import { Booking, BookingResponse, GetBookingByIdResponse } from "../../interfaces/CreateBooking.interface";
import { Auth, AuthResponse } from "../../interfaces/Auth.interface";

let token = "";
let bookingid = 0;

Given("User registered on the API", () => {});

When(
  "I access the API request endpoint to create token",
  (datatable: DataTable) => {
    const url = `${Cypress.env("URL")}/auth`;
    datatable.hashes().forEach((row) => {
      const user: Auth = {
        username: row.username,
        password: row.password,
      };
      cy.request({
        method: "POST",
        url: url,
        headers: {
          "Content-Type": "application/json",
        },
        body: user,
      }).as("endpoint");
    });
  }
);

Then("Verify the response status code {int}", (statusCode: number) => {
  cy.get<AuthResponse>("@endpoint").then((response) => {
    expect(response.status).to.equal(statusCode);
  });
});

Then("Verify the token contains {int} characters", (tokenLength: number) => {
  cy.get<AuthResponse>("@endpoint").then((response) => {
    token = response.body.token;
    expect(token.length).to.equal(tokenLength);
  });
});

Then("Verify the token contains only alphanumeric characters", () => {
  cy.get("@endpoint").then(() => {
    expect(token.includes("^[a-zA-Z0-9]*$")).to.equal(false);
  });
});

Given("The access API request endpoint", () => {});

When("I access the API request endpoint to get all the booking ids", () => {
  const url = `${Cypress.env("URL")}/booking`;
  cy.request({
    method: "GET",
    url: url,
    headers: {
      "Content-type": "application/json",
    },
  }).as("endpoint");
});

When(
  "I acces the API request endpoint to get all the booking ids filtered by name",
  (datatable: DataTable) => {
    const url = `${Cypress.env("URL")}/booking`;
    datatable.hashes().forEach((row) => {
      cy.request({
        method: "GET",
        url: url,
        headers: {
          "Content-type": "application/json",
        },
        qs: {
          firstname: row.firstname,
          lastname: row.lastname,
        },
      }).as("endpoint");
    });
  }
);

When(
  "I access the API request endpoint to get all the booking ids filtered by bookingdates",
  (datatable: DataTable) => {
    const url = `${Cypress.env("URL")}/booking`;
    datatable.hashes().forEach((row) => {
      cy.request({
        method: "GET",
        url: url,
        headers: {
          "Content-type": "application/json",
        },
        qs: {
          checkin: row.checkin,
          checkout: row.checkout,
        },
      }).as("endpoint");
    });
  }
);

Given("Booking not registered on the API", () => {});

When(
  "I access the API request endpoint to create a new booking",
  (datatable: DataTable) => {
    const url = `${Cypress.env("URL")}/booking`;
    datatable.hashes().forEach((row) => {
      const booking: Booking = {
        firstname: row.firstname,
        lastname: row.lastname,
        totalprice: Number(row.totalprice),
        depositpaid: Boolean(row.depositpaid),
        bookingdates: {
          checkin: row.checkin,
          checkout: row.checkout,
        },
        additionalneeds: row.additionalneeds,
      };
      cy.request({
        method: "POST",
        url: url,
        headers: {
          "Content-type": "application/json",
        },
        body: booking,
      }).as("endpoint");
    });
  }
);

Then("Verify the response body contains the bookingid", () => {
  cy.get<BookingResponse>("@endpoint").then((response) => {
    cy.log(JSON.stringify(response));
    bookingid = response.body.bookingid;
    expect(bookingid).to.exist;
  });
});

Given("Booking registered on the API", () => {});

When("I access the API request endpoint to get a single booking", () => {
  const url = `${Cypress.env("URL")}/booking/${bookingid}`;
  cy.request({
    method: "GET",
    url: url,
    headers: {
      "Content-type": "application/json",
    },
  }).as("endpoint");
});

Then("Verify if the booking found is the right one", (datatable: DataTable) => {
  cy.get<GetBookingByIdResponse>("@endpoint").then((response) => {
    cy.log(JSON.stringify(response))
    datatable.hashes().forEach((row) => {
      expect(row.firstname).to.equal(response.body.firstname);
      expect(row.lastname).to.equal(response.body.lastname);
      expect(Number(row.totalprice)).to.equal(response.body.totalprice);
      expect(Boolean(row.depositpaid)).to.equal(response.body.depositpaid);
      expect(row.checkin).to.equal(response.body.bookingdates.checkin);
      expect(row.checkout).to.equal(response.body.bookingdates.checkout);
      expect(row.additionalneeds).to.equal(response.body.additionalneeds);
    });
  });
});

When(
  "I access the API request endpoint to update a booking",
  (datatable: DataTable) => {
    const url = `${Cypress.env("URL")}/booking/${bookingid}`;
    datatable.hashes().forEach((row) => {
      const booking: Booking = {
        firstname: row.firstname,
        lastname: row.lastname,
        totalprice: Number(row.totalprice),
        depositpaid: Boolean(row.depositpaid),
        bookingdates: {
          checkin: row.checkin,
          checkout: row.checkout,
        },
        additionalneeds: row.additionalneeds,
      };
      cy.request({
        method: "PUT",
        url: url,
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Cookie: `token=${token}`,
        },
        body: booking,
      }).as("endpoint");
    });
  }
);

When(
  "I access the API request endpoint to partial update a booking",
  (datatable: DataTable) => {
    const url = `${Cypress.env("URL")}/booking/${bookingid}`;
    datatable.hashes().forEach((row) => {
      cy.request({
        method: "PATCH",
        url: url,
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Cookie: `token=${token}`,
        },
        body: {
          firstname: row.firstname,
          lastname: row.lastname,
        },
      }).as("endpoint");
    });
  }
);

When("I acces the request endpoint to delete a booking", () => {
  const url = `${Cypress.env("URL")}/booking/${bookingid}`;
  cy.request({
    method: "DELETE",
    url: url,
    headers: {
      "Content-type": "application/json",
      Cookie: `token=${token}`,
    },
  }).as("endpoint");
});

Given("And endpoint to confirm whether the API is up and running", () => {});

When("I access the api request endpoint to confirm the API is running", () => {
  const url = `${Cypress.env("URL")}/ping`;
  cy.request({
    method: "GET",
    url: url,
  }).as("endpoint");
});
