import { Then } from "@badeball/cypress-cucumber-preprocessor";
import { default as api } from "../api/ApiHelper";

//Step definitions que tienen en común todos los features

Then("Verify the response status code {int}", (statusCode: number) => {
  expect(api.getResponse().status).to.equal(statusCode);
});