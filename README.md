# cp-calculator

<h2>Description:</h2>
</br>
This is a test project for creating a cross platform calculator :)
</br></br></br>

<h2>Run:</h2>
</br>
npm start
</br></br></br>

<h2>Build Executable:</h2>
</br>

[windows] </br>
1. Install "electron-packager" global </br>
cmd> npm install -g electron-packager </br>
2. Prepare to distribute </br>
cmd> electron-packager . --electron-version=1.0.0 --asar --overwrite </br>

--this may work on other OS too
</br>

[other os] </br>
1. Add this line to package.json > scripts >  </br>
"build": "electron-packager . myApp" </br>
2. Prepare to distribute </br>
cmd> npm run build </br>