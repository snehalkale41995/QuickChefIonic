import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { map } from "rxjs/operators";
import { AppConfig } from "../appConstants/appConfig.js";
import jsonData from '../../assets/data/data.json';



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
            average_cost_for_two : item.restaurant.average_cost_for_two,
            ratings : Math.floor(item.restaurant.user_rating.aggregate_rating) ,
            votes : item.restaurant.user_rating.votes,
            cuisines : item.restaurant.cuisines
          })
        }
       
      });
       return restaurants;
      })
    );
  }

  getFoodSegments() {
    let iconList = jsonData.categoryIcons;
    let categories = [] ;
    const apiUrl = `${AppConfig.serverURL}/categories`;
    return this.http.get(apiUrl, httpOptions).pipe(
      map((data: any) => {
        let list = data.categories
       data.categories.forEach((category, index) => {
         let categoryDetails = {
           id : category.categories.id,
           name : category.categories.name,
           icon : iconList[index].icon
         }
         if(categoryDetails.id !== 13)
         categories.push(categoryDetails)
       });
       console.log("categories", categories)
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

  getUserProfileList() {
    return this.load().pipe(
      map((data: any) => {
        console.log("data", data.foodItemList);
        return data.userProfileItems;
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
    let cuisineIds = [270, 30, 25, 100, 40, 143, 164, 50, 1015, 85, 90];
    const apiUrl = `${AppConfig.serverURL}/cuisines?city_id=5`;
    return this.http.get(apiUrl, httpOptions).pipe(
      map((data: any) => {
       data.cuisines.forEach(cuisine => {
        if(cuisineIds.includes(cuisine.cuisine.cuisine_id))
          Cuisines.push(cuisine.cuisine)
       });
        return Cuisines;
      })
    );
  }


}
