Feature: Ping service testing
    A simple health check endpoint to confirm whether the API is up and running.

    @Ping
    Scenario: Ping - HealthCheck
        Given And endpoint to confirm whether the API is up and running
        When I access the api request endpoint to confirm the API is running
        Then Verify the response status code 201