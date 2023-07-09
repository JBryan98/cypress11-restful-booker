import {
  Given,
  When,
  Then,
  DataTable,
} from "@badeball/cypress-cucumber-preprocessor";
import { Booking } from "../../interfaces/Booking.interface";
import BookingService from "../api/Booking.service";
import { default as api } from "../api/ApiHelper";

//GetBookingIds
Given("The access API request endpoint", () => {});

When("I access the API request endpoint to get all the booking ids", () => {
  BookingService.getBookingIds();
});

When(
  "I acces the API request endpoint to get all the booking ids filtered by name",
  (datatable: DataTable) => {
    datatable.hashes().forEach((row) => {
      BookingService.getBookingIdsFilterByName(row.firstname, row.lastname);
    });
  }
);

When(
  "I access the API request endpoint to get all the booking ids filtered by bookingdates",
  (datatable: DataTable) => {
    datatable.hashes().forEach((row) => {
      BookingService.getBookingIdsFilterByCheckDate(row.checkin, row.checkout);
    });
  }
);

//CreateBooking
Given("Booking not registered on the API", () => {});

When(
  "I access the API request endpoint to create a new booking",
  (datatable: DataTable) => {
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
      BookingService.createBooking(booking);
    });
  }
);

Then("Verify the response body contains the bookingid", () => {
  expect(BookingService.getBookingId()).to.exist;
});

Given("Booking registered on the API", () => {});

//GetBookingById
When("I access the API request endpoint to get a single booking", () => {
  BookingService.getBookingById();
});

Then("Verify if the booking found is the right one", (datatable: DataTable) => {
  datatable.hashes().forEach((row) => {
    expect(row.firstname).to.equal(api.getResponse().body.firstname);
    expect(row.lastname).to.equal(api.getResponse().body.lastname);
    expect(Number(row.totalprice)).to.equal(api.getResponse().body.totalprice);
    expect(Boolean(row.depositpaid)).to.equal(api.getResponse().body.depositpaid);
    expect(row.checkin).to.equal(api.getResponse().body.bookingdates.checkin);
    expect(row.checkout).to.equal(api.getResponse().body.bookingdates.checkout);
    expect(row.additionalneeds).to.equal(api.getResponse().body.additionalneeds);
  });
});

//Updatebooking
When(
  "I access the API request endpoint to update a booking",
  (datatable: DataTable) => {
    datatable.hashes().forEach((row) => {
      const body: Booking = {
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
      BookingService.updateBooking(body)
    });
  }
);

//PartialUpdateBooking
When(
  "I access the API request endpoint to partial update a booking",
  (datatable: DataTable) => {
    datatable.hashes().forEach((row) => {
      const body = {
        firstname: row.firstname,
        lastname: row.lastname,
      };
      BookingService.partialUpdateBooking(body)
    });
  }
);

//DeleteBooking
When("I acces the request endpoint to delete a booking", () => {
  BookingService.deleteBooking()
});

