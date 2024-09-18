// "use client"
// import React, { useState } from 'react';
// import { useStore } from '@/hooks/useStore'; // Путь к вашему хук-стору
// import AuthService from '@/api/Auth/AuthService';

// const AddressSearch = () => {
//   const [searchText, setSearchText] = useState('Москва, Ленинский проспект, д. 25');
//   const [resultText, setResultText] = useState('');

//   const store = useStore();
//   // const authService = store.auth; // Предполагается, что authService доступен через useStore

//   const handleSearch = async () => {
//     try {
//       const response = await AuthService.getValidAddress({ data: searchText });
//       const geoObject = response.data.response.GeoObjectCollection.featureMember[0].GeoObject;
//       const coordinates = geoObject.Point.pos.split(" ").map(Number); // [longitude, latitude]
//       const longitude = coordinates[0];
//       const latitude = coordinates[1];

//       console.log('Coordinates:', latitude, longitude);

//       const resultText = checkLocation(latitude, longitude);
//       setResultText(resultText);
//     } catch (error) {
//       console.error('There has been a problem with your fetch operation:', error);
//       setResultText('Error fetching data');
//     }
//   };

//   // MKAD boundaries for checking if inside MKAD
//   const mkadBounds = {
//     topLeft: [55.917, 37.355],   // North-West
//     bottomRight: [55.573, 37.865] // South-East
//   };

//   // Example residential complex boundary (simplified)
//   const residentialComplexBounds = {
//     topLeft: [55.752401, 37.514332],    // North-West (dummy coordinates)
//     bottomRight: [55.747263, 37.520424]  // South-East (dummy coordinates)
//   };

//   function checkLocation(latitude: any, longitude: any) {
//     if (isInsideBounds(latitude, longitude, residentialComplexBounds)) {
//       return 'Внутри ЖК';
//     } else if (latitude >= mkadBounds.bottomRight[0] && latitude <= mkadBounds.topLeft[0] &&
//       longitude >= mkadBounds.topLeft[1] && longitude <= mkadBounds.bottomRight[1]) {
//       return 'В пределах МКАД';
//     } else if (isNearMoscow(latitude, longitude)) {
//       return 'Ближайшее Подмосковье';
//     } else {
//       return 'За пределами МКАД (Outside MKAD)';
//     }
//   }

//   function isInsideBounds(latitude: any, longitude: any, bounds: any) {
//     return latitude >= bounds.bottomRight[0] && latitude <= bounds.topLeft[0] &&
//       longitude >= bounds.topLeft[1] && longitude <= bounds.bottomRight[1];
//   }

//   function isNearMoscow(latitude: any, longitude: any) {
//     const distance = calculateDistance(latitude, longitude, 55.7558, 37.6173); // Moscow center
//     return distance <= 50; // Check if the distance is within 50km of Moscow center
//   }

//   function calculateDistance(lat1: any, lon1: any, lat2: any, lon2: any) {
//     const R = 6371; // Radius of the earth in km
//     const dLat = deg2rad(lat2 - lat1);
//     const dLon = deg2rad(lon2 - lon1);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const distance = R * c; // Distance in km
//     return distance;
//   }

//   function deg2rad(deg: any) {
//     return deg * (Math.PI / 180);
//   }

//   return (
//     <div>
//       <label htmlFor="searchText">Введите адрес:</label>
//       <input
//         type="text"
//         id="searchText"
//         value={searchText}
//         onChange={(e) => setSearchText(e.target.value)}
//       />
//       <button onClick={handleSearch}>Поиск</button>
//       <p>{resultText}</p>
//     </div>
//   );
// };

// export default AddressSearch;



"use client"
import React, { useState } from 'react';

const AddressSearch: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('Тверская');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const apiKey = '559e1f9b-e496-40c2-9740-90d74cacebed'; // Ваш API ключ

  const handleSearch = async () => {
    setLoading(true);
    setError(null); // Очистка предыдущих ошибок

    try {
      const url = `https://suggest-maps.yandex.ru/v1/suggest?apikey=${apiKey}&text=${encodeURIComponent(
        searchText
      )}&ll=37.6173,55.7558&spn=0.9,0.9&lang=ru_RU`;

      const response = await fetch(url);
      const data = await response.json();

      if (data && data.result) {
        const addressSuggestions = data.result.map((suggestion: any) => suggestion.displayName);
        setSuggestions(addressSuggestions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Ошибка при запросе:', error);
      setError('Произошла ошибка при запросе.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Yandex Suggest Example</h1>

      <label htmlFor="searchText">Введите адрес:</label>
      <input
        type="text"
        id="searchText"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Поиск...' : 'Поиск'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {suggestions.length > 0 ? (
          suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))
        ) : (
          <li>Нет предложений</li>
        )}
      </ul>
    </div>
  );
};

export default AddressSearch;