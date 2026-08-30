Feature: View Account

  Scenario: View the Account List page
    Given the user navigates to the Accounts page
    When the user clicks View Account
    Then the list of existing accounts should be displayed with the page title "Accounts"