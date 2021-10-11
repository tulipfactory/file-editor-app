const express = require("express");
const app = express();
const PORT = 2222;

//Set up CORS so angular and express can communicate
const cors = require("cors");
app.use(cors());
//Set up express so it can accept JSON payload in requests
app.use(express.json());
//import fs so we can create, edit, read and remove files
const fs = require("fs");


//get the list of available files
app.get("/files", (request, response)=>{
    let availableFilesAsJson = [];
    //find all files in the available-files folder
    let availableFilesAsBinary = fs.readdirSync('available-files');
    //go through each file found
    availableFilesAsBinary.forEach(file => {
        let fileAsBinary = fs.readFileSync('available-files/' + file);
        //convert the file to JSON
        let fileAsJSON = JSON.parse(fileAsBinary);
        //add the file to availableFiles array
        availableFilesAsJson.push(fileAsJSON);
    });
    //return the available files as an array of JSON objects
    response.send(availableFilesAsJson);

});
//Get a specific file
app.get("files/:fileID", (request, response)=>{
    fileIDWeAreLookingFor = request.params.fileID;
    //find all files in the available-files folder
    let availableFilesAsBinary = fs.redaddirSync('available-files');
    //go through each file found
    availableFilesAsBinary.forEach(file=> {
        let fileAsBinary = fs.readFileSync('available-files/' + file);
        //convert the file to JSON
        let fileAsJSON = JSON.parse(fileAsBinary);
        //check if the file's ID is the one we're looking for
        if(fileAsJSON.fileID === fileIDWeAreLookingFor) {
            //send the correct file JSON back in the response
            response.send(fileAsJSON)
        }
    })

});
//Create a new file
app.post("/files", (request, response)=>{
    let filePayload = request.body;
    //create file id based on the date and time right now 
    //managing files using fileID makes it so we can have several files
    //with the same name
    //without overwriting them
    let fileID = Date.now().toString()
    //add the fileID to the payloard
    filePayload.fileID = fileID;
    //stringify the payload so we can write it to a JSON file
    let fileFriendlyData = JSON.stringify(filePayload)
    //create a JSON file in the available-files folder
    //with the file payload data using fs
    fs.writeFileSync("available-files/" + fileID + ".json",
    fileFriendlyData);
    //show in the console that we're creating a new file
    console.log("Creating a new file: " + fileID + ".json");
    //return the filePayload (with the new fileID) in the response
    response.send(filePayload);
});
//Edit a file
app.put("/files/:fileID", (request, response)=>{
    let fileIDWeAreLookingFor = request.params.fileID;
    //path for the file we're looking for (Example: 
    //available-files/12345.json)
    let pathForFile = "available-files/" + fileIDWeAreLookingFor +
    ".json";
    //stringify the payload so we can write it to a JSON file
    let newfilePayload = request.body;
    let newFileFriendlyData = JSON.stringify(newfilePayload);
    //replace the old file content with the new file content
    fs.writeFileSync(pathForFile, newFileFriendlyData)
    //return response when successful
    response.send({});

});
//Delete a file
app.delete("files/:fileID", (request, response)=>{
    let fileIDWeAreLookingFor = request.params.fileID;
    //path for the file we're looking for (example :
    //available-files/12345.json)
    let pathForFile = "available-files/" + fileIDWeAreLookingFor +
    ".json";
    //delete the file from the available-files folder
    fs.unlinkSync(pathForFile);
    //reqturn response when successful
    response.send({});

});
app.listen(PORT, function(){
    console.log("server is doing good. ready for requests ^W^")
});
