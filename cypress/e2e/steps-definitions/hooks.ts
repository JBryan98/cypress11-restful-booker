import { Before } from "@badeball/cypress-cucumber-preprocessor";
import AuthService from "../api/Auth.service";

Before({tags: "@UpdateBooking or @PatchBooking or @DeleteBooking"}, () => {
    cy.log("Generando el token!")
    const body ={
        username: "admin",
        password: "password123",
    }
    AuthService.createToken(body);
})