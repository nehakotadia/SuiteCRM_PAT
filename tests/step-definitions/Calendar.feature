Feature: Calendar Event Creation SuiteCRM

Background:
  Given the user is logged into the SuiteCRM dashboard

Scenario: Schedule a standard business meeting
  Given the user is on the Calendar view
  When the user selects directly a blank grid to enter the Subject Field
  Then the calendar grid event appears with an "Event Created" alert

Scenario: Cancel meeting deletion
  Given the user has selected a meeting for deletion
  When the user selects the delete action
  Then the error appears "Are you sure you want to remove the record?"

Scenario: Missing Mandatory Fields
  Given the user opens a fresh calendar creation form
  When the user empty the "Subject Field" the primary save form trigger
  Then the form open,shows a validation error highlights the "Missing required field"

Scenario: Cross-day drag and drop
  Given the user holds an event node
  When the user drags it to the same time slot on another day
  Then the event moves to the new time slot
