#!/bin/bash
echo "安装后端依赖..."
cd "$(dirname "$0")/../backend"
npm install
echo "请确保MySQL已启动并已导入sql/schema.sql"
echo "启动后端服务..."
node app.js &
echo "部署完成！前端页面可直接打开或用静态服务器访问"