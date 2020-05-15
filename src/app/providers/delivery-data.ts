import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeliveryData {
  data: any;

  constructor(public http: HttpClient) {}

  load(): any {
    if (this.data) {
      return of(this.data);
    } else {
      return this.http
        .get('assets/data/data.json')
       
    }
  }
  
  getRestaurants() {
    return this.load().pipe(
      map((data: any) => {
        return data.restaurants.sort((a: any, b: any) => {
          const aName = a.name.split(' ').pop();
          const bName = b.name.split(' ').pop();
          return aName.localeCompare(bName);
        });
      })
    );
  }

  getFoodSegments(){
    
  }

  getRestaurantList(segment: string) {
    return this.load().pipe(
      map((data: any) => {
        let restaurants :  any ;
         if(segment!=='all'){
          restaurants =  data.restaurantList.filter(function (e) {
            return e.type === segment;
           });
           return restaurants;
         }
         else{
          return data.restaurantList
         }
      })
    );
  }

  getMealList() {
    return this.load().pipe(
      map((data: any) => {
        console.log("data", data.foodItemList)
        return data.foodItemList
       
      })
    );
  }
}
