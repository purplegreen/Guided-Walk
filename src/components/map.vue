<script>
export default {
  name: "Map",
  data() {
    return {
      location: null,
      loading: false,
      error: null,
      currentLocation: null,
      markers: [
        {
          position: {
            lat: 10.0,
            lng: 10.0
          }
        },
        {
          position: {
            lat: 11.0,
            lng: 11.0
          }
        }
      ]
    };
  },
  computed: {
    center() {
      if (this.location && this.location.coords) {
        return {
          lat: this.location.coords.latitude,
          lng: this.location.coords.longitude
        };
      }
      return { lat: 0, lng: 0 };
    }
  },
  created() {
    //do we support geolocation
    if (!("geolocation" in navigator)) {
      this.error = "Geolocation is not available.";
      return;
    }

    this.loading = true;
    // get position
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.loading = false;
        this.location = pos;
        this.currentLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
      },
      err => {
        this.loading = false;
        this.error = err.message;
      }
    );
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
      Your location data is {{ location.coords.latitude }},
      {{ location.coords.longitude }}
    </div>
    <GmapMap
      class="map"
      :center="center"
      :options="{
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false
      }"
      :zoom="12"
      v-if="location"
    >
      <GmapMarker :position="currentLocation" />
    </GmapMap>
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
