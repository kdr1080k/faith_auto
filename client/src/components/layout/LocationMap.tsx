import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';
import { useMemo } from 'react';
import styles from './Footer.module.css';

const LocationMap = () => {
  // You need to add VITE_GOOGLE_MAPS_API_KEY in your .env file
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey || '',
  });

  const center = useMemo(() => ({ 
    lat: -37.67611, // Westmeadows VIC latitude
    lng: 144.88611 // Westmeadows VIC longitude
  }), []);

  if (!apiKey) {
    return (
      <div className={`${styles.mapContainer} bg-gray-800 flex items-center justify-center text-gray-400 text-sm p-4 text-center`}>
        <div>
          <p className="mb-2">Google Maps API key not configured.</p>
          <p className="text-xs">Add VITE_GOOGLE_MAPS_API_KEY to your .env file</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    console.error('Error loading Google Maps:', loadError);
    return (
      <div className={`${styles.mapContainer} bg-gray-800 flex items-center justify-center text-gray-400 text-sm`}>
        Map unavailable
      </div>
    );
  }

  if (!isLoaded) {
    return <div className={`${styles.mapContainer} bg-gray-800 animate-pulse`} />;
  }

  return (
    <div className={styles.mapContainer}>
      <GoogleMap
        zoom={15}
        center={center}
        mapContainerClassName="w-full h-full"
        options={{
          styles: [
            {
              elementType: "geometry",
              stylers: [{ color: "#242f3e" }]
            },
            {
              elementType: "labels.text.stroke",
              stylers: [{ color: "#242f3e" }]
            },
            {
              elementType: "labels.text.fill",
              stylers: [{ color: "#746855" }]
            }
          ],
          disableDefaultUI: true,
          zoomControl: true,
        }}
      >
        <MarkerF position={center} />
      </GoogleMap>
    </div>
  );
};

export default LocationMap; 