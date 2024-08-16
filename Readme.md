# README #

## Folder Structure ##
### client ###
`client` folder contains html file with included javascript. 

* HTML file accepts the file input from the user to upload file. 
* Once uploading the file, user can click on Submit button which invokes submitForm() reads the content from teh upllaoded file & sends the content in the request parameter while fetching the endpoint `http://localhost:3000/api/process-text`
* Original file content as well as processed conent is shown on the HTML page.
  
### server ###
* `server` folder is node server that uses express framework where the REST endpoint is written that runs at port 3000.
* `/api/process-text` is a POST route that accepts request, finds out the most used word, changes the most used word with `foo` & `bar`, modifies the text with newwly processed word. The modified text is sent as response.

## Run server ##
To start the server run the below commands
`cd server`
`node server.js`
## Run client ##
The web app can be loaded via VS Code by clicking `open with live server` so the html page is loaded in teh browser.