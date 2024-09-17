"use client"
import React, { useState } from 'react';
import { useStore } from '@/hooks/useStore'; // Путь к вашему хук-стору
import AuthService from '@/api/Auth/AuthService';

const AddressSearch = () => {
  const [searchText, setSearchText] = useState('Москва, Ленинский проспект, д. 25');
  const [resultText, setResultText] = useState('');

  const store = useStore();
  // const authService = store.auth; // Предполагается, что authService доступен через useStore

  const handleSearch = async () => {
    try {
      const response = await AuthService.getValidAddress({ data: searchText });
      const geoObject = response.data.response.GeoObjectCollection.featureMember[0].GeoObject;
      const coordinates = geoObject.Point.pos.split(" ").map(Number); // [longitude, latitude]
      const longitude = coordinates[0];
      const latitude = coordinates[1];

      console.log('Coordinates:', latitude, longitude);

      const resultText = checkLocation(latitude, longitude);
      setResultText(resultText);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      setResultText('Error fetching data');
    }
  };

  // MKAD boundaries for checking if inside MKAD
  const mkadBounds = {
    topLeft: [55.917, 37.355],   // North-West
    bottomRight: [55.573, 37.865] // South-East
  };

  // Example residential complex boundary (simplified)
  const residentialComplexBounds = {
    topLeft: [55.752401, 37.514332],    // North-West (dummy coordinates)
    bottomRight: [55.747263, 37.520424]  // South-East (dummy coordinates)
  };

  function checkLocation(latitude: any, longitude: any) {
    if (isInsideBounds(latitude, longitude, residentialComplexBounds)) {
      return 'Внутри ЖК';
    } else if (latitude >= mkadBounds.bottomRight[0] && latitude <= mkadBounds.topLeft[0] &&
      longitude >= mkadBounds.topLeft[1] && longitude <= mkadBounds.bottomRight[1]) {
      return 'В пределах МКАД';
    } else if (isNearMoscow(latitude, longitude)) {
      return 'Ближайшее Подмосковье';
    } else {
      return 'За пределами МКАД (Outside MKAD)';
    }
  }

  function isInsideBounds(latitude: any, longitude: any, bounds: any) {
    return latitude >= bounds.bottomRight[0] && latitude <= bounds.topLeft[0] &&
      longitude >= bounds.topLeft[1] && longitude <= bounds.bottomRight[1];
  }

  function isNearMoscow(latitude: any, longitude: any) {
    const distance = calculateDistance(latitude, longitude, 55.7558, 37.6173); // Moscow center
    return distance <= 50; // Check if the distance is within 50km of Moscow center
  }

  function calculateDistance(lat1: any, lon1: any, lat2: any, lon2: any) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }

  function deg2rad(deg: any) {
    return deg * (Math.PI / 180);
  }

  return (
    <div>
      <label htmlFor="searchText">Введите адрес:</label>
      <input
        type="text"
        id="searchText"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={handleSearch}>Поиск</button>
      <p>{resultText}</p>
    </div>
  );
};

export default AddressSearch;
