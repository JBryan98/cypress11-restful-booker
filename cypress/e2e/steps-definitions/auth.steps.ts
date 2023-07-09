import { DataTable, Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { AuthRequest } from "../../interfaces/Auth.interface";
import AuthService from "../api/Auth.service";

Given("User registered on the API", () => {});

When(
  "I access the API request endpoint to create token",
  (datatable: DataTable) => {
    datatable.hashes().forEach((row) => {
      const body: AuthRequest = {
        username: row.username,
        password: row.password,
      };
      AuthService.createToken(body);
    });
  }
);

Then("Verify the token contains {int} characters", (tokenLength: number) => {
  expect(AuthService.getToken().length).to.equal(tokenLength);
});

Then("Verify the token contains only alphanumeric characters", () => {
  expect(AuthService.getToken().includes("^[a-zA-Z0-9]*$")).to.equal(false);
});