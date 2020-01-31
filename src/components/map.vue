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
      routeCalculated: false,
      infoOptions: {
        content: "",
        // offset infowindow so it visually sits nicely on top of our marker
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
    },
    location(value) {
      this.$emit("locationChanged", value);
    }
  },
  computed: {
    google: gmapApi,
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
        this.$emit("locationAcquired", true);
        setTimeout(() => this.calculateRoute(), 1000);
        // console.log('new position acquired', position.coords.latitude, position.coords.longitude);
      },
      err => {
        this.$emit("locationAcquired", false);
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

      // check if its the same marker that was selected if yes toggle
      if (this.currentMarkerIndex == index) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      // if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMarkerIndex = index;
      }
    },
    calculateRoute() {
      if (this.routeCalculated) return;
      let points = [];
      if (this.location) {
        points.push({ position: this.location });
      }

      points.push(...this.markers);
      const directionsService = new this.google.maps.DirectionsService();

      points.forEach((marker, index) => {
        if (!points[index + 1]) return; // skip the last one
        const start = new this.google.maps.LatLng(
          marker.position.lat,
          marker.position.lng
        );
        const end = new this.google.maps.LatLng(
          points[index + 1].position.lat,
          points[index + 1].position.lng
        );
        const request = {
          origin: start,
          destination: end,
          travelMode: this.google.maps.TravelMode.WALKING
        };
        const directionsDisplay = new this.google.maps.DirectionsRenderer({
          map: this.$refs.map.$mapObject,
          suppressMarkers: true
        });

        directionsService.route(request, (response, status) => {
          if (status == this.google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          }
        });
      });
      this.routeCalculated = true;
    }
  }
};
</script>
<template>
  <div>
    <div v-if="error">Sorry, but the following error occurred: {{ error }}</div>
    <div v-if="loading">
      <i>Getting your location...</i>
    </div>

    <div v-if="location">
      Your location data is {{ location.lat }},
      {{ location.lng }}
    </div>
    <!-- <div>
      <button @click="calculateRoute">Route!</button>
    </div> -->
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
    </gmap-map>
  </div>
</template>

<style lang="scss" scoped>
.map {
  height: 400px;
}
</style>
