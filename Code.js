function triggerN8n() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var row = sheet.getActiveCell().getRow(); 
  
  var keyword = sheet.getRange(row, 2).getValue();
  var product = sheet.getRange(row, 3).getValue();
  var scenario = sheet.getRange(row, 4).getValue();
  var folderId = sheet.getRange(row, 6).getValue();
  
  // 已經幫妳替換成剛剛取得的網址
  var webhookUrl = "https://your-gst-affected-etc.trycloudflare.com/webhook/seo-article"; 
  
  var payload = {
    "keyword": keyword,
    "product": product,
    "scenario": scenario,
    "folderId": folderId,
    "row": row
  };
  
  UrlFetchApp.fetch(webhookUrl, {
    "method": "post",
    "contentType": "application/json",
    "headers": {
      "Bypass-Tunnel-Reminder": "true" // 🔥 加入這行通關密語，直接繞過警告畫面
    },
    "payload": JSON.stringify(payload)
  });
  
  sheet.getRange(row, 5).setValue("產出中...");
}
