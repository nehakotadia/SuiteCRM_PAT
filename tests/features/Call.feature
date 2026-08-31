Feature: Calls Management in SuiteCRM

Background:
   Given the user navigates to dashboard for call Feature

Scenario: Create a new Call record
  Given the user is on the SuiteCRM dashboard matrix interface
  When the user opens the action link "Log Call" in the sidebar navigation
  Then a fresh Call Record form opens successfully in Edit View

Scenario: Redirect to List View for search
  Given the user is currently working inside the active execution profile
  When the user opens the action element "View Calls" on the workspace layout
  Then the page updates to the List View with your matching call records

Scenario: Launch structural Import Wizard - Import Calls
  Given the user has administrative preparation privileges enabled
  When the user triggers the action element "Import Calls"
  Then the Import Calls opens to step one allowing user to map their data  

Scenario: Field Verification
  Given a fresh Call Record form opens successfully in Edit View layout
  When the user empty the "Subject" field the primary "Save" form trigger
  Then the submission fails inline validation error displays "Missing required field"

Scenario: Create a Duplicate Call Entry
    Given the user is on the Call creation form
    When the user triggers the action element "Duplicate"
    Then the duplicate entry is saved successfully  