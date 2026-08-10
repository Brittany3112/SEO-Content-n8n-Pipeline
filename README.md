# 透過 n8n + Google Sheets 打造 SEO 內容工具

## 中文說明

這是一個透過 **n8n、Google Sheets 與 Google Apps Script** 打造的 SEO 內容生成工具。使用者輸入關鍵字、想推廣的產品與使用情境後，系統會自動產生約 1,800 字的 SEO 文章與 3 張配圖，並將圖片插入文章的 25%、50% 與 75% 位置。

## 功能

- 輸入關鍵字、產品資訊與使用情境。
- 自動產生約 1,800 字的 SEO 文章。
- 自動產生 3 張與文章內容相關的圖片。
- 將圖片插入文章約 25%、50% 與 75% 的位置。
- 可將內容儲存至不同的 Google Drive 資料夾。
- 透過按鈕啟動整個內容生成流程。
- 產生文章與圖片後，進行品質檢查。
- 列出 3 個可以改善的地方，並根據建議再次修正內容。


## 使用的工具

- n8n
- Google Sheets
- Google Apps Script
- Google Drive
- AI 文字生成模型
- AI 圖片生成模型
- Cloudflare Tunnel


## Google Sheet

使用的 Google Sheet：

[開啟 Google Sheet](https://docs.google.com/spreadsheets/d/1FnD3XRmuw_B23JNAbtWJXOz67vuobMS0H9Mzp_wMmHo/edit?usp=sharing)

使用前請先複製一份 Sheet 到自己的 Google Drive，並確認 Apps Script 與 n8n Webhook 使用的是自己的網址。

## Self-host n8n

本專案使用 `npx n8n` 在本機啟動 n8n。

### 1. 啟動 n8n

開啟 Terminal，執行：

```bash
npx n8n
```

啟動後，n8n 預設會運行在：

```text
http://localhost:5678
```


### 2. 建立 Cloudflare Tunnel

另外開啟一個新的 Terminal，執行：

```bash
cloudflared tunnel --url http://localhost:5678
```

執行後，Cloudflare 會產生一組公開網址，例如：

```text
https://example-name.trycloudflare.com
```


### 3. 設定 Apps Script

將 Cloudflare Tunnel 產生的公開網址複製到 Google Sheet 的 Apps Script 中，取代原本的 Webhook URL。

範例：

```javascript
const N8N_WEBHOOK_URL =
  "https://example-name.trycloudflare.com/webhook/your-webhook-path";
```

完成設定後，即可透過 Google Sheet 上的按鈕啟動 n8n 工作流程。

> 每次重新啟動 Cloudflare Tunnel，都可能產生新的網址，因此需要再次更新 Apps Script 中的 Webhook URL。

## n8n 工作流程

本專案的 n8n 工作流程會執行以下步驟：

1. 接收 Google Sheet 傳入的關鍵字、產品與使用情境。
2. 產生 SEO 文章架構與文章內容。
3. 產生三組圖片 Prompt。
4. 生成三張文章配圖。
5. 將圖片插入文章的 25%、50% 與 75% 位置。
6. 將文章與圖片儲存至指定的 Google Drive 資料夾。
7. 檢查文章與圖片品質。
8. 列出三個可改善的地方。
9. 根據改善建議再次修正文章與圖片內容。
10. 將最終結果回傳至 Google Sheet。

## 品質改善紀錄

### 1. 增加台灣生活感

初期圖片 Prompt 使用英文描述，生成的畫面較偏向國外廣告風格，人物、居家環境與產品情境缺乏台灣生活感。

後續將圖片 Prompt 改為繁體中文，並加入台灣常見的生活場景與文化元素，同時要求圖片中的標語使用繁體中文，讓圖片更貼近台灣讀者。

### 2. 改善圖片文字變形

AI 生成圖片中的繁體中文偶爾會出現字體變形、文字不自然或清晰度不足的問題。

後續可透過以下方式改善：

- 測試不同的圖片生成模型。
- 縮短圖片中的標語。
- 減少圖片內的文字數量。
- 使用 Canva 或 Google Docs 進行文字後製。


### 3. 加強文章 SEO 結構

初期文章雖然達到字數要求，但段落安排較零散，產品介紹、使用情境與購買建議容易混在一起。

後續調整文章 Prompt，將內容分為四個部分：

1. 讀者痛點與主題說明。
2. 產品特色與實際使用情境。
3. 產品比較與選購建議。
4. 使用方式、注意事項與總結。

同時，在前三個主要段落結尾加入圖片標記，讓文章結構、圖片位置與讀者閱讀流程更加一致。

## 專案檔案

本專案主要包含：

```text
/
├── n8n-workflow.json
├── README.md
└── Google Apps Script
```

`n8n-workflow.json` 是從 n8n 匯出的工作流程檔案，可以匯入其他 n8n 環境中使用。

***

# SEO Content Tool with n8n and Google Sheets

## Overview

This project is an SEO content generation tool built with **n8n, Google Sheets, and Google Apps Script**.

Users can enter a keyword, product, and usage scenario. The workflow then generates an approximately 1,800-word SEO article and three related images. The images are inserted into the article at approximately 25%, 50%, and 75% of the content.

## Features

- Input keywords, products, and usage scenarios.
- Generate an SEO article of approximately 1,800 words.
- Generate three images related to the article.
- Insert images at approximately 25%, 50%, and 75% of the article.
- Save content to different Google Drive folders.
- Start the workflow using a button in Google Sheets.
- Review the quality of the generated article and images.
- Identify three areas for improvement.
- Revise the content based on the improvement suggestions.


## Tools

- n8n
- Google Sheets
- Google Apps Script
- Google Drive
- AI text generation model
- AI image generation model
- Cloudflare Tunnel


## Google Sheet

Google Sheet used in this project:

[Open Google Sheet](https://docs.google.com/spreadsheets/d/1FnD3XRmuw_B23JNAbtWJXOz67vuobMS0H9Mzp_wMmHo/edit?usp=sharing)

Before using the project, make a copy of the Sheet and update the Apps Script Webhook URL to your own n8n endpoint.

## Running n8n Locally

This project uses `npx n8n` to run n8n locally.

### 1. Start n8n

Open a Terminal and run:

```bash
npx n8n
```

The local n8n instance will be available at:

```text
http://localhost:5678
```


### 2. Start Cloudflare Tunnel

Open another Terminal window and run:

```bash
cloudflared tunnel --url http://localhost:5678
```

Cloudflare will generate a public URL similar to:

```text
https://example-name.trycloudflare.com
```


### 3. Update Google Apps Script

Copy the Cloudflare Tunnel URL and replace the Webhook URL in Google Apps Script.

Example:

```javascript
const N8N_WEBHOOK_URL =
  "https://example-name.trycloudflare.com/webhook/your-webhook-path";
```

After updating the URL, the workflow can be started using the button in Google Sheets.

> A new Cloudflare Tunnel URL may be generated each time the tunnel is restarted. Update the Apps Script URL when necessary.

## n8n Workflow

The workflow performs the following steps:

1. Receive the keyword, product, and usage scenario from Google Sheets.
2. Generate the SEO article structure and content.
3. Generate three image prompts.
4. Create three images.
5. Insert the images at 25%, 50%, and 75% of the article.
6. Save the article and images to the selected Google Drive folder.
7. Review the quality of the generated content.
8. Identify three possible improvements.
9. Revise the article and image content.
10. Return the final result to Google Sheets.

## Quality Improvements

### 1. Adding a Taiwanese Context

The initial image prompts were written in English, which resulted in images with a more international advertising style. The people, home environments, and product scenarios did not strongly reflect everyday life in Taiwan.

The prompts were later rewritten in Traditional Chinese with Taiwanese settings and cultural details. The workflow also requires Traditional Chinese text in the images, making the results more relatable to the target audience.

### 2. Improving Text Rendering in Images

Traditional Chinese text generated inside images may sometimes appear distorted, unclear, or unnatural.

Possible improvements include:

- Testing different image generation models.
- Using shorter slogans.
- Reducing the amount of text in images.
- Adding text later with Canva or Google Docs.


### 3. Improving SEO Structure

The initial article generally met the word-count requirement, but the structure was not always clear. Product descriptions, usage scenarios, and purchasing suggestions were sometimes mixed together.

The article prompt was revised to include four main sections:

1. Reader pain points and topic introduction.
2. Product features and practical usage scenarios.
3. Product comparison and purchasing suggestions.
4. Usage instructions, considerations, and conclusion.

Image markers are also added at the end of the first three main sections so that the article structure and image placement work together more effectively.

## Project Files

The project mainly includes:

```text
/
├── n8n-workflow.json
├── README.md
└── Google Apps Script
```

The `n8n-workflow.json` file is exported from n8n and can be imported into another n8n environment.

