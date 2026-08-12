# n8n SEO 內容生成工具｜SEO Content Pipeline

[English version](#english)

## 中文說明

這是一個以 **n8n、Google Sheets、Google Drive 與 Google Docs** 建立的 SEO 內容生成工具。使用者在 Google Sheet 輸入關鍵字、推廣產品與使用情境後，可透過按鈕觸發工作流，產生文章、三張配圖與 Google Docs 成果。

- GitHub：[SEO-Content-n8n-Pipeline](https://github.com/Brittany3112/SEO-Content-n8n-Pipeline)
- Google Sheet 範例：[開啟 Sheet](https://docs.google.com/spreadsheets/d/1FnD3XRmuw_B23JNAbtWJXOz67vuobMS0H9Mzp_wMmHo/edit?usp=sharing)

### 功能

1. 從 Google Sheet 接收關鍵字、產品與情境。
2. 分兩段生成繁體中文 SEO 文章與動態小標題，合併後先進行中文字數驗證。
3. 產生三張無文字的情境配圖，並上傳至本次執行專屬的 Google Drive 資料夾。
4. 在文章中保留 `[IMAGE_1]`、`[IMAGE_2]`、`[IMAGE_3]` marker，再透過 Google Docs API 找到實際位置。
5. 使用 `batchUpdate` 與 `insertInlineImage` 將三張圖片原生嵌入 Google Docs，不使用 Markdown 圖片連結。
6. 以 `row_number` 將文章、文件連結、資料夾連結與圖片 URL 寫回正確的 Google Sheet row。

```text
Google Sheet / Button
→ Two-part article generation
→ Length validation
→ 3 image prompts and images
→ Google Drive upload
→ Google Docs marker replacement with inline images
→ Update the same Google Sheet row
```

### 主要設計

| 問題 | 處理方式 |
|---|---|
| 長文容易過短 | 兩段文章生成，且在生成圖片前驗證中文字數。 |
| marker 重複或緊貼段落 | 僅保留每個 marker 的第一次出現，並強制 marker 獨立換行。 |
| Google Docs 顯示 Markdown 圖片連結 | 使用 Google Docs API `insertInlineImage` 原生插圖。 |
| 相同關鍵字寫回錯誤 row | 以 webhook 傳入的 `row_number` 作為更新依據。 |
| 圖片中的中文字失真 | 使用 GPT Image 2 與 text-free 圖片 prompt。 |

### Self-host n8n

本專案使用本機 n8n 與 Cloudflare Tunnel 展示。

#### 1. 啟動 n8n

```bash
npx n8n
```

開啟：

```text
http://localhost:5678
```

#### 2. 啟動 Cloudflare Tunnel

另開一個 Terminal：

```bash
cloudflared tunnel --url http://localhost:5678
```

Cloudflare 會提供類似以下的公開網址：

```text
https://example-name.trycloudflare.com
```

#### 3. 更新 Google Apps Script

將最新 Tunnel URL 貼入 Google Sheet 的 Apps Script：

```javascript
const N8N_WEBHOOK_URL =
  "https://example-name.trycloudflare.com/webhook/your-webhook-path";
```

> Cloudflare temporary tunnel 在重啟後可能變更網址；變更後需更新 Apps Script。n8n、Tunnel 與本機電腦必須保持運作，Sheet 按鈕才能觸發 workflow。

### 匯入與設定

1. 在 n8n 選擇 **Import from File**，匯入最新 `n8n-workflow.json`。
2. 重新設定 OpenAI、Google Drive、Google Docs 與 Google Sheets credentials。
3. 複製 Google Sheet，並更新 Apps Script webhook URL。
4. 儲存並 Publish workflow。

---

<a id="english"></a>

# English

This is an SEO content workflow built with **n8n, Google Sheets, Google Drive, and Google Docs**. A user enters a keyword, product, and scenario in Google Sheets, then triggers the workflow with a button to create an SEO article, three visuals, and a Google Docs result.

- GitHub: [SEO-Content-n8n-Pipeline](https://github.com/Brittany3112/SEO-Content-n8n-Pipeline)
- Example Google Sheet: [Open Sheet](https://docs.google.com/spreadsheets/d/1FnD3XRmuw_B23JNAbtWJXOz67vuobMS0H9Mzp_wMmHo/edit?usp=sharing)

## Features

1. Receives a keyword, product, and scenario from Google Sheets.
2. Generates a Traditional Chinese SEO article in two parts with dynamic subheadings, then validates its character count before image generation.
3. Creates three text-free contextual images and uploads them to a run-specific Google Drive folder.
4. Writes temporary `[IMAGE_1]` to `[IMAGE_3]` markers to Google Docs, reads their real document indexes, and replaces them with native inline images through Google Docs API `batchUpdate`.
5. Updates the correct Google Sheet row through `row_number` with the article, document URL, folder URL, and image URLs.

## Design Notes

| Challenge | Implementation |
|---|---|
| Inconsistent long-form output | Two-part generation and a character-count gate before image generation. |
| Repeated or poorly spaced markers | Keep the first occurrence of each marker and place it on its own line. |
| Markdown links do not render as images in Google Docs | Use `insertInlineImage` through Google Docs API. |
| Repeated keywords can update the wrong row | Match the final Sheet update with webhook `row_number`. |
| Text inside generated images is unreliable | Use GPT Image 2 with text-free prompts. |

## Self-host n8n

Start n8n locally:

```bash
npx n8n
```

Open:

```text
http://localhost:5678
```

In a second Terminal, start a Cloudflare Tunnel:

```bash
cloudflared tunnel --url http://localhost:5678
```

Copy the generated public URL into the Google Sheet Apps Script webhook setting:

```javascript
const N8N_WEBHOOK_URL =
  "https://example-name.trycloudflare.com/webhook/your-webhook-path";
```

> The temporary tunnel URL can change after restart. Update Apps Script when it changes. The local computer, n8n, and tunnel must remain running for the Sheet button to trigger the workflow.

## Import and Configure

1. Select **Import from File** in n8n and import the latest `n8n-workflow.json`.
2. Reconnect OpenAI, Google Drive, Google Docs, and Google Sheets credentials.
3. Copy the Google Sheet and update its Apps Script webhook URL.
4. Save and publish the workflow.
