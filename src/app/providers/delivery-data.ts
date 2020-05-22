import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { map } from "rxjs/operators";
import { AppConfig } from "../appConstants/appConfig.js";
import jsonData from "../../assets/data/data.json";

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

  getRestaurants(restaurantName: string, cityName: string, category: string) {
    let restaurants = [],
      apiUrl = `${AppConfig.serverURL}/search?q=pune`;

    if (cityName && cityName !== "pune") {
      apiUrl = `${AppConfig.serverURL}/search?q=${cityName}`;
    }
    if (category) {
      apiUrl = `${apiUrl}&category=${category}`;
    }

    return this.http.get(apiUrl, httpOptions).pipe(
      map((data: any) => {
        data.restaurants.forEach((item) => {
          if (item.restaurant.thumb) {
            restaurants.push({
              id: item.restaurant.id,
              name: item.restaurant.name,
              thumb: item.restaurant.thumb,
              timings: item.restaurant.timings,
              location: item.restaurant.location.locality_verbose,
              price_range: item.restaurant.price_range,
              average_cost_for_two: item.restaurant.average_cost_for_two,
              ratings: Math.floor(item.restaurant.user_rating.aggregate_rating),
              votes: item.restaurant.user_rating.votes,
              cuisines: item.restaurant.cuisines,
            });
          }
        });

        if (restaurantName) {
          let restaurantList = restaurants.filter((restaurant) =>
            restaurant.name
              .toLowerCase()
              .startsWith(restaurantName.toLowerCase())
          );
          return restaurantList;
        }
        return restaurants;
      })
    );
  }

  getFoodSegments() {
    let iconList = jsonData.categoryIcons;
    let categories = [];
    const apiUrl = `${AppConfig.serverURL}/categories`;
    return this.http.get(apiUrl, httpOptions).pipe(
      map((data: any) => {
        let list = data.categories;
        data.categories.forEach((category, index) => {
          let categoryDetails = {
            id: category.categories.id,
            name: category.categories.name,
            icon: iconList[index].icon,
          };
          if (categoryDetails.id !== 13) categories.push(categoryDetails);
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

  getUserProfileList() {
    return this.load().pipe(
      map((data: any) => {
        return data.userProfileItems;
      })
    );
  }

  getMealList() {
    let Cuisines = [];
    let cuisineIds = [270, 30, 25, 100, 40, 143, 164, 50, 1015, 85, 90];
    const apiUrl = `${AppConfig.serverURL}/cuisines?city_id=5`;
    return this.http.get(apiUrl, httpOptions).pipe(
      map((data: any) => {
        data.cuisines.forEach((cuisine) => {
          if (cuisineIds.includes(cuisine.cuisine.cuisine_id))
            Cuisines.push(cuisine.cuisine);
        });
        return Cuisines;
      })
    );
  }

  getDeviceLocation(latitude, longitude) {
    const apiUrl = `${AppConfig.serverURL}/geocode?lat=${latitude}&lon=${longitude}`;
    return this.http.get(apiUrl, httpOptions).pipe(
      map((data: any) => {
        // let locatinDetails = {
        //   "locationName" : data.location.title,
        //   "cityName" : data.location.city_name
        // }
        return data.location;
      })
    );
  }

  getImageByCategory(categoryId) {
    return this.load().pipe(
      map((data: any) => {
        let iconData;
        let iconList = data.categoryIcons;
        iconData = iconList.filter(function (e) {
          return e.id === parseInt(categoryId);
        });

        return iconData[0];
      })
    );
  }

  getRestaurantDetails(id) {
    const apiUrl = `${AppConfig.serverURL}/restaurant?res_id=${id}`;
    return this.http.get(apiUrl, httpOptions).pipe(
      map((data: any) => {
        return {
          id: data.id,
          name: data.name,
          thumb: data.thumb,
          timings: data.timings,
          location: data.location.locality_verbose,
          price_range: data.price_range,
          average_cost_for_two: data.average_cost_for_two,
          ratings: Math.floor(data.user_rating.aggregate_rating),
          votes: data.user_rating.votes,
          cuisines: data.cuisines,
          user_rating: Array(Math.floor(data.user_rating.aggregate_rating)),
        };
      })
    );
  }

  getMenuListByRestaurant(restaurantId) {
    return this.load().pipe(
      map((data: any) => {
        let menuList: any;
        data.menuList.forEach((menu)=>{
          Object.assign(menu, {"count" : 0})
        })
        return data.menuList;
      })
    );
  }
}
