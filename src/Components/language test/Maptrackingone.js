import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import marker icon images
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import { useTranslation, initReactI18next } from 'react-i18next';
import i18n from 'i18next';

// Import your language files
import englishTranslations from '../../translations/en.json';
import amharicTranslations from '../../translations/am.json';
import affanOromoTranslations from '../../translations/om.json'

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const OrderTrackingAppOne = ({language}) => {
  const [orderLocation, setOrderLocation] = useState([9.0222, 38.7465]); // Addis Ababa coordinates
const [languageS, setLanguageS] = useState(language); 
 const { t } = useTranslation();
// setLanguageS(language)
console.log("lanaguage in map tracking", language)
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate movement of the order marker
      const newLatitude = orderLocation[0] + (Math.random() - 0.5) * 0.01;
      const newLongitude = orderLocation[1] + (Math.random() - 0.5) * 0.01;
      setOrderLocation([newLatitude, newLongitude]);
    }, 2000);

    return () => clearInterval(interval);
  }, [orderLocation]);



  return (
    <div className='overflow-clip w-[50vw] pb-10 '>
      <h2>
        {/* {language === 'amharic' ? 'ትዕዛዘ መከታተያ' : 'Order Tracking'} */}
        {t('orderTracking')}
      </h2>
      <MapContainer center={orderLocation} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={orderLocation} />
      </MapContainer>
    </div>
  );
};

export default OrderTrackingAppOne;
