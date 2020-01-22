<script>
export default {
  name: "Map",
  data() {
    return {
      location: null,
      loading: false,
      error: null,
      watcherId: null
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
        this.location = position;
        // console.log('new position acquired', position.coords.latitude, position.coords.longitude);
      },
      err => {
        this.loading = false;
        this.error = err.message;
      },
      {
        enableHighAccuracy: true
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
    <gmap-map
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
      :zoom="13"
      v-if="location"
    >
      <gmap-marker
        :position="center"
        icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/library_maps.png"
      />
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
