import {useEffect, useState} from "react";
import {MapContainer, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'

import "leaflet-defaulticon-compatibility";
import {SearchField} from "@/components/map/SearchField";
import {LocationMarker} from "@/components/map/LocationMarker";
import {LatLng, LocationEvent} from "leaflet";
import {RadiusRadio} from "@/components/map/RadiusRadio";

const mapBoxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const Map = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [location, setLocation] = useState<LatLng | null>()
    const [radius, setRadius] = useState(10);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const handleLocationFound = (e: LocationEvent) => {
        if (e?.latlng) {
            setLocation(e.latlng);
        }
    }

    const handleChangeRadius = (value: any) => {
        setRadius(value)
    }

    return (
        <div id="map" style={{ height: '800px', width: '1000px'}}>
          <RadiusRadio handleRadiusChange={handleChangeRadius} />
          <MapContainer
            center={[50.2584, 19.0222]}
            zoom={14}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <SearchField apiKey={mapBoxAccessToken} handleLocationFound={handleLocationFound}/>
            <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${mapBoxAccessToken}`}
                attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
            />
            <LocationMarker location={location}/>
          </MapContainer>
        </div>
    )
}

export default Map;