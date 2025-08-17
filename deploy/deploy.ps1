cd ../backend
npm install
Write-Host "请确保MySQL已启动并已导入sql/schema.sql"
Write-Host "启动后端服务..."
node app.js
Write-Host "部署完成！前端页面可直接打开或用静态服务器访问"