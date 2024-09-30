import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const AuthGuard = () => {
    const router = inject(Router);
    const token = sessionStorage.getItem('loginToken');
    
    if (token) {
        return true
    } else {
        router.navigate(['login'])
        return false;
    }
}

