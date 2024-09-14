import { Version } from '@angular/core';
import { FirebaseApp } from 'firebase/app';
import type { AppCheck } from 'firebase/app-check';
export declare const VERSION: Version;
export declare const ɵisSupportedError: (module: string) => string;
export declare function ɵgetDefaultInstanceOf<T = unknown>(identifier: string, provided: T[] | undefined, defaultApp: FirebaseApp): T | undefined;
export declare const ɵgetAllInstancesOf: <T = unknown>(identifier: string, app?: FirebaseApp) => T[];
export interface ɵAppCheckInstances extends Array<AppCheck> {
}
export declare class ɵAppCheckInstances {
    constructor();
}
export declare const ɵAPP_CHECK_PROVIDER_NAME = "app-check";
