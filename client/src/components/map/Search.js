import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import L from "leaflet";
import { Map, TileLayer, MapControl } from 'react-leaflet';

class Search extends MapControl {
  constructor(props, context) {
    super(props);
  }

  createLeafletElement(opts) {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider: new OpenStreetMapProvider(),
      style: 'bar',
      showMarker: true,
      showPopup: true,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: false,
      searchLabel: 'search'
    });

    return searchControl;
  }
}

export default Search;
