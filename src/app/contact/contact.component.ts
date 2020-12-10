import { NotificationsService } from 'angular2-notifications';
import { MessageService } from '../services/message.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { bindCallback } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contacto = new FormGroup({
    Nombre: new FormControl('', Validators.required),
    Apellido: new FormControl('', Validators.required),
    Correo: new FormControl('', Validators.required),
    Asunto: new FormControl('', Validators.required),
    Mensaje: new FormControl('', Validators.required),
  });
  
  

  constructor(public _MessageService: MessageService, private notificacion: NotificationsService) { }

  ngOnInit(): void { 
    initMap()
  }

  Correo(form) {
    if(!this.contacto.invalid){
      //console.log(form);
      this._MessageService.sendMessage(form).subscribe(() => {
        console.log('Mensaje enviado correctamente');
        this.onSuccess("Mensaje enviado correctamente");
        this.contacto.reset();
      });
    } else{
      this.onError("Por favor llena los campos correctamente");
    }
  }

  onSuccess(message){
    this.notificacion.success('Todo bien', message, {
      position: ['bottom','right'],
      timeOut: 3500,
      animate: 'fade',
      showProgressBar: true
    });
  }

  onError(message){
    this.notificacion.error('Error', message, {
      position: ['bottom','right'],
      timeOut: 3500,
      animate: 'fade',
      showProgressBar: true
    });
  }

}

let map: google.maps.Map, infoWindow: google.maps.InfoWindow;

function initMap(): void {
  var coord = {lat:21.9112242 ,lng: -102.3139526};
  map = new google.maps.Map(document.getElementById('map'),{
    mapTypeControl: false,
    zoom: 15,
    center: coord
  });
  var marker = new google.maps.Marker({
    position: coord,
    map: map
  });
  infoWindow = new google.maps.InfoWindow();
  new AutocompleteDirectionsHandler(map);
}



  
  class AutocompleteDirectionsHandler {
    map: google.maps.Map;
    originPlaceId: string;
    destinationPlaceId: string;
    travelMode: google.maps.TravelMode;
    directionsService: google.maps.DirectionsService;
    directionsRenderer: google.maps.DirectionsRenderer;
    geoCoder: google.maps.Geocoder;
  
    constructor(map: google.maps.Map) {
      this.map = map;
      this.originPlaceId = "";
      this.destinationPlaceId = "ChIJjTOroR3vKYQR2y3EN2YkoIk";
      this.travelMode = google.maps.TravelMode.WALKING;
      this.directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer();
      this.directionsRenderer.setMap(this.map);
      this.geoCoder = new google.maps.Geocoder();

      this.directionsRenderer.setPanel(
        document.getElementById("right-panel") as HTMLDivElement
      );
  
      const originInput = document.getElementById(
        "origin-input"
      ) as HTMLInputElement;
      const destinationInput = document.getElementById(
        "destination-input"
      ) as HTMLInputElement;
      const modeSelector = document.getElementById(
        "mode-selector"
      ) as HTMLSelectElement;

      const geolocation = document.getElementById(
        "geolocation"
      ) as HTMLButtonElement;

      geolocation.addEventListener("click", () => {
        var geoLocationID: string = ""
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position: Position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };

              this.geoCoder.geocode({'location': pos}, (results, status) => {
                if(status == google.maps.GeocoderStatus.OK){
                  this.originPlaceId = results[0].place_id
                  originInput.value = results[0].formatted_address
                  this.route()
                }
              })
              infoWindow.setPosition(pos);
              infoWindow.setContent("<span style='color: #000'>Tu ubicación</span>");
              infoWindow.open(map);
              this.map.setCenter(pos)
            },
            () => {
              handleLocationError(true, infoWindow, map.getCenter());
            }
          );
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      });

      function handleLocationError(
        browserHasGeolocation: boolean,
        infoWindow: google.maps.InfoWindow,
        pos: google.maps.LatLng
      ) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(
          browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
        );
        infoWindow.open(map);
      }
  
      const originAutocomplete = new google.maps.places.Autocomplete(originInput);
      // Specify just the place data fields that you need.
      originAutocomplete.setFields(["place_id"]);
  
      /*const destinationAutocomplete = new google.maps.places.Autocomplete(
        destinationInput
      );
      // Specify just the place data fields that you need.
      destinationAutocomplete.setFields(["place_id"]);*/
      destinationInput.value = "Universidad Autónoma de Aguascalientes"
      destinationInput.readOnly = true;
      destinationInput.disabled = true;
        
  
      this.setupClickListener(
        "changemode-walking",
        google.maps.TravelMode.WALKING
      );
      this.setupClickListener(
        "changemode-transit",
        google.maps.TravelMode.TRANSIT
      );
      this.setupClickListener(
        "changemode-driving",
        google.maps.TravelMode.DRIVING
      );
  
      this.setupPlaceChangedListener(originAutocomplete, "ORIG");
      //this.setupPlaceChangedListener(destinationAutocomplete, "DEST");
  
      this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
      this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(geolocation);
      this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
        destinationInput
      );
      this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
    }
  
    // Sets a listener on a radio button to change the filter type on Places
    // Autocomplete.
    setupClickListener(id: string, mode: google.maps.TravelMode) {
      const radioButton = document.getElementById(id) as HTMLInputElement;
  
      radioButton.addEventListener("click", () => {
        this.travelMode = mode;
        this.route();
      });
    }

    
  
    setupPlaceChangedListener(
      autocomplete: google.maps.places.Autocomplete,
      mode: string
    ) {
      autocomplete.bindTo("bounds", this.map);
  
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
  
        if (!place.place_id) {
          window.alert("Please select an option from the dropdown list.");
          return;
        }
  
        if (mode === "ORIG") {
          this.originPlaceId = place.place_id;
        } //else {
          //this.destinationPlaceId = place.place_id;
        //}
        this.route();
      });
    }
  
    route() {
      if (!this.originPlaceId || !this.destinationPlaceId) {
        return;
      }
      const me = this;
  
      this.directionsService.route(
        {
          origin: { placeId: this.originPlaceId },
          destination: { placeId: this.destinationPlaceId },
          travelMode: this.travelMode,
        },
        (response, status) => {
          if (status === "OK") {
            me.directionsRenderer.setDirections(response);
          } else {
            window.alert("Directions request failed due to " + status);
          }
        }
      );
    }
  }
