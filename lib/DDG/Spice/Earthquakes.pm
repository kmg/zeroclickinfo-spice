package DDG::Spice::Earthquakes;
# ABSTRACT: Show recent earthquakes using usgs data on a world map

use DDG::Spice;

triggers startend => ['earthquake', 'earthquakes'];

spice to => 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson';
spice wrap_jsonp_callback => 1;
spice is_cached => 0;

handle remainder => sub {
  return '';
};

1;
