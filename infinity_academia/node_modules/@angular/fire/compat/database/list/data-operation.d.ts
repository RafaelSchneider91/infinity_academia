import { DatabaseReference, FirebaseOperation } from '../interfaces';
export declare function createDataOperationMethod(ref: DatabaseReference, operation: string): <T>(item: FirebaseOperation, value: T) => Promise<void>;
