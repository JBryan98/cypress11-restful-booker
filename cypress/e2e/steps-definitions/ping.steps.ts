import { Given, When } from "@badeball/cypress-cucumber-preprocessor";
import PingService from "../api/Ping.service";

Given("And endpoint to confirm whether the API is up and running", () => {});

When("I access the api request endpoint to confirm the API is running", () => {
  PingService.healthCheck();
});