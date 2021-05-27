import React,{useState,useEffect,useRef} from 'react'
import GoogleMapReact from 'google-map-react'
import mapboxgl from 'mapbox-gl'
import './Location.css'
import Geocode from "react-geocode";
import axios from 'axios';
function Location() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);
    const [click,setClick]=useState(false)
    const [latitude,setLatitude]=useState('')
    const [longitude,setLongitude]=useState('')
    const coordinates=[]
    useEffect(() => {
            if (map.current) return; // initialize map only once
            map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
            });
        },[]);
        useEffect(() => {
            if (!map.current) return; // wait for map to initialize
            map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
            });
        },[]);
    navigator.geolocation.watchPosition(
        data=>{
            //console.log(data)
            setLatitude(data.coords.latitude)
            setLongitude(data.coords.longitude)
            coordinates.push([data.coords.latitude,data.coords.longitude])
        },
        error=>console.log(error),{
            enableHighAccuracy: true
        }
    )
    useEffect(()=>{
        axios.get(`https://api.mapbox.com/v4/geocode/mapbox.places/${longitude},${latitude}.json.json?access_token=pk.eyJ1Ijoicmc4MTA5NDMiLCJhIjoiY2twMHhsazNkMHUzbzJ3bXIzNXVzNG1uYyJ9.Q-K1M_UgnzX1ND3ZSbnkyg`).then(res=>{
            console.log(res)
        })
    },[])
    
    mapboxgl.accessToken = 'pk.eyJ1Ijoicmc4MTA5NDMiLCJhIjoiY2twMHhsazNkMHUzbzJ3bXIzNXVzNG1uYyJ9.Q-K1M_UgnzX1ND3ZSbnkyg';
    /*const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [latitude,longitude],
      zoom: 2
    });
    map.on('load', function () {
        map.addSource('route', {
        'type': 'geojson',
        'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
        'type': 'LineString',
        'coordinates': [
        [latitude,longitude]
        ]
        }
        }
        });
        map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
        'line-join': 'round',
        'line-cap': 'round'
        },
        'paint': {
        'line-color': '#888',
        'line-width': 8
        }
        });
        });
        var marker = new mapboxgl.Marker() // initialize a new marker
                    .setLngLat([latitude,longitude]) // Marker [lng, lat] coordinates
                    .addTo(map); 
        const locate = {
            center: {
              lat: 59.95,
              lng: 30.33
            },
            zoom: 11
          };*/
          
    return (
        <div>
            
            <div style={{height: "400px"}} ref={mapContainer} className="map-container" />
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
        </div>
    )
}

export default Location

//AIzaSyBC_LCSs8ShUkbHEXEP2prLQXIlEbDdHCs
/*
<div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                //bootstrapURLKeys={{ key: }}
                defaultCenter={locate.center}
                defaultZoom={locate.zoom}
                >
                
                </GoogleMapReact>
            </div>
*/