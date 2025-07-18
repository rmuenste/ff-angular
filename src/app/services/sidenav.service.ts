import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private sidenavOpen = new BehaviorSubject<boolean>(false);

  constructor() { }

  get isSidenavOpen$() {
    return this.sidenavOpen.asObservable();
  }

  toggleSidenav() {
    this.sidenavOpen.next(!this.sidenavOpen.value);
  }

  setSidenav(isOpen: boolean) {
    this.sidenavOpen.next(isOpen);
  }
}
