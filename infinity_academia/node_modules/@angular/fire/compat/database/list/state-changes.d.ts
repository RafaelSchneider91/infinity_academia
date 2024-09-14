import { SchedulerLike } from 'rxjs';
import { ChildEvent, DatabaseQuery } from '../interfaces';
export declare function stateChanges<T>(query: DatabaseQuery, events?: ChildEvent[], scheduler?: SchedulerLike): import("rxjs").Observable<import("../interfaces").AngularFireAction<import("../interfaces").DatabaseSnapshot<T>>>;
