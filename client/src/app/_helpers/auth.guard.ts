import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { TokenStorageService } from '../_services/token-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private tokenStorage: TokenStorageService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (this.tokenStorage.getToken()) {
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }
}