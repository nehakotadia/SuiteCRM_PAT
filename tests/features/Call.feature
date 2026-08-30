Feature: Calls Management in SuiteCRM

Background:
   Given the user navigates to dashboard for call Feature

Scenario: Create a new Call record
  Given the user is on the SuiteCRM dashboard matrix interface
  When the user opens the action link "Log Call" in the sidebar navigation
  Then a fresh Call Record form opens successfully in Edit View

