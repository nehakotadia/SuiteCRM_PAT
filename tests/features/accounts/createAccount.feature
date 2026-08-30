Feature: Create Account

  Background:
    Given the user navigates to the Accounts tab

  Scenario: Create a new account with mandatory fields
    Given the user clicks the Create Account button
    When the user clicks Save button after entering valid information in all mandatory fields

  Scenario: Validate required Name field (Error Scenario)
    When the user clicks Save without entering the Name
    Then the Name required error message should be displayed

  Scenario: Validate invalid email (Error Scenario)
    When the user clicks save after entering invalid email "abc"
    Then the invalid email error message should be displayed

  Scenario: Validate invalid office phone (Error Scenario)
    When the user clicks save after entering invalid office phone "dg"
    Then the invalid phone error message should be displayed