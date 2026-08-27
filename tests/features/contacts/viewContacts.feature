Feature: View Contacts

    Scenario: View the Contact List page
        Given View Contact: the user clicks Contacts tab
        When  View Contact: the user clicks View Contact 
        Then View Contact: the list of existing contacts should be displayed with the page title "Contacts"
