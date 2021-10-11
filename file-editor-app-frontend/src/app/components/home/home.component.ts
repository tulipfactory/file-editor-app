import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  availableFiles:any[] = [];
  newFileTitle:string = "";

  constructor(public fileService:FileService, public router:Router) {
    
  }

  ngOnInit(): void {
    this.fileService .getAvailableFiles().subscribe(response=>{
      this.availableFiles = response as any[];
    });
  }

  createFile = () => {
    //a payload is just a javascript object that is sent with requests
    let filePayload=  {
      title: this.newFileTitle,
      content: "",
      fileID: null
    };
    this.fileService.createFile(filePayload).subscribe(response => {
      let newFileWithFileID = response;
      this.availableFiles.push(newFileWithFileID)
    }) 
    //this method will send a request to the Express server to create a new file
    //which will return an object with a new document. 
    //then, we add the files array, so we can edit or delete it 
    //now when you type something into the text input and click the 
    //CREATE NEW FILE button , it should show a new file
    //with EDIT and DELETE buttons

  }
  editFile = (file:any) => {
    this.router.navigateByUrl("/file-editor/" + file.fileID);
    //this will take us to the file editor page and pass it the fileID,
    //so it can get the current file data from the express server and
    //save new data

  }
  deleteFile = (file:any) => {
    this.fileService.deleteFile(file.fileID).subscribe(response=>{
      //remove file from available files array after deletion in the backend
      this.availableFiles.splice(this.availableFiles.indexOf(file), 1);
    })
    
  }

}
