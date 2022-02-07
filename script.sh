#!/bin/bash

mysql_config_editor set --login-path=toDoList --host=localhost --user=root --password

mysql --login-path=toDoList -e "create database toDoDB; CREATE USER 'toDoUser'@'localhost' IDENTIFIED BY 'password'; GRANT ALL PRIVILEGES ON toDoDB.* TO 'toDoUser'@'localhost'; FLUSH PRIVILEGES;"


echo Installing necessary packages for BackEnd
cd BackEnd && npm install
cd ..

echo

echo Installing necessary packages for FrontEnd
cd FrontEnd && npm install
cd ..

cd BackEnd && npm start




