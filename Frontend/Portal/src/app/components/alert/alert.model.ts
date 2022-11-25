export class Alert {
    id?: string;
    type?: AlertType;
    message?: string;
    timeout?: number;
    keepAfterRouteChange?: boolean;
    fade?: boolean;

    constructor(init?:Partial<Alert>) {
        Object.assign(this, init);
    }
}

export interface AlertOptions {
    id?: string;
    type?: AlertType;
    message?: string;
    timeout?: number;
    keepAfterRouteChange?: boolean;
}

export enum AlertType {
    Primary,
    Secondary,
    Success,
    Error,
    Info,
    Warning,
    Light,
    Dark
}