Feature: View Account

  Scenario: View the Account List page
    When the user navigates to the Accounts page
    Then the list of existing accounts should be displayed with the page title "Accounts"