import { AngularFireDatabase } from '../database';
import { AngularFireObject, DatabaseQuery } from '../interfaces';
export declare function createObjectReference<T = any>(query: DatabaseQuery, afDatabase: AngularFireDatabase): AngularFireObject<T>;
