import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { Map, TileLayer, MapControl, Marker, Popup } from 'react-leaflet';

class Search extends MapControl {

  createLeafletElement(opts) {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider: new OpenStreetMapProvider(),
      style: 'bar',
      showMarker: true,
      showPopup: true,
      autoClose: false,
      retainZoomLevel: true,
      animateZoom: true,
      keepResult: false,
      searchLabel: 'Søk'
    });

    return searchControl;
  }
}

export default Search;
