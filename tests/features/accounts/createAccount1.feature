Feature: Create Account

  Background:
    Given Create Account1: the user navigates to the Accounts tab

  Scenario: Create a new account with mandatory fields
    Given the user clicks the Create Account button1
    When the user clicks Save button after entering valid information in all mandatory fields1
    Then the account should be created successfully1