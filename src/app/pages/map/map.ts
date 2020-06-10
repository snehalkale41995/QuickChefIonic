import { Component, ElementRef, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { DeliveryData } from '../../providers/delivery-data';
import { Platform } from '@ionic/angular';
import { DOCUMENT} from '@angular/common';
import { darkStyle } from './map-dark-style';
import { Storage } from "@ionic/storage";
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  styleUrls: ['./map.scss']
})
export class MapPage implements AfterViewInit {
  @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;

  defaultHref = "app/tabs/landing";
    rider ;
    statusImg = "assets/img/pending.png";
    isLoaded = false;
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    public deliveryData: DeliveryData,
    public platform: Platform,
    public storage : Storage) {}

    doRefresh(event) {
      console.log('Begin async operation');
      let compRef = this;
      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
        compRef.getRiderInfo()
      }, 2000);
    }


    getRiderInfo(){
      this.storage.get("loggedInUserId").then((userId)=>{
      this.deliveryData.getOrderDetails(userId).subscribe((data: any) => {
        this.rider = data;
        this.statusImg = `assets/img/${data.status}.png`
      })
    })
    }

  async ngAfterViewInit() {

    this.getRiderInfo();
  

    const appEl = this.doc.querySelector('ion-app');
    let isDark = false;
    let style = [];
    if (appEl.classList.contains('dark-theme')) {
      style = darkStyle;
    }

    const googleMaps = await getGoogleMaps(
      'AIzaSyCcXjlA3bLlSEkAeMg-jdB6zIm-4gE4lQs'
    );

    let map;
   
    this.storage.get("selectedRestaurantId").then((id) => {
      this.deliveryData.getMap(id).subscribe((mapData: any) => {
        const mapEle = this.mapElement.nativeElement;
  
        map = new googleMaps.Map(mapEle, {
          center: mapData.find((d: any) => d.center),
          zoom: 4,
          styles: style
        });
  
        mapData.forEach((markerData: any) => {
          const infoWindow = new googleMaps.InfoWindow({
            content: `<h5>${markerData.name}</h5>`
          });
  
          const marker = new googleMaps.Marker({
            position: markerData,
            map,
          //  icon: image,
            icon: {url: markerData.image, scaledSize: new googleMaps.Size(40, 40)},
            title: markerData.name
          });
  
          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        });
  
        googleMaps.event.addListenerOnce(map, 'idle', () => {
          mapEle.classList.add('show-map');
        });
      });
    }) 
  

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const el = mutation.target as HTMLElement;
          isDark = el.classList.contains('dark-theme');
          if (map && isDark) {
            map.setOptions({styles: darkStyle});
          } else if (map) {
            map.setOptions({styles: []});
          }
        }
      });
    });
    observer.observe(appEl, {
      attributes: true
    });
  }
}



function getGoogleMaps(apiKey: string): Promise<any> {
  const win = window as any;
  const googleModule = win.google;
  if (googleModule && googleModule.maps) {
    return Promise.resolve(googleModule.maps);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.31`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = () => {
      const googleModule2 = win.google;
      if (googleModule2 && googleModule2.maps) {
        resolve(googleModule2.maps);
      } else {
        reject('google maps not available');
      }
    };
  });
}

