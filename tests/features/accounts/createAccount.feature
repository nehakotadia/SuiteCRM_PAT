Feature: Create Account

  Background:
    Given the user navigates to the Accounts tab

  Scenario: Create a new account with mandatory fields
    Given the user clicks the Create Account button
    When the user clicks Save button after entering valid information in all mandatory fields
    Then the account should be created successfully