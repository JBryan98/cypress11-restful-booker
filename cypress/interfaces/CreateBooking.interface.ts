export interface Booking {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additionalneeds: string;
}

export interface BookingResponse {
    body: {
        bookingid: number;
        booking: Booking;
    }
    status: number;
}

export interface GetBookingByIdResponse {
    body: Booking
    status: number;
}