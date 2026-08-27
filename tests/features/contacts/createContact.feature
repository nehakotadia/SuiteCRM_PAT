Feature: Create Contact

  Background: 
    Given the user navigates to the Contacts tab

  Scenario: Create a new contact with mandatory fields
    Given the user clicks the Create contact button
    When the user clicks Save button after entering valid information in mandatory fields
    Then the contact should be created successfully
