// "use client"
// import React, { useEffect, useState } from 'react';

// const GeosuggestComponent = () => {
//   const [suggestions, setSuggestions] = useState([]);

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = `https://suggest-maps.yandex.ru/v1/suggest?apikey=559e1f9b-e496-40c2-9740-90d74cacebed`;
//     script.async = true;
//     document.head.appendChild(script);

//     script.onload = () => {
//       const suggestView = new window.ymaps.SuggestView('suggest');
//       suggestView.events.add('select', function (event) {
//         const selected = event.get('item').value;
//         setSuggestions((prev) => [...prev, selected]);
//       });
//     };
//   }, []);

//   return (
//     <div>
//       <input id="suggest" placeholder="Введите адрес" style={{ width: '300px' }} />
//       <ul>
//         {suggestions.map((suggestion, index) => (
//           <li key={index}>{suggestion}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default GeosuggestComponent;
