import {Inject, Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
  
})
export class SessionStorageService {
  TOKEN = 'SESSION_TOKEN'; // Use this constant for the session storage entry key

  private get window(): Window {
    return window;
  }

  
  setToken(token: string):void{
   this.window.sessionStorage.setItem(this.TOKEN,token)
  }

  getToken():string|null{
    return this.window.sessionStorage.getItem(this.TOKEN)
  }

  deleteToken(){
    this.window.sessionStorage.removeItem(this.TOKEN)
  }
}
