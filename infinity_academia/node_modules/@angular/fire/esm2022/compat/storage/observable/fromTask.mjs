import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
// need to import, else the types become import('firebase/compat/app').default.storage.UploadTask
// and it no longer works w/Firebase v7
// Things aren't working great, I'm having to put in a lot of work-arounds for what
// appear to be Firebase JS SDK bugs https://github.com/firebase/firebase-js-sdk/issues/4158
export function fromTask(task) {
    return new Observable(subscriber => {
        const progress = (snap) => subscriber.next(snap);
        const error = e => subscriber.error(e);
        const complete = () => subscriber.complete();
        // emit the current snapshot, so they don't have to wait for state_changes
        // to fire next... this is stale if the task is no longer running :(
        progress(task.snapshot);
        const unsub = task.on('state_changed', progress);
        // it turns out that neither task snapshot nor 'state_changed' fire the last
        // snapshot before completion, the one with status 'success" and 100% progress
        // so let's use the promise form of the task for that
        task.then(snapshot => {
            progress(snapshot);
            complete();
        }, e => {
            // TODO investigate, again this is stale, we never fire a canceled or error it seems
            progress(task.snapshot);
            error(e);
        });
        // on's type if Function, rather than () => void, need to wrap
        return function unsubscribe() {
            unsub();
        };
    }).pipe(
    // deal with sync emissions from first emitting `task.snapshot`, this makes sure
    // that if the task is already finished we don't emit the old running state
    debounceTime(0));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbVRhc2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29tcGF0L3N0b3JhZ2Uvb2JzZXJ2YWJsZS9mcm9tVGFzay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUc5QyxpR0FBaUc7QUFDakcsdUNBQXVDO0FBRXZDLG1GQUFtRjtBQUNuRiw0RkFBNEY7QUFDNUYsTUFBTSxVQUFVLFFBQVEsQ0FBQyxJQUFnQjtJQUN2QyxPQUFPLElBQUksVUFBVSxDQUFxQixVQUFVLENBQUMsRUFBRTtRQUNyRCxNQUFNLFFBQVEsR0FBRyxDQUFDLElBQXdCLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckUsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sUUFBUSxHQUFHLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM3QywwRUFBMEU7UUFDMUUsb0VBQW9FO1FBQ3BFLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDakQsNEVBQTRFO1FBQzVFLDhFQUE4RTtRQUM5RSxxREFBcUQ7UUFDckQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNuQixRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbkIsUUFBUSxFQUFFLENBQUM7UUFDYixDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7WUFDTCxvRkFBb0Y7WUFDcEYsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN4QixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztRQUNILDhEQUE4RDtRQUM5RCxPQUFPLFNBQVMsV0FBVztZQUN6QixLQUFLLEVBQUUsQ0FBQztRQUNWLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDLElBQUk7SUFDTCxnRkFBZ0Y7SUFDaEYsMkVBQTJFO0lBQzNFLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FDaEIsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBVcGxvYWRUYXNrLCBVcGxvYWRUYXNrU25hcHNob3QgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcblxuLy8gbmVlZCB0byBpbXBvcnQsIGVsc2UgdGhlIHR5cGVzIGJlY29tZSBpbXBvcnQoJ2ZpcmViYXNlL2NvbXBhdC9hcHAnKS5kZWZhdWx0LnN0b3JhZ2UuVXBsb2FkVGFza1xuLy8gYW5kIGl0IG5vIGxvbmdlciB3b3JrcyB3L0ZpcmViYXNlIHY3XG5cbi8vIFRoaW5ncyBhcmVuJ3Qgd29ya2luZyBncmVhdCwgSSdtIGhhdmluZyB0byBwdXQgaW4gYSBsb3Qgb2Ygd29yay1hcm91bmRzIGZvciB3aGF0XG4vLyBhcHBlYXIgdG8gYmUgRmlyZWJhc2UgSlMgU0RLIGJ1Z3MgaHR0cHM6Ly9naXRodWIuY29tL2ZpcmViYXNlL2ZpcmViYXNlLWpzLXNkay9pc3N1ZXMvNDE1OFxuZXhwb3J0IGZ1bmN0aW9uIGZyb21UYXNrKHRhc2s6IFVwbG9hZFRhc2spIHtcbiAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPFVwbG9hZFRhc2tTbmFwc2hvdD4oc3Vic2NyaWJlciA9PiB7XG4gICAgY29uc3QgcHJvZ3Jlc3MgPSAoc25hcDogVXBsb2FkVGFza1NuYXBzaG90KSA9PiBzdWJzY3JpYmVyLm5leHQoc25hcCk7XG4gICAgY29uc3QgZXJyb3IgPSBlID0+IHN1YnNjcmliZXIuZXJyb3IoZSk7XG4gICAgY29uc3QgY29tcGxldGUgPSAoKSA9PiBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgLy8gZW1pdCB0aGUgY3VycmVudCBzbmFwc2hvdCwgc28gdGhleSBkb24ndCBoYXZlIHRvIHdhaXQgZm9yIHN0YXRlX2NoYW5nZXNcbiAgICAvLyB0byBmaXJlIG5leHQuLi4gdGhpcyBpcyBzdGFsZSBpZiB0aGUgdGFzayBpcyBubyBsb25nZXIgcnVubmluZyA6KFxuICAgIHByb2dyZXNzKHRhc2suc25hcHNob3QpO1xuICAgIGNvbnN0IHVuc3ViID0gdGFzay5vbignc3RhdGVfY2hhbmdlZCcsIHByb2dyZXNzKTtcbiAgICAvLyBpdCB0dXJucyBvdXQgdGhhdCBuZWl0aGVyIHRhc2sgc25hcHNob3Qgbm9yICdzdGF0ZV9jaGFuZ2VkJyBmaXJlIHRoZSBsYXN0XG4gICAgLy8gc25hcHNob3QgYmVmb3JlIGNvbXBsZXRpb24sIHRoZSBvbmUgd2l0aCBzdGF0dXMgJ3N1Y2Nlc3NcIiBhbmQgMTAwJSBwcm9ncmVzc1xuICAgIC8vIHNvIGxldCdzIHVzZSB0aGUgcHJvbWlzZSBmb3JtIG9mIHRoZSB0YXNrIGZvciB0aGF0XG4gICAgdGFzay50aGVuKHNuYXBzaG90ID0+IHtcbiAgICAgIHByb2dyZXNzKHNuYXBzaG90KTtcbiAgICAgIGNvbXBsZXRlKCk7XG4gICAgfSwgZSA9PiB7XG4gICAgICAvLyBUT0RPIGludmVzdGlnYXRlLCBhZ2FpbiB0aGlzIGlzIHN0YWxlLCB3ZSBuZXZlciBmaXJlIGEgY2FuY2VsZWQgb3IgZXJyb3IgaXQgc2VlbXNcbiAgICAgIHByb2dyZXNzKHRhc2suc25hcHNob3QpO1xuICAgICAgZXJyb3IoZSk7XG4gICAgfSk7XG4gICAgLy8gb24ncyB0eXBlIGlmIEZ1bmN0aW9uLCByYXRoZXIgdGhhbiAoKSA9PiB2b2lkLCBuZWVkIHRvIHdyYXBcbiAgICByZXR1cm4gZnVuY3Rpb24gdW5zdWJzY3JpYmUoKSB7XG4gICAgICB1bnN1YigpO1xuICAgIH07XG4gIH0pLnBpcGUoXG4gICAgLy8gZGVhbCB3aXRoIHN5bmMgZW1pc3Npb25zIGZyb20gZmlyc3QgZW1pdHRpbmcgYHRhc2suc25hcHNob3RgLCB0aGlzIG1ha2VzIHN1cmVcbiAgICAvLyB0aGF0IGlmIHRoZSB0YXNrIGlzIGFscmVhZHkgZmluaXNoZWQgd2UgZG9uJ3QgZW1pdCB0aGUgb2xkIHJ1bm5pbmcgc3RhdGVcbiAgICBkZWJvdW5jZVRpbWUoMClcbiAgKTtcbn1cbiJdfQ==