import { Booking } from "../../interfaces/Booking.interface";
import { default as api } from "./ApiHelper";
import AuthService from "./Auth.service";

class BookingService {
  private bookingId: number;
  private url = `${Cypress.env("URL")}/booking`;
  public static response: number;

  public getBookingId(): number {
    return this.bookingId;
  }

  public setBookingId(bookingId: number): void {
    this.bookingId = bookingId;
  }

  public getBookingIds() {
    api.get(this.url);
  }

  public getBookingIdsFilterByName(firstname: string, lastname: string): void {
    const queryParams = {
      firstname: firstname,
      lastname: lastname,
    };
    api.get(this.url, queryParams);
  }

  public getBookingIdsFilterByCheckDate(checkin: string, checkout: string) {
    const queryParams = {
      checkin: checkin,
      checkout: checkout,
    };
    api.get(this.url, queryParams);
  }

  public createBooking(booking: Booking) {
    api.post(this.url, booking).then(response => this.setBookingId(response.body.bookingid));
  }

  public getBookingById() {
    api.get(this.url + "/" + this.bookingId);
  }

  public updateBooking(body: Booking) {
    const url = this.url + "/" + this.bookingId;
    const token = AuthService.getToken();
    api.put(url, body, token);
  }

  public partialUpdateBooking(body: Object) {
    const url = this.url + "/" + this.bookingId;
    const token = AuthService.getToken();
    api.patch(url, body, token);
  }

  public deleteBooking() {
    const url = this.url + "/" + this.bookingId;
    const token = AuthService.getToken();
    api.delete(url, token);
  }
}

export default new BookingService();
