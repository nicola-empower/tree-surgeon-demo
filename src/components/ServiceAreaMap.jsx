import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const ServiceAreaMap = ({ center = [51.505, -0.09], city = "London", radiusMiles = 30 }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return <div className="h-[400px] w-full bg-gray-100 animate-pulse rounded-xl" />;

    const radiusMeters = radiusMiles * 1609.34;

    return (
        <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-lg border-4 border-white z-0 relative">
            <MapContainer
                center={center}
                zoom={9}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
                className="z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                <Circle
                    center={center}
                    radius={radiusMeters}
                    pathOptions={{ color: 'var(--color-primary)', fillColor: 'var(--color-accent)', fillOpacity: 0.2 }}
                >
                    <Popup>
                        We serve {city} and a {radiusMiles} mile radius.
                    </Popup>
                </Circle>
            </MapContainer>
        </div>
    );
};

export default ServiceAreaMap;
