export class Alert {
    constructor(
        public readonly alertType: AlertType,
        public readonly message: string
    ) { }
}

export enum AlertType {
    Success,
    Warning,
    Danger,
    Info
}