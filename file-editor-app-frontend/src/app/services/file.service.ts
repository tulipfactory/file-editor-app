import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(public http:HttpClient) { }
 
  getAvailableFiles = () => {
       return this.http.get(environment.apiURL + "/files/");
       //we use the HTTP GET method when getting files

  }
 
  getFile = (fileID:string) => {
    return this.http.get(environment.apiURL + "/files/" + fileID);
    //we use the HTTP GET method when getting files
 
  }
 
  createFile = (payload:any) => {
    return this.http.post(environment.apiURL + "/files/", payload);
    //we use the HTTP POST method when creating files
  }
 
  updateFile = (fileID:string, payload:any) => {
    return this.http.put(environment.apiURL + "/files/" + fileID, 
    payload);
    //we use the HTTP POST method when updating files
    
  }
 
  deleteFile = (fileID:string) => {
    return this.http.delete(environment.apiURL + "/files/" + fileID);
 
  }
}
