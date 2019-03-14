/**
 * 解答の送信中や送信後にユーザーに表示される項目を指定できます。
*
*不正解だった質問
*正解
*点数
*項目を変更するには:
*Google フォームでテストを開きます。
*右上の設定アイコン 設定 をクリックします。
*[テスト] をクリックします。
*[回答者が表示できる項目] で該当する項目の横のチェックボックスをオンにします。
*/

function createEventForm() {

  
  var fd = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyyMMdd-HHmm');
  
  //実施日
  fd='20190314'  
  var mondai = ['H30秋','H30春'];
  //問題IDの選択
  var mondai_id = 1;

  //解答が格納されているスプレットシート
  var spreadsheet_id = PropertiesService.getScriptProperties().getProperty('ANSWER_SPREADSHEET_ID');
  var spreadsheet = SpreadsheetApp.openById(spreadsheet_id);
  
  var dataValues = spreadsheet.getSheetByName(mondai[mondai_id]).getDataRange().getValues();
  var CorrectValues = generateArray(dataValues, 1); //正答
  var prefValues = generateArray(dataValues, 2); //カテゴリ
  
  
  var formTitle = mondai[mondai_id]+'_午前問題'; //タイトル
  
  var formDescription = fd+'実施_応用情報対策　午前問題　自己採点システム'; //概要
  
  
  var form = FormApp.create(formTitle);
  
  var FOLDER_ID = PropertiesService.getScriptProperties().getProperty('FOLDER_ID');
  var formFile = DriveApp.getFileById(form.getId());

  DriveApp.getFolderById(FOLDER_ID).addFile(formFile);
  DriveApp.getRootFolder().removeFile(formFile);
  
  form.setDescription(formDescription);
  form.addTextItem().setTitle('氏名').setRequired(true);
  
 // var validationEmail = FormApp.createTextValidation().requireTextIsEmail().build();
 // form.addTextItem().setTitle('メールアドレス').setRequired(true).setValidation(validationEmail);
 form.setCollectEmail(true);//	Form	フォームが回答者のEメールアドレスを収集するかどうかを設定します。
 
  form.setIsQuiz(true); //テスト形式に
  form.setProgressBar(true); //下部に進捗割合を出します。離脱率減少に有効なんだとか
  
  form.setConfirmationMessage('お疲れさまでした！'); //送信後
    
  var choiceValues = ['ア', 'イ','ウ','エ'];
  for(var i=1;i<=80;i++) {
    var item = form.addMultipleChoiceItem();
    
    var choices = [];
    for(var j=0;j<4;j++) {
      
       if (choiceValues[j].indexOf(CorrectValues[i-1][0]) !== -1) {
            isCorrect = true;
            Logger.log("正答");
       } else {
            isCorrect = false;
             Logger.log("NG");
       }
       var Choice  = item.createChoice(choiceValues[j], isCorrect);
      choices.push(Choice);
    }  
    
    item.setTitle('問'+i+'の回答を入力してください');
    item.setHelpText(prefValues[i-1]+' 正答は『'+CorrectValues[i-1]　+'』');
    item.setChoices(choices);
    item.setPoints(1.25);
    item.setRequired(true);
//    item.setFeedbackForCorrect(FormApp.createFeedback().setText("正解").build());
//    item.setFeedbackForIncorrect(FormApp.createFeedback().setText("不正解").build());

    if(i%10 === 0　&& i!=80) {
   　　form.addPageBreakItem().setTitle(i+'問～').setHelpText('');
    }
    
  }
 
  var page = form.addPageBreakItem().setTitle('回答を送信');
  page.setGoToPage(FormApp.PageNavigationType.SUBMIT);

//  var formResponses = form.getResponses();
//  form.submitGrades(formResponses); 

//  var page = form.addPageBreakItem().setTitle('採点');
   

}

/**
 * シート全体の値を取得した二次元配列から、指定の列のデータ（見出し行を除く）を抜き出し一次元配列を構成する
 *
 * @param {Object[][]} シートのデータを二次元配列化した配列
 * @param {number} 配列の列数（0以上のインデックス）
 * @return {Object[]} 指定の列（見出しを除く）のデータによる一次元配列
 */
function generateArray(values, column){
  var i = 1;
  var array = [];
  for(var i = 1; i < values.length; i++){
    if(values[i][column]){
      array.push(values[i][column]);
    }
  }
  return array;
}