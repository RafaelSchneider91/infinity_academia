import { EnvironmentProviders, InjectionToken, Injector, NgZone } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { VertexAI as FirebaseVertexAI } from 'firebase/vertexai-preview';
import { VertexAI } from './vertexai';
import * as i0 from "@angular/core";
export declare const PROVIDED_VERTEX_AI_INSTANCES: InjectionToken<VertexAI[]>;
export declare function defaultVertexAIInstanceFactory(provided: FirebaseVertexAI[] | undefined, defaultApp: FirebaseApp): VertexAI;
export declare function vertexAIInstanceFactory(fn: (injector: Injector) => FirebaseVertexAI): (zone: NgZone, injector: Injector) => VertexAI;
export declare class VertexAIModule {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<VertexAIModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<VertexAIModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<VertexAIModule>;
}
export declare function provideVertexAI(fn: (injector: Injector) => FirebaseVertexAI, ...deps: any[]): EnvironmentProviders;
