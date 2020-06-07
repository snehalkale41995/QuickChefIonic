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
  providedIn: "root",
})
export class DeliveryData {
  data: any;

  constructor(public http: HttpClient, public storage: Storage) {}

  load(): any {
    if (this.data) {
      return of(this.data);
    } else {
      return this.http.get("assets/data/data.json");
    }
  }

  getRestaurants(restaurantName: string, cityName: string, category: string) {
    let restaurants = [],
      apiUrl = `${AppConfig.zomatoURL}/search?q=pune`;

    if (cityName && cityName !== "pune") {
      apiUrl = `${AppConfig.zomatoURL}/search?q=${cityName}`;
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
    const apiUrl = `${AppConfig.serverURL}/api/restaurant/categories`;
    return this.http.get(apiUrl, httpOptions).pipe(
      map((data: any) => {
        console.log("cat", data);
        data.forEach((category, index) => {
          let categoryDetails = {
            id: category.Id,
            name: category.Name,
            icon: `${AppConfig.serverURL}/${category.Img}`,
            picture: `${AppConfig.serverURL}/${category.Picture}`,
          };
          categories.push(categoryDetails);
        });
        return categories;
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
    const apiUrl = `${AppConfig.zomatoURL}/cuisines?city_id=5`;
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
    const apiUrl = `${AppConfig.zomatoURL}/geocode?lat=${latitude}&lon=${longitude}`;
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

  getRestaurantDetails(id) {
    const apiUrl = `${AppConfig.zomatoURL}/restaurant?res_id=${id}`;
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
          latitude: data.location.latitude,
          longitude: data.location.longitude,
        };
      })
    );
  }

  getMenuListByRestaurant(restaurantId) {
    const apiUrl = `${AppConfig.serverURL}/api/restaurant/menuItems`;
    return this.http.get(apiUrl, httpOptions).pipe(
      map((data: any) => {
        console.log("data", data);
        data.forEach((menu) => {
          Object.assign(menu, { Count: 0 });
          Object.assign(menu, {
            menuImage: `${AppConfig.serverURL}/${menu.Picture}`,
          });
        });
        return data;
      })
    );
  }

  getCartDetails() {
    let userId = '41fbdfee-1d5f-4290-bbe4-7271ed59a921'
    const apiUrl = `${AppConfig.serverURL}/api/restaurant/shoppingCart/'${userId}'`;
    return this.http.get(apiUrl, httpOptions).pipe(
      map((data: any) => {
        console.log("data", data);
        let subTotal = 0; 
        data.forEach(element => {
          subTotal = subTotal + (element.Price * element.Count)
        });
        console.log("subTotal", subTotal)
       // return data;
       return {CartItems : data, subtotal : subTotal , deliveryCost : "Free", discount : 0 , total: subTotal}
      })
    );
  }

  getCoupons() {
    const apiUrl = `${AppConfig.serverURL}/api/restaurant/coupons`;
    return this.http.get(apiUrl, httpOptions).pipe(
      map((data: any) => {
        console.log("data", data);
        return data;
      })
    );
  }

  getMap(restaurantId) {
    // return this.load().pipe(
    //   map((data: any) => {
    //     return data.map;
    //   })
    // )}

    let currentLocation;
    this.storage.get("currentLocation").then((location) => {
      currentLocation = location;
    });

    return this.getRestaurantDetails(restaurantId).pipe(
      map((restaurantInfo: any) => {
        //  return data.map;
        return [
          {
            name: restaurantInfo.location,
            lat: parseInt(restaurantInfo.latitude),
            lng: parseInt(restaurantInfo.longitude),
            center: true,
            image:
              "http://maps.google.com/mapfiles/kml/shapes/motorcycling.png",
          },
          {
            name: currentLocation.deviceLocation,
            lat: parseInt(currentLocation.latitude),
            lng: parseInt(currentLocation.longitude),
            image:
              "http://maps.google.com/mapfiles/kml/shapes/homegardenbusiness.png",
          },
        ];
      })
    );
  }

  getRider() {
    return this.load().pipe(
      map((data: any) => {
        return data.riderDetails;
      })
    );
  }

  addToCart(menuList) {
    const apiUrl = `${AppConfig.serverURL}/api/restaurant/shoppingCart`;
    let menuItems = [];

    menuList.forEach((element) => {
      menuItems.push({
        ApplicationUserId: "41fbdfee-1d5f-4290-bbe4-7271ed59a921",
        MenuItemId: element.Id,
        Count: element.Count,
      });
    });
    //  ApplicationUserId, MenuItemId, Count
    return this.http.post(apiUrl, menuItems, httpOptions).pipe(
      map((data: any) => {
        console.log("data", data);
        return data;
      })
    );
  }

  addOrderHeader(orderHeader) {
    const apiUrl = `${AppConfig.serverURL}/api/restaurant/orderHeader`;
    //  ApplicationUserId, MenuItemId, Count
    return this.http.post(apiUrl, orderHeader, httpOptions).pipe(
      map((data: any) => {
        console.log("data", data);
        return data[0];
      })
    );
  }

  addOrderDetails(orderDetails, orderId) {

    orderDetails.forEach(order => {
      order.OrderId = orderId ;
    });

    const apiUrl = `${AppConfig.serverURL}/api/restaurant/orderDetails`;
    //  ApplicationUserId, MenuItemId, Count
    return this.http.post(apiUrl, orderDetails, httpOptions).pipe(
      map((data: any) => {
        console.log("data", data);
        return data;
      })
    );
  }

  
}
