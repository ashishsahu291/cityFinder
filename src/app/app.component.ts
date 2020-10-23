import { MapsAPILoader } from '@agm/core';
import { Component, NgZone, OnInit } from '@angular/core';
import {DataService} from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'city-assignment';

  states = [];
  cities = [];
  isCities = false;
  selectedState;
  latitude: number;
  longitude: number;
  address: string;
  private geoCoder;

  constructor(private dataService: DataService, private mapAPILoader: MapsAPILoader, private ngZone: NgZone) {}

  ngOnInit() {
    this.dataService.onFetchStates().subscribe(res => {
      this.states = res.states;
      console.log(this.states);
    });

    this.mapAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let placeChange = new google.maps.places.Autocomplete(this.selectedState);

      placeChange.addListener("place_changed", () => {
        this.ngZone.run(() => {
          // get the place result
          let place: google.maps.places.PlaceResult = placeChange.getPlace();

          //verify result
          if(place.geometry === undefined || place.geometry === null) {
            return;
          }

          // Set latitude, longitude
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          
        })
      })
    })
  }

  onGetCity(index: number) {
    console.log(index);
    console.log(this.states[index].districts);
    this.selectedState = this.states[index];
    this.cities = this.selectedState.districts;
    this.isCities = true;
  }

  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      })
    }
  }

}
