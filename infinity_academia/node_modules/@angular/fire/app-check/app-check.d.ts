import { AppCheck as FirebaseAppCheck } from 'firebase/app-check';
export interface AppCheck extends FirebaseAppCheck {
}
export declare class AppCheck {
    constructor(appCheck: FirebaseAppCheck);
}
export declare const appCheckInstance$: import("rxjs").Observable<FirebaseAppCheck>;
