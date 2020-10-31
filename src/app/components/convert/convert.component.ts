import {Component, OnInit} from '@angular/core';
import {FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {HttpClient} from '@angular/common/http';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.css']
})
export class ConvertComponent implements OnInit {
  public files: NgxFileDropEntry[] = [];
  public myFile: NgxFileDropEntry;
  private SERVICE_URL = 'http://localhost:8080/converter';


  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    this.myFile = files[0];
    if (this.myFile.fileEntry.isFile) {
      const fileEntry = this.myFile.fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        let fileContent;
        const reader = new FileReader();
        reader.readAsText(file, 'utf-8');
        reader.onload = () => {
          fileContent = reader.result;
          this.request(fileContent);
        };
      });
    }
  }

  private request(fileContent) {
    console.log(fileContent);

    const formData = new FormData();
    formData.append('file', fileContent);
    // @ts-ignore
    this.http.post<string>(this.SERVICE_URL, formData, {responseType: 'blob'}).subscribe(
      (res: Blob) => {
        console.log(res);
        saveAs(res, 'result.xml');
      },
      // tslint:disable-next-line:ban-types
      (err: String) => console.log('HATA:  ', err)
    );
  }
}
