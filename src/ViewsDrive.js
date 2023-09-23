/*DRIVE*/

function getDriveCard(context){
  if(debugFlag){
    console.log("function getDriveCard");
    console.log(context);
    console.log(context.drive);
  }
  if(context.drive.selectedItems && context.drive.selectedItems.length > 1) {
    return(buildInfoCard({
      text: trsl('tSelectOnlyOne')
    })); 
  }
  else if (context.drive.selectedItems){
    context.tItemSelected = true
    context.tSelectedItem = context.drive.selectedItems[0];
    context.tSelType = context.tSelectedItem.mimeType  == 'application/vnd.google-apps.folder' ? constMap.selFolder:constMap.selFile;
  }
  if (context.tItemSelected && context.tSelType == constMap.selFolder){
    return(getFolderSettingsCard(context));
  }
  else{
    return(buildInfoCard({
      text: trsl('tSelectFolder')
    })); 
  }
}

function getFolderSettingsCard(context) {
  return(buildInfoCard({
    text: trsl('tFolderActionsUnsupported')
  })); 
}

function folderLabelChange(e){
  if(debugFlag){
    console.log(e);
  }
}