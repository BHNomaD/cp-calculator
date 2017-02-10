# cp-calculator

Description:
</br>
This is a test project for creating a cross platform calculator :)
</br>

Run:
</br>
npm start
</br>

Build Executable:
</br></br>

[windows] </br>
1. Install "electron-packager" global </br>
cmd> npm install -g electron-packager </br>
2. Prepare to distribute </br>
cmd> electron-packager . --electron-version=1.0.0 --asar --overwrite </br>

--this may work on other OS too

[other os]

1. Add this line to package.json > scripts > 
"build": "electron-packager . myApp"
2. Prepare to distribute
cmd> npm run build