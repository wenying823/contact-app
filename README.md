# 聯絡人管理系統

這是一個基於 Node.js (Express) 和 Vue.js (Quasar 框架) 的聯絡人管理系統，支援聯絡人資料的 CRUD 操作（新增、讀取、更新、刪除），並在新增或更新聯絡人時發送電子郵件通知。後端使用 SQLite 作為資料庫，前端使用 Quasar 提供現代化的使用者介面。

## 功能概覽

- **聯絡人列表**：顯示所有聯絡人資料，支援排序和操作（編輯、刪除）。
- **新增聯絡人**：提供表單輸入聯絡人資訊，包括姓名、性別、住址、電話、生日和電子郵件，提交後儲存至資料庫並發送通知郵件。
- **編輯聯絡人**：允許修改現有聯絡人資料，更新後發送通知郵件。
- **刪除聯絡人**：可從列表中刪除指定聯絡人，並提供確認提示。
- **電子郵件通知**：在新增或更新聯絡人時，向聯絡人提供的電子郵件地址發送確認郵件。

## 使用套件

### 後端套件
- **express**：用於構建後端伺服器和處理 HTTP 請求的 Web 框架。
- **body-parser**：解析 HTTP 請求中的 JSON 數據，方便處理表單提交。
- **cors**：啟用跨來源資源共享，允許前端與後端進行跨域請求。
- **sqlite3**：用於與 SQLite 資料庫交互，儲存聯絡人資料。
- **nodemailer**：用於發送電子郵件通知，例如在新增或更新聯絡人時寄送確認郵件。

### 前端套件
- **vue**：前端 JavaScript 框架，用於構建動態使用者介面。
- **quasar**：基於 Vue 的 UI 框架，提供響應式元件和現代化設計。
- **axios**：用於發送 HTTP 請求與後端 API 交互，例如取得或更新聯絡人資料。

## 執行方式

### 環境需求
- **Node.js**：版本 14 或以上
- **NPM**：Node.js 的包管理器
- **SQLite**：用於儲存聯絡人資料
- **Gmail 帳戶**：用於發送電子郵件通知（需要啟用應用程式密碼）

### 安裝步驟
1. **複製專案**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **安裝後端依賴**
   在專案根目錄下執行：
   ```bash
   npm install express body-parser cors sqlite3 nodemailer
   ```

3. **安裝前端依賴**
   假設前端 Quasar 專案位於子目錄（如 `frontend`），進入前端目錄並執行：
   ```bash
   cd frontend
   npm install
   npm install axios
   ```

4. **啟動後端伺服器**
   在專案根目錄下執行：
   ```bash
   node index.js
   ```
   伺服器將運行在 `http://localhost:3000`。

5. **啟動前端應用**
   在前端目錄下執行：
   ```bash
   cd frontend
   quasar dev
   ```
   前端應用將運行在 `http://localhost:8080`（或 Quasar 指定的端口）。

### 存取應用
- 打開瀏覽器，訪問 `http://localhost:8080` 查看聯絡人管理系統的前端介面。
- 後端 API 可通過 `http://localhost:3000/api/contacts` 訪問。

## 資料庫結構

資料庫使用 SQLite，檔案名稱為 `contacts.db`，包含一個名為 `contacts` 的資料表。結構如下：

| 欄位名稱    | 資料型態        | 說明                     |
|-------------|-----------------|--------------------------|
| `id`        | INTEGER         | 主鍵，自動遞增          |
| `name`      | TEXT            | 姓名，必填               |
| `gender`    | TEXT            | 性別（男/女）            |
| `address`   | TEXT            | 住址                     |
| `phone`     | TEXT            | 電話                     |
| `birthday`  | TEXT            | 生日（格式：YYYY-MM-DD） |
| `email`     | TEXT            | 電子郵件，必填           |
| `created_at`| TEXT            | 建立時間，預設為當前時間 |

### 資料表建立語句
```sql
CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  gender TEXT,
  address TEXT,
  phone TEXT,
  birthday TEXT,
  email TEXT,
  created_at TEXT DEFAULT (datetime('now', 'localtime'))
);
```

## API 端點

| 方法   | 端點                      | 功能                   |
|--------|---------------------------|------------------------|
| GET    | `/api/contacts`           | 取得所有聯絡人資料     |
| GET    | `/api/contacts/:id`       | 取得單一聯絡人資料     |
| POST   | `/api/contacts`           | 新增聯絡人資料         |
| PUT    | `/api/contacts/:id`       | 更新聯絡人資料         |
| DELETE | `/api/contacts/:id`       | 刪除聯絡人資料         |

