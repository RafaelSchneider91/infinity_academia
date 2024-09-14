import { VertexAI as FirebaseVertexAI } from 'firebase/vertexai-preview';
export interface VertexAI extends FirebaseVertexAI {
}
export declare class VertexAI {
    constructor(vertexai: FirebaseVertexAI);
}
export declare const VERTEX_AI_PROVIDER_NAME = "vertexai";
export interface VertexAIInstances extends Array<FirebaseVertexAI> {
}
export declare class VertexAIInstances {
    constructor();
}
export declare const vertexAIInstance$: import("rxjs").Observable<FirebaseVertexAI>;
