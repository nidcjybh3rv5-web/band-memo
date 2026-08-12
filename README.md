# Band Memo for Xiaomi Band 9 / 9 NFC

這是小米 **Vela JS** 專案，不是一般 ZIP 偽裝的 RPK。畫面以 Band 9 的 192×490 直條螢幕為基準，僅要求 `system.storage` 權限，資料只保存在手環本機。

## 功能

- 最多保留 12 筆快速備忘。
- 圓形英文 QWERTY 小鍵盤，可輸入、退格、清除與儲存；每筆最多 24 字元。
- 「EN」按鈕目前顯示語言狀態。中文輸入需要額外整合小米 Vela 輸入法元件，尚未啟用。
- 開啟時逐筆驗證本機儲存內容，拒絕損壞、超大或重複 ID 的資料。
- 無網路、無定位、無裝置識別碼等權限。

## 官方打包與簽章

1. 在 Windows 10+ 安裝小米 **AIoT-IDE** 與 Node.js。
2. 以 AIoT-IDE 開啟本資料夾，安裝 IDE 提示的依賴。
3. 選擇 Band 9 模擬器或真機，按 **Package** 輸出 `dist/*.debug.rpk`。
4. 若要發佈版本，按 **Publish** 讓 IDE 在 `sign/` 產生 `private.pem` 和 `certificate.pem`，再按 Publish 輸出 `*.release.rpk`。

請勿把 `sign/private.pem` 上傳、傳給他人或提交到 Git。這兩個檔案必須固定保留，日後更新才能維持同一個應用程式身分。

安裝前，請確認手環是支援第三方 Vela App 的韌體／區域版本。官方流程為 Mi Fitness → Me → About → Debug → Third-Party Apps → Install third app，選擇輸出的 RPK。

## 自動檢查

推送到 GitHub 後，Actions 會自動執行 `npm run validate`，檢查 Band 9 的畫面寬度、路由、必要圖示、最小權限、本機資料驗證，並拒絕網路／定位／檔案系統 API、動態執行與私鑰。這是原始碼靜態檢查；RPK 相容性仍需由 AIoT-IDE 編譯確認。
