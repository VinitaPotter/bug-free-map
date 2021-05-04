<template>
  <div>
    <button @click="change_drawingMode()">
      circle drawingMode
    </button>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      drawingManager:null
    }
  },
  methods:{
    change_drawingMode(mode){
      this.drawingManager.setDrawingMode(google.maps.drawing.OverlayType.CIRCLE);
    }
  },
  mounted() {
    const map = new google.maps.Map(document.getElementById("map"), {
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
        icon:
          "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
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
    drawingManager.setMap(map);
    this.drawingManager = drawingManager
  },
};
</script>

 <style >
      /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
      #map {
        height: 100vh;
      }

      
    </style>