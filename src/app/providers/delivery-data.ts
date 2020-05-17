import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { map } from "rxjs/operators";
import { AppConfig } from "../appConstants/appConfig.js";


let httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "user-key": AppConfig.userKey,
  }),
};

@Injectable({
  providedIn: "root",
})
export class DeliveryData {
  data: any;

  constructor(public http: HttpClient) {}

  load(): any {
    if (this.data) {
      return of(this.data);
    } else {
      return this.http.get("assets/data/data.json");
    }
  }

  getRestaurants(segment: string, queryText : string) {
    let restaurants = [], 
    apiUrl = `${AppConfig.serverURL}/search?q=pune`;

    if(queryText && queryText!=="pune"){
      apiUrl = `${AppConfig.serverURL}/search?q=${queryText}`;
    }
    if(segment && segment !== "all" ){
      apiUrl= `${apiUrl}&category=${segment}`
    }
    
    return this.http.get(apiUrl, httpOptions).pipe(
      map((data: any) => {
      data.restaurants.forEach(item => {
        console.log(item.restaurant.cuisines)
        if(item.restaurant.thumb){
          restaurants.push({
            id : item.restaurant.id,
            name : item.restaurant.name,
            thumb : item.restaurant.thumb,
            timings : item.restaurant.timings,
            location  : item.restaurant.location.locality_verbose,
            price_range :  item.restaurant.price_range,
            average_cost_for_two : item.restaurant.average_cost_for_two
          })
        }
       
      });
       return restaurants;
      })
    );
  }

  getFoodSegments() {
    let categories = [] ;
    const apiUrl = `${AppConfig.serverURL}/categories`;
    return this.http.get(apiUrl, httpOptions).pipe(
      map((data: any) => {
       data.categories.forEach(category => {
         categories.push(category.categories)
       });
        return categories;
      })
    );
  }

  getRestaurantList(segment: string) {
    return this.load().pipe(
      map((data: any) => {
        let restaurants: any;
        if (segment !== "all") {
          restaurants = data.restaurantList.filter(function (e) {
            return e.type === segment;
          });
          return restaurants;
        } else {
          return data.restaurantList;
        }
      })
    );
  }

  getMealList() {
    // return this.load().pipe(
    //   map((data: any) => {
    //     console.log("data", data.foodItemList);
    //     return data.foodItemList;
    //   })
    // );
    let Cuisines = [] ;
    const apiUrl = `${AppConfig.serverURL}/cuisines?city_id=5`;
    return this.http.get(apiUrl, httpOptions).pipe(
      map((data: any) => {
       data.cuisines.forEach(cuisine => {
        Cuisines.push(cuisine.cuisine)
       });
        return Cuisines;
      })
    );
  }


}
