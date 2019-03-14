function myFunction() {

 var docName = "解説ドキュメント"; // 作成するドキュメントの名前
   var SAVE_FOLDER_ID = '1UPeq_Wvtb4FfHrZR_t1Z0SpyhvzkASp6';
  
var targetFolder = DriveApp.getFolderById(SAVE_FOLDER_ID ); // 指定のフォルダ

var doc = DocumentApp.openById('1Sc9uxVkLZ6O02asYFiV1fyRfpbQj-J6DuHChtfW2Pno')

 //spreadsheet = SpreadsheetApp.openById('12pAtQggxY89mqkt3sHwXZ62w8TMd3p-MDn5oOC4bNMA');
  
   var imagefolder = getSubfolder(SAVE_FOLDER_ID, 'images');
   var image = seachImagefile(imagefolder.getId(), '071.jpg');
 
  
 // var image = DriveApp.getFileById("<ファイルID>").getBlob();
var img = doc.insertImage(0, image);
  
}
