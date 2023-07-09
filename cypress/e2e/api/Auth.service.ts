import { AuthRequest } from "../../interfaces/Auth.interface";
import { default as api } from "./ApiHelper";

class AuthService {
  private token: string;
  private url = `${Cypress.env("URL")}/auth`;

  public getToken(): string {
    return this.token;
  }

  public setToken(token: string): void {
    this.token = token;
  }

  public createToken(body: AuthRequest): void {
    api
      .post(this.url, body)
      .then((response) => this.setToken(response.body.token));
  }
}

export default new AuthService();
