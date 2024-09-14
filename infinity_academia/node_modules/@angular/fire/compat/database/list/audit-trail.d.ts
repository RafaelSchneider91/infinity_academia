import { Observable, SchedulerLike } from 'rxjs';
import { ChildEvent, DatabaseQuery, SnapshotAction } from '../interfaces';
export declare function auditTrail<T>(query: DatabaseQuery, events?: ChildEvent[], scheduler?: SchedulerLike): Observable<SnapshotAction<T>[]>;
