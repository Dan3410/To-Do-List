#!/bin/bash

echo Installing necessary packages for BackEnd
cd BackEnd && npm install && npm start
cd ..

echo

echo Installing necessary packages for FrontEnd
cd FrontEnd && npm install && npm start
cd ..

cd BackEnd && npm start




