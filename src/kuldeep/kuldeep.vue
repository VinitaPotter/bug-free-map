<template>
  <div>
    <button @click="change_drawingMode()">
      circle drawing
    </button>
    <button @click="draw_line()">
      Line
    </button>
    <div id="map"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        drawingManager: null,
        map: null,
      };
    },

    mounted() {
      this.map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
      const drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            google.maps.drawing.OverlayType.MARKER,
            google.maps.drawing.OverlayType.CIRCLE,
            google.maps.drawing.OverlayType.POLYGON,
            google.maps.drawing.OverlayType.POLYLINE,
            google.maps.drawing.OverlayType.RECTANGLE,
          ],
        },
        markerOptions: {
          icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
        },
        circleOptions: {
          fillColor: "#ffff00",
          fillOpacity: 1,
          strokeWeight: 5,
          clickable: false,
          editable: true,
          zIndex: 1,
        },
      });
      drawingManager.setMap(this.map);
      this.drawingManager = drawingManager;
    },
    methods: {
      change_drawingMode(mode) {
        this.drawingManager.setDrawingMode(google.maps.drawing.OverlayType.CIRCLE);
      },

      draw_line(mode) {
        this.drawingManager.setDrawingMode(null);
        // google.maps.event.addDomListener(this.map, "click", (e) => {
        this.drawFreeHand();
        // });
      },

      drawFreeHand() {
        const flightPlanCoordinates = [];
        let flightPath;
        const move = this.map.addListener("dragstart", (e) => {
          flightPlanCoordinates.push(e.latLng);
          flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
          });
          flightPath.setMap(this.map);
        });
        this.map.addListener("dragend", (e) => {
          alert("dragend");
          //TODO: Both Event removers not working
          // google.maps.event.removeListener(move);
          google.maps.event.clearInstanceListeners(this.map);
          this.drawingManager.setDrawingMode(null);
          flightPlanCoordinates = [];
        });
      },

      disable() {
        this.map.setOptions({
          draggable: false,
          zoomControl: false,
          scrollwheel: false,
          disableDoubleClickZoom: false,
        });
      },

      enable() {
        this.map.setOptions({
          draggable: true,
          zoomControl: true,
          scrollwheel: true,
          disableDoubleClickZoom: true,
        });
      },
    },
  };
</script>

<style>
  /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
  #map {
    height: 100vh;
  }
</style>
