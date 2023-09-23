# gwao_automations
A Google Workspace Add-On, which adds automation featres to Gmail.

**Note: This add-on is not available via the Google Workspace Add-On Marketplace. Instead, it has to be deployed manually.**

## Installation
For futher reference use the quick start guide from Google about creating workspace add-ons. https://developers.google.com/apps-script/add-ons/overview

To deploy the source code to your own add-on project, you can clone this repository and use clasp to push the code to your project.
See https://developers.google.com/apps-script/guides/clasp

## Features
### (GMAIL) Attachment Archiving
* This creates a background task which automatically stores attachments from mails with a given label in a mapped Google Drive folder.
* The first time you open the add-on in Gmail you will be redirected to the authorization page to grant the add-on access to your Gmail and Drive. And you'll have to provide the interval of the background task and which label will be used to mark mails as processed.
* You can change these settings later in the add-on 'Settings' card.
* The main view of the add-on in Gmail is all about maintaining the map between labels and folders and which attachments should be stored by the background task. 
