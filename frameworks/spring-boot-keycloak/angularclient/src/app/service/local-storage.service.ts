import {Inject, Injectable, InjectionToken} from "@angular/core";
import {isDefined} from "../commons/commons";

export let LOCAL_STORAGE_TOKEN = new InjectionToken('LOCAL_STORAGE');

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(@Inject(LOCAL_STORAGE_TOKEN) private localStorageProvider: any) {
  }

  setItem<T>(key: string, value: T): void {
    isDefined(value)
      ? this.localStorageProvider.setItem(key, JSON.stringify(value))
      : this.localStorageProvider.removeItem(key);
  }

  getItem<T>(key: string): T | null {
    const serializedObject = this.localStorageProvider.getItem(key);
    return isDefined(serializedObject) ? JSON.parse(serializedObject) as T : null;
  }

  removeItem(key: string): void {
    this.localStorageProvider.removeItem(key);
  }

  clear(): void {
    this.localStorageProvider.clear();
  }
}


declare const localStorage: any;

export function localStorageFactory(): any {
  return localStorage;
}


