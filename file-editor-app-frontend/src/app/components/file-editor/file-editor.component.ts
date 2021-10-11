import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-file-editor',
  templateUrl: './file-editor.component.html',
  styleUrls: ['./file-editor.component.css']
})
export class FileEditorComponent implements OnInit {
  fileID:string = "";
  fileData:any = {};

  constructor(private route: ActivatedRoute, private fileService: FileService,
    public router:Router) {
      this.route.params.subscribe(params => {
        this.fileID = params.fileID;
      });
     }

  ngOnInit(): void {
    this.fileService.getFile(this.fileID).subscribe(response=>{
      this.fileData = response;
    })
  }
  saveFile = () => {
    this.fileService.updateFile(this.fileID,
      this.fileData).subscribe(response=>{
        this.router.navigateByUrl("/home");
      })
  }

}
