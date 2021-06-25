call down.bat

DEL /Q /S .\mongo-db\data\*
Rmdir /Q /S .\mongo-db\data\diagnostic.data
Rmdir /Q /S .\mongo-db\data\journal
echo "" > .\mongo-db\data\.please-track-this-folder.txt

cd node-app
call npx tsc
cd ..

docker-compose up -d --build