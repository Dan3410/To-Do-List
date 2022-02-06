#!/bin/bash

echo "Enter SQL's root password:"
read rootPassword

mysql -u root -p$rootPassword -e "create database toDoDB; CREATE USER 'toDoUser'@'localhost' IDENTIFIED BY 'password'; GRANT ALL PRIVILEGES ON toDoDB.* TO 'toDoUser'@'localhost'; FLUSH PRIVILEGES;"


echo Installing necessary packages for BackEnd
cd BackEnd && npm install && npm start
cd ..

echo

echo Installing necessary packages for FrontEnd
cd FrontEnd && npm install && npm start
cd ..

cd BackEnd && npm start




