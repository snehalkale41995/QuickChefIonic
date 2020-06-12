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
  })
};

let nodeHttpOptions ;


@Injectable({
  providedIn: "root",
})
export class DeliveryData {
  data: any;

  constructor(public http: HttpClient, public storage: Storage) {
    this.setAuthHeader()
  }

   setAuthHeader(){
     console.log("in setAuthHeader")
    this.storage.get('userToken').then((token)=>{
      if(token){
        nodeHttpOptions = {
          headers: new HttpHeaders({
            "Content-Type": "application/json",
            'x-access-token' : token 
          }),
        };
      }
    })
  }

  load(): any {
    if (this.data) {
      return of(this.data);
    } else {
      return this.http.get("assets/data/data.json");
    }
  }

  getRestaurants(restaurantName: string, cityName: string, category: string) {
    this.setAuthHeader()
    let restaurants = [],
      apiUrl = `${AppConfig.zomatoURL}/search?q=pune`;

    /** Important : search by city and category * */
    // if (cityName && cityName !== "pune") {
    //   apiUrl = `${AppConfig.zomatoURL}/search?q=${cityName}`;
    // }

    // if (category) {
    //   apiUrl = `${apiUrl}&category=${category}`;
    // }

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
   
    let categories = [];
    const apiUrl = `${AppConfig.serverURL}/api/restaurant/categories`;
    return this.http.get(apiUrl, httpOptions).pipe(
      map((data: any) => {
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
        console.log("data.location", data.location)
        // let locatinDetails = {
        //   "locationName" : data.location.title,
        //   "cityName" : data.location.city_name
        // }
        return data.location;
      })
    );
  }

  getRestaurantDetails(id) {
    id = '7765';
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

  getCartDetails(userId) {
    const apiUrl = `${AppConfig.serverURL}/api/restaurant/shoppingCart/'${userId}'`;
    return this.http.get(apiUrl, nodeHttpOptions).pipe(
      map((data: any) => {
        let subTotal = 0;
        data.forEach((element) => {
          subTotal = subTotal + element.Price * element.Count;
        });
        // return data;
        return {
          CartItems: data,
          subtotal: subTotal,
          deliveryCost: "Free",
          discount: 0,
          total: subTotal,
        };
      })
    );
  }

  getCoupons() {
    const apiUrl = `${AppConfig.serverURL}/api/restaurant/coupons`;
    return this.http.get(apiUrl, nodeHttpOptions).pipe(
      map((data: any) => {
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

  getOrderDetails(userId) {
    const apiUrl = `${AppConfig.serverURL}/api/restaurant/orders/'${userId}'`;
    return this.http.get(apiUrl, nodeHttpOptions).pipe(
      map((data: any) => {
        let orderInfo = data[data.length - 1];
        return {
          thumb: "../../../assets/img/userImage1.jpg",
          name: orderInfo.PickUpName,
          pickUpTime: this.formatAMPM(orderInfo.PickUpTime),
          phoneNumber: orderInfo.PhoneNumber,
          status : orderInfo.Status
        };
      })
    );
  }

  formatAMPM(newDate) {
    let date = new Date(newDate);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? 0 + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  addToCart(menuList) {
    const apiUrl = `${AppConfig.serverURL}/api/restaurant/shoppingCart`;
    return this.http.post(apiUrl, menuList, nodeHttpOptions).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  addOrderHeader(orderHeader) {
    const apiUrl = `${AppConfig.serverURL}/api/restaurant/orderHeader`;
    //  ApplicationUserId, MenuItemId, Count
    return this.http.post(apiUrl, orderHeader, nodeHttpOptions).pipe(
      map((data: any) => {
        return data.data[0];
      })
    );
  }

  deleteUserCart(userId) {
    const apiUrl = `${AppConfig.serverURL}/api/restaurant/shopping/'${userId}'`;
    return this.http.put(apiUrl, nodeHttpOptions).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  addOrderDetails(orderDetails, orderId) {
    orderDetails.forEach((order) => {
      order.OrderId = orderId;
    });

    const apiUrl = `${AppConfig.serverURL}/api/restaurant/orderDetails`;
    //  ApplicationUserId, MenuItemId, Count
    return this.http.post(apiUrl, orderDetails, nodeHttpOptions).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  makePayment(data) {
    const apiUrl = `${AppConfig.serverURL}/api/restaurant/stripePay`;
    return this.http.post(apiUrl, data, httpOptions).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  sendOrderConfirmEmail(userData, orderHeader, orderDetails, orderId){

    console.log("userData", userData);
    console.log("orderHeader", orderHeader)
    console.log("orderDetails", orderDetails)
    let value = orderHeader.OrderDate;
    let data = {
      email : userData.email,
      userName : userData.name,
      appName : "Quick Chef",
      OrderDate: value.getMonth()+1 + "/" + value.getDate() + "/" + value.getYear(),
      subTotal: orderHeader.OrderTotalOriginal,
      Discount: orderHeader.CouponCodeDiscount,
      OrderTotal : orderHeader.OrderTotal,
      Status: "Pending",
      orderId : orderId,
      address : userData.streetAddress + " " + userData.city
    }

    const apiUrl = `${AppConfig.serverURL}/api/order/confirmOrderMail`;
    return this.http.post(apiUrl, data, httpOptions).pipe(
      map((data: any) => {
        return data;
      })
    );

  }


}
