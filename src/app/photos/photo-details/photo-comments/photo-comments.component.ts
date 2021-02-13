import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { PhotoComment } from "../../photo/photo-comment";
import { PhotoService } from "../../photo/photo.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";

@Component({
    selector: 'ap-photo-comments',
    templateUrl: './photo-comments.component.html'
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
        this.getPhotoComments();
        this.createCommentForm();
    }

    save() {
        const comment = this.commentForm.get('comment').value as string;
        this.photoService
            .addComment(this.photoId, comment)
            .subscribe(() => {
                this.commentForm.reset();
                alert('Comentário adicionado com sucesso!');
            })
    }

    private getPhotoComments() {
        this.comments$ = this.photoService.getComments(this.photoId);
    }

    private createCommentForm() {
        this.commentForm = this.formBuilder.group({
            comment: ['', Validators.maxLength(300)]
        })
    }
}