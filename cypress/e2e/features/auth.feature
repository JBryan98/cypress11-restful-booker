Feature: Auth service testing
    @Authorization
    Scenario: Auth - Create Token
        Given User registered on the API
        When I access the API request endpoint to create token
            | username | password    |
            | admin    | password123 |
        Then Verify the response status code 200

    @Authorization
    Scenario: The token contains 15 characters
        Given User registered on the API
        When I access the API request endpoint to create token
            | username | password    |
            | admin    | password123 |
        Then Verify the response status code 200
        And Verify the token contains 15 characters

    @Authorization
    Scenario: The token contains only alphanumeric characters
        Given User registered on the API
        When I access the API request endpoint to create token
            | username | password    |
            | admin    | password123 |
        Then Verify the response status code 200
        And Verify the token contains only alphanumeric characters
