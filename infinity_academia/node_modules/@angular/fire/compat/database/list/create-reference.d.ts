import { AngularFireDatabase } from '../database';
import { AngularFireList, DatabaseQuery } from '../interfaces';
export declare function createListReference<T = any>(query: DatabaseQuery, afDatabase: AngularFireDatabase): AngularFireList<T>;
