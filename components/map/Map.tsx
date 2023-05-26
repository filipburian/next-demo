import {useEffect, useState} from "react";
import {MapContainer, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'

import "leaflet-defaulticon-compatibility";
import {SearchField} from "@/components/map/SearchField";
import {LocationMarker} from "@/components/map/LocationMarker";
import {LatLng} from "leaflet";
import {RadiusRadio} from "@/components/map/RadiusRadio";
import {GetResultButton} from "@/components/map/GetResultButton";
import {fetchAvgPrice} from "@/utils/fetch-avg.price";

const mapBoxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const Map = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [location, setLocation] = useState<LatLng | null>()
    const [radius, setRadius] = useState(10);
    const [result, setResult] = useState<number | null>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const handleLocationFound = (loc: LatLng) => {
        setLocation(loc);
        setResult(null)
    }

    const handleChangeRadius = (value: any) => {
        setRadius(value)
        setResult(null);
    }

    const handleFetchResult = async () => {
        if (location && radius) {
            try {
                const data = await fetchAvgPrice({ lat: location.lat, long: location.lng, radiusKm: radius / 1000});
                setResult(data?.documents?.[0]?.avg_price ?? null);
            } catch (e) {
                console.log(e);
                setResult(null);
            }
        }
    }

    return (
        <div id="map" className="w-[500px] lg:w-[1000px] h-[500px] lg:h-[800px]">
            {result && <div>
                <h4>{`Avg Price for given area: ${result}`}</h4>
            </div>
            }
            <div className="flex-col">
                <RadiusRadio handleRadiusChange={handleChangeRadius} />
                <GetResultButton onClick={handleFetchResult} disabled={!location || !radius}/>
            </div>
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