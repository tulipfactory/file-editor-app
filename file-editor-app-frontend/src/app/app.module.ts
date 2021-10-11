import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FileService } from './services/file.service';
import { FormsModule } from '@angular/forms';
import { FileEditorComponent } from './components/file-editor/file-editor.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    FileEditorComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',   
        redirectTo: '/home', 
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'file-editor/:fileID',
        component: FileEditorComponent
      }
    ])
  ],
  providers: [FileService],
  bootstrap: [AppComponent]
})
export class AppModule { }