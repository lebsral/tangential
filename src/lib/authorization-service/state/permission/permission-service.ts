import {AuthPermission} from "@tangential/media-types";
import {Observable} from "rxjs";

export abstract class PermissionService {
  public readonly valueRemoved$:Observable<string>


  abstract values$(): Observable<AuthPermission[]>
  abstract valuesOnce(): Promise<AuthPermission[]>
  abstract create(entity: AuthPermission): Promise<void>
  abstract value(entityKey: string): Promise<AuthPermission>
  abstract update(current: AuthPermission, previous: AuthPermission): Promise<void>
  abstract remove(entityKey: string): Promise<string>
  abstract destroy(): void
}
