import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";
import { switchMap, tap } from 'rxjs/operators';

import { PhotoComment } from "../../photo/photo-comment";
import { PhotoService } from "../../photo/photo.service";

@Component({
    selector: 'ap-photo-comments',
    templateUrl: './photo-comments.component.html',
    styleUrls: ['photo-comments.css']
})
export class PhotoCommentsComponent implements OnInit {
    @Input() photoId: number;

    comments$: Observable<PhotoComment[]>;
    commentForm: FormGroup;

    constructor(
        private photoService: PhotoService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.comments$ = this.getPhotoComments();
        this.createCommentForm();
    }

    save() {
        const comment = this.commentForm.get('comment').value as string;
        this.comments$ = this.photoService
            .addComment(this.photoId, comment)
            .pipe(switchMap(() => this.getPhotoComments()))
            .pipe(tap(() => {
                this.commentForm.reset();
            }));
    }

    private getPhotoComments(): Observable<PhotoComment[]> {
        return this.photoService.getComments(this.photoId);
    }

    private createCommentForm() {
        this.commentForm = this.formBuilder.group({
            comment: ['', Validators.maxLength(300)]
        })
    }
}