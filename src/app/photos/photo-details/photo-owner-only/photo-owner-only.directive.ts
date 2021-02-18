import { Directive, Input, ElementRef, OnInit } from "@angular/core";
import { Renderer } from "@angular/core";

import { Photo } from "../../photo/photo";
import { UserService } from "../../../core/user/user.service";

@Directive({
    selector: '[photo-owner-only]'
})
export class PhotoOwnerOnlyDirective implements  OnInit {
    @Input() ownedPhoto: Photo;

    constructor(
        private elementRef: ElementRef<any>,
        private renderer: Renderer,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.userService.getUser()
            .subscribe(user => {
                const photoIsNotTheUser = !user || user.id != this.ownedPhoto.userId;
                
                if (photoIsNotTheUser) {
                    this.hideElement();
                }
            })
    }

    private hideElement() {
        this.renderer.setElementStyle(this.elementRef.nativeElement, 'display', 'none')
    }
}