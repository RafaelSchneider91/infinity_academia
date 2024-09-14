import { EnvironmentProviders, InjectionToken, Injector, NgZone } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { AppCheck as FirebaseAppCheck } from 'firebase/app-check';
import { AppCheck } from './app-check';
import * as i0 from "@angular/core";
export declare const PROVIDED_APP_CHECK_INSTANCES: InjectionToken<AppCheck[]>;
export declare function defaultAppCheckInstanceFactory(provided: FirebaseAppCheck[] | undefined, defaultApp: FirebaseApp): AppCheck;
export declare function appCheckInstanceFactory(fn: (injector: Injector) => FirebaseAppCheck): (zone: NgZone, injector: Injector, platformId: unknown) => AppCheck;
export declare class AppCheckModule {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<AppCheckModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AppCheckModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AppCheckModule>;
}
export declare function provideAppCheck(fn: (injector: Injector) => FirebaseAppCheck, ...deps: any[]): EnvironmentProviders;
