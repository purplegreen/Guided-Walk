<script>
import { gmapApi } from "vue2-google-maps";

export default {
  name: "Map",
  data() {
    return {
      location: null,
      loading: false,
      error: null,
      watcherId: null,
      infoWindowPos: null,
      infoWinOpen: false,
      currentMarkerIndex: null,
      infoOptions: {
        content: "",
        //optional: offset infowindow so it visually sits nicely on top of our marker
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    };
  },
  props: {
    markers: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    markers(markers) {
      if (markers.length > 2) {
        const bounds = new this.google.maps.LatLngBounds();
        for (let m of markers) {
          bounds.extend(m.position);
        }
        this.$refs.map.fitBounds(bounds);
      }
    }
  },
  computed: {
    google: gmapApi,
    path() {
      let points = [];
      if (this.location) {
        points.push(this.location);
      }
      points.push(...this.markers.map(m => m.position));
      return points;
    },
    center() {
      // center is the center of markers
      if (this.markers.length) {
        const total = this.markers.reduce(
          (result, marker) => {
            return {
              lat: result.lat + marker.position.lat,
              lng: result.lng + marker.position.lng
            };
          },
          { lat: 0, lng: 0 }
        );
        return {
          lat: total.lat / this.markers.length,
          lng: total.lng / this.markers.length
        };
      }
      return { lat: 0, lng: 0 };
    }
  },
  beforeDestroy() {
    navigator.geolocation.clearWatch(this.watcherId);
  },
  created() {
    //do we support geolocation
    if (!("geolocation" in navigator)) {
      this.error = "Geolocation is not available.";
      return;
    }

    this.loading = true;
    this.watcherId = navigator.geolocation.watchPosition(
      position => {
        this.loading = false;
        this.location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        // console.log('new position acquired', position.coords.latitude, position.coords.longitude);
      },
      err => {
        this.loading = false;
        this.error = err.message;
      },
      {
        enableHighAccuracy: true // this might cause high battery consumption
      }
    );
  },
  methods: {
    toggleInfoWindow(marker, index) {
      this.infoWindowPos = marker.position;
      this.infoOptions.content = marker.text;

      //check if its the same marker that was selected if yes toggle
      if (this.currentMarkerIndex == index) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMarkerIndex = index;
      }
    },
    route() {
      // this.directionsService = new this.google.maps.DirectionsService();
      // this.directionsDisplay = new this.google.maps.DirectionsRenderer();

      // this.directionsDisplay.setMap(this.$refs.map.$mapObject);

      // console.log(this.markers[0]);

      // var start = new this.google.maps.LatLng(this.markers[0].position.lat, this.markers[0].position.lng);
      // var end = new this.google.maps.LatLng(this.markers[1].position.lat, this.markers[1].position.lng);
      // var request = {
      //   origin: start,
      //   destination: end,
      //   travelMode: this.google.maps.TravelMode.WALKING
      // };
      // this.directionsService.route(request, (response, status) => {
      //   if (status == this.google.maps.DirectionsStatus.OK) {
      //     this.directionsDisplay.setDirections(response);
      //     this.directionsDisplay.setMap(this.$refs.map);
      //   } else {
      //     alert("Directions Request failed: " + status);
      //   }
      // });
      //Initialize the Path Array
      const path = new this.google.maps.MVCArray();

      //Initialize the Direction Service
      const service = new this.google.maps.DirectionsService();

      //Set the Path Stroke Color
      const polyline = new this.google.maps.Polyline({
        map: this.$refs.map.$mapObject,
        strokeColor: "#4986E7"
      });

      //Loop and Draw Path Route between the Points on MAP
      for (let i = 0; i < this.markers.length; i++) {
        // we don't want to process the last item
        if (i + 1 >= this.markers.length) return;
        const src = new this.google.maps.LatLng(
          this.markers[i].position.lat,
          this.markers[i].position.lng
        );
        const des = new this.google.maps.LatLng(
          this.markers[i + 1].position.lat,
          this.markers[i + 1].position.lng
        );
        path.push(src);
        polyline.setPath(path);
        const request = {
          origin: src,
          destination: des,
          travelMode: this.google.maps.TravelMode.WALKING
        };
        service.route(request, function(result, status) {
          if (status == this.google.maps.DirectionsStatus.OK) {
            // dont try to optimize. path is not a regular array
            for (let j = 0, len = result.routes[0].overview_path.length; j < len; j++) {
              path.push(result.routes[0].overview_path[j]);
            }
          }
        });
      }
    }
  }
};
</script>
<template>
  <div>
    <div class="map" v-if="!location"></div>
    <div v-if="error">Sorry, but the following error occurred: {{ error }}</div>

    <div v-if="loading">
      <i>Getting your location...</i>
    </div>

    <div v-if="location">
      Your location data is {{ location.lat }},
      {{ location.lng }}
    </div>
    <div>
      <button @click="route">Route!</button>
    </div>
    <gmap-map
      class="map"
      :center="center"
      ref="map"
      :options="{
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false
      }"
      :zoom="15"
      v-if="location"
    >
      <gmap-marker
        v-if="location"
        :position="location"
        icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/library_maps.png"
      />
      <gmap-marker
        :key="index"
        v-for="(marker, index) in markers"
        :label="marker.text"
        :position="marker.position"
        :clickable="true"
        @click="toggleInfoWindow(marker, index)"
      />
      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen = false"
      ></gmap-info-window>
      <!-- <gmap-polyline v-if="path.length > 0" :path="path"> </gmap-polyline> -->
    </gmap-map>
  </div>
</template>

<style lang="scss" scoped>
.map {
  height: 400px;
  background-image: url("/berlin.svg");
  background-position: center;
  background-size: 100%;
  background-repeat: no-repeat;
}
</style>
