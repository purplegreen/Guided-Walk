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
      <gmap-polyline v-if="path.length > 0" :path="path"> </gmap-polyline>
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
