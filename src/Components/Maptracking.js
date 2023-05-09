import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

const OrderTrackingApp = () => {
  const [orderLocation, setOrderLocation] = useState([51.505, -0.09]);

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
    <div className='overflow-clip w-[50vw] '>
      <h2>Order Tracking</h2>
      <MapContainer center={orderLocation} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={orderLocation} />
      </MapContainer>
    </div>
  );
};

export default OrderTrackingApp;
