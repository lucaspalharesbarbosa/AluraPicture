import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PhotoService } from '../photo/photo.service';
import { AlertService } from '../../shared/components/alert/alert.service';
import { UserService } from '../../core/user/user.service';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {
  photoForm: FormGroup;
  file: File;
  previewPhotoBase64: string;

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
      .subscribe(() => {
        this.alertService.success('Upload complete', true);
        this.router.navigate(['user', this.userService.getUserName()]);
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
