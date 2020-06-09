
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
    "user-key": AppConfig.userKey
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


  login(username: string, password : string){
   
    let loginInfo = {
      "Email": username,
      "Password": password
    }
      const apiUrl = `${AppConfig.serverURL}/api/user/login`;
      return this.http.post(apiUrl, loginInfo, httpOptions).pipe(
        map((data: any) => {
          if(data.data.length){
            this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
              console.log("data.data[0].id", data.data[0].id)
              this.setUserId(data.data[0].id);
             this.setToken(data.token)
             window.dispatchEvent(new CustomEvent('user:login'));
             return data.data
              });
          }
        else{
          return data.data
        }
        })
      );
  }

  signup(deviceLocation , data){
    let userInfo = {
      "Name": data.name,
      "Email": data.email,
      "PhoneNumber": data.phonenumber,
      "StreetAddress": deviceLocation.deviceLocation,
      "State": "mh",
      "PostalCode": "425544",
      "Password": data.password,
      "City": deviceLocation.cityName
    }
      const apiUrl = `${AppConfig.serverURL}/api/user/register`;
      return this.http.post(apiUrl, userInfo, httpOptions).pipe(
        map((data: any) => {
         console.log(data)
          return data;
        })
      );
    // return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
    //   this.setUserId(username);
    //   return window.dispatchEvent(new CustomEvent('user:signup'));
    // });
  }

  logout(): Promise<any> {
    return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
     
        this.storage.remove('loggedInUserId')
        this.storage.remove('userToken')
      
    }).then(() => {
      window.dispatchEvent(new CustomEvent('user:logout'));
    });
  }

  setUserId(Id: string): Promise<any> {
    return this.storage.set('loggedInUserId', Id);
  }

  setToken(userToken: string): Promise<any> {
    return this.storage.set('userToken', userToken);
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
