import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from './auth0-variables';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';

(window as any).global = window;

@Injectable()
export class AuthService {

    auth0 = new auth0.WebAuth({
        clientID: AUTH_CONFIG.CLIENT_ID,
        domain: AUTH_CONFIG.CLIENT_DOMAIN,
        responseType: 'token id_token',
        audience: AUTH_CONFIG.AUDIENCE,
        redirectUri: AUTH_CONFIG.REDIRECT,
        scope: AUTH_CONFIG.SCOPE
      });

    userProfile: any;
    
    constructor(public router:Router){}

    public login(): void {
        this.auth0.authorize();
    }

    public handleAuthentication(): void {
        this.auth0.parseHash((err,authResult) => {
            if(authResult && authResult.accessToken && authResult.idToken){
                this.setSession(authResult);
                this.router.navigate(['/profile']);
            }

            else if(err){
                this.router.navigate(['/home']);
                console.log(err);
                alert("check console");
            }
        });
    }

    public getProfile(cb): void {
        const accessToken = localStorage.getItem('access_token');
        if(!accessToken){
            throw new Error('access token must exist to fetch profile');
        }

        const self = this;
        this.auth0.client.userInfo(accessToken, (err, profile) => {
            if(profile){
                self.userProfile = profile;
            }
            cb(err, profile);
        });
    }

    private setSession(authResult: any) {
            // Set the time that the access token will expire at

        const expiresAt = JSON.stringify(
            authResult.expiresIn * 1000 + new Date().getTime()
              );
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    }

    public logout(): void {
        // remove token and expiry time 
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        // after logout redirect to home route
        this.router.navigate(['/']);
    }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // access token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
        return new Date().getTime() < expiresAt;
      }
}