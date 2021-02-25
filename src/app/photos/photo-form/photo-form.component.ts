import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';

import { PhotoService } from '../photo/photo.service';
import { AlertService } from '../../shared/components/alert/alert.service';
import { UserService } from '../../core/user/user.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {
  photoForm: FormGroup;
  file: File;
  previewPhotoBase64: string;
  percentDone = 0;

  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]
    })
  }

  upload(): void {
    const description = this.photoForm.get('description').value;
    const allowComments = this.photoForm.get('allowComments').value;
    
    this.photoService
      .upload(description, allowComments, this.file)
      .pipe(finalize(() => {
        this.router.navigate(['user', this.userService.getUserName()]);
      }))
      .subscribe((event: HttpEvent<any>) => {
        if (event.type == HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total)
        } else if (event instanceof HttpResponse) {
          this.alertService.success('Upload complete', true);
        }
      }, error => {
        console.log(error);
        this.alertService.danger('Upload error!', true);
      });

  }

  handleFile(file: File) {
    this.file = file;
    this.convertFilePhotoToBase64(file);
  }

  private convertFilePhotoToBase64(file: File) {
    const fileReader = new FileReader();
    fileReader.onload = (event: any) => this.previewPhotoBase64 = event.target.result;
    fileReader.readAsDataURL(file);
  }
}
