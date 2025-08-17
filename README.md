# FHTV 架空电视台网站

文件结构：
FHTV-Website/
├── backend/
│   ├── controllers/           # 业务逻辑
│   ├── models/                # 数据库模型
│   ├── routes/                # 路由
│   ├── utils/                 # 工具类（如验证码、邮件发送）
│   ├── config/                # 配置（如数据库、邮件）
│   ├── app.js                 # 主入口
│   └── package.json
├── frontend/
│   ├── public/
│   │   ├── index.html         # 首页
│   │   ├── login.html         # 登录
│   │   ├── register.html      # 注册
│   │   ├── verify.html        # 验证码注册
│   │   ├── forgot.html        # 找回密码
│   │   ├── live.html          # 直播页面
│   │   ├── schedule.html      # 节目表
│   │   └── admin/
│   │       ├── index.html     # 后台首页
│   │       ├── program.html   # 节目管理
│   │       ├── schedule.html  # 节目表管理
│   │       ├── user.html      # 用户管理
│   │       └── system.html    # 系统设置
│   ├── css/
│   │   ├── main.css
│   │   ├── admin.css
│   │   └── ...
│   ├── js/
│   │   ├── main.js
│   │   ├── login.js
│   │   ├── register.js
│   │   ├── live.js
│   │   ├── schedule.js
│   │   ├── admin/
│   │   │   ├── program.js
│   │   │   ├── schedule.js
│   │   │   ├── user.js
│   │   │   └── system.js
│   │   └── ...
├── sql/
│   └── schema.sql             # 数据库建表脚本
├── deploy/
│   ├── deploy.ps1             # 一键部署脚本（PowerShell）
│   └── FHTV-Website.zip       # 文件压缩包
├── README.md

## 项目结构
- 前端：HTML/CSS/JS分离，静态页面
- 后端：Node.js + Express，MySQL数据库
- 邮箱验证码注册/找回密码
- 后台管理：节目、节目表、用户、系统设置（直播源、邮箱）

## 部署步骤
1. 安装MySQL，导入 `sql/schema.sql`
2. 配置 `backend/app.js` 数据库连接和邮箱参数
3. 进入 `backend` 目录，运行 `npm install`
4. 运行 `node app.js`
5. 前端页面可直接用浏览器打开或用静态服务器访问
6. 后台管理页面在 `/admin/` 目录下

## 一键部署
见 `deploy/deploy.ps1`