# FHTV 架空电视台网站

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