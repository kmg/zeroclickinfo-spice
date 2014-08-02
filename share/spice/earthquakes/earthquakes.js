(function (env) {
  "use strict";
  env.ddg_spice_earthquakes = function (api_result) {
    if (!api_result || !api_result.features || !api_result.features.length) {
      return Spice.failed("earthquakes");
    }
    var now = Date.now();
    $.each(api_result.features, function(index, value) {
      if (parseFloat(value.properties.mag) > 6.0) {
        value.properties["marker-size"] = "large";
      } else if (parseFloat(value.properties.mag) > 4.5) {
        value.properties["marker-size"] = "medium";
      } else {
        value.properties["marker-size"] = "small";
      }
      if ((now - parseInt(value.properties.time)) < 3600000) {
        value.properties["marker-color"] = "#AD2610";
      } else {
        value.properties["marker-color"] = "#FF9900";
      }
    });
    DDG.require("maps", function() {
      Spice.add({
        id: "earthquakes",
        name: "Earthquakes",
        data: {},
        templates: {
          group: 'text'
        }
      });
      var eq_map = L.mapbox.map('zci-earthquakes', 'duckduckgo.ljdfs9k9').setView([39.12367, -76.81229], 3);
      var eq_layer = L.mapbox.featureLayer().addTo(eq_map);
      eq_layer.setGeoJSON(api_result);
    });
  };
}(this));
