
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { map } from "rxjs/operators";
import { AppConfig } from "../appConstants/appConfig.js";
import jsonData from "../../assets/data/data.json";
import { Storage } from "@ionic/storage";

let httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "user-key": AppConfig.userKey,
  }),
};

@Injectable({
  providedIn: 'root'
})
export class UserData {
  favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public storage: Storage,
    public http: HttpClient
  ) { }


  login(username: string){
    let loginInfo = {
      "Email": "DevCustomer@dev.com",
      "Password": "Admin@123"
    }
      const apiUrl = `${AppConfig.serverURL}/api/user/login`;
      return this.http.post(apiUrl, loginInfo, httpOptions).pipe(
        map((data: any) => {
          this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
            console.log("dataid", data.id)
              this.setUserId(data.id);
              return window.dispatchEvent(new CustomEvent('user:login'));
            });
        })
      );
    
  }

  signup(username: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUserId(username);
      return window.dispatchEvent(new CustomEvent('user:signup'));
    });
  }

  logout(): Promise<any> {
    return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
      return this.storage.remove('loggedInUserId');
    }).then(() => {
      window.dispatchEvent(new CustomEvent('user:logout'));
    });
  }

  setUserId(Id: string): Promise<any> {
    console.log("dataid", Id)
    return this.storage.set('loggedInUserId', Id);
  }

  getUsername(): Promise<string> {
    return this.storage.get('loggedInUserId').then((value) => {
      return value;
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }

}
