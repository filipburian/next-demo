import { GeoSearchControl, MapBoxProvider } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet';
import {useEffect} from "react";
export const SearchField = ({ apiKey, handleLocationFound }) => {
    const provider = new MapBoxProvider({
        params: {
            access_token: apiKey,
        },
    });

    // @ts-ignore
    const searchControl = new GeoSearchControl({
        provider: provider,
        style: 'button'
    });

    const map = useMap();

    useEffect(() => {
        map.addControl(searchControl);
        map.on('locationfound', handleLocationFound);
        return () => { map.removeControl(searchControl)};
    }, []);

    return null;
};