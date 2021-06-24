call down.bat
cd node-app
call npx tsc
cd ..
docker-compose up -d --build