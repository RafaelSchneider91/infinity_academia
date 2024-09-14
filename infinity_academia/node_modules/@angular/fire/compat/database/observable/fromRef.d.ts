import { Observable, SchedulerLike } from 'rxjs';
import { AngularFireAction, DatabaseQuery, DatabaseSnapshot, ListenEvent } from '../interfaces';
/**
 * Create an observable from a Database Reference or Database Query.
 * @param ref Database Reference
 * @param event Listen event type ('value', 'added', 'changed', 'removed', 'moved')
 * @param listenType 'on' or 'once'
 * @param scheduler - Rxjs scheduler
 */
export declare function fromRef<T>(ref: DatabaseQuery, event: ListenEvent, listenType?: string, scheduler?: SchedulerLike): Observable<AngularFireAction<DatabaseSnapshot<T>>>;
