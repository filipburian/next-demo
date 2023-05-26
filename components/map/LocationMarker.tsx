import {Marker, Popup, useMap } from "react-leaflet";
import {useEffect, useState} from "react";
import {LatLng} from "leaflet";

interface Props {
    defaultPosition: LatLng | null;
}
export const LocationMarker = ({ location }: Props) => {
    const [position, setPosition] = useState<LatLng | null>(location)

    useEffect(() => {
        if (location) {
            setPosition(location);
        }
    }, [location]);

    const map = useMap();

    useEffect(() => {
        console.log('map has changed', map);

        map.locate().on('locationfound', (e) => {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        });
    }, [map])

    return position ? (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    ) : null;
}