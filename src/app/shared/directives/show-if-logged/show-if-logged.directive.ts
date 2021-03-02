import { Directive, Input, ElementRef, OnInit } from "@angular/core";
import { Renderer } from "@angular/core";

import { UserService } from "../../../core/user/user.service";

@Directive({
    selector: '[showIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit {
    currentDisplay: string;

    constructor(
        private elementRef: ElementRef<any>,
        private renderer: Renderer,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.currentDisplay = getComputedStyle(this.elementRef.nativeElement).display;

        this.userService
            .getUser()
            .subscribe(user => {
                if (user) {
                    this.renderer.setElementStyle(this.elementRef.nativeElement, 'display', this.currentDisplay);
                } else {
                    this.currentDisplay = getComputedStyle(this.elementRef.nativeElement).display;
                    this.renderer.setElementStyle(this.elementRef.nativeElement, 'display', 'none');
                }
            });
    }
}