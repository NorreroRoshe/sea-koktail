// "use client"
// import React, { useEffect, useState } from "react";
// import { useStore } from '@/hooks/useStore';
// import {observer} from "mobx-react";
// import AsyncSelect from 'react-select/async';
// import AuthService from '@/api/Auth/AuthService';


// const AsyncSelectMap: React.FC = observer(() => {

//   const getAddressText = async ({text}: {text: string}) => {
//     const getAddresses = await AuthService.getValidAddress({data: text});
//     console.log(getAddresses,'getAddresses')
//     if ('data' in getAddresses) {
//       const data = getAddresses.data.results;
//       return data;
//     }
//     return [];
//   }

//   const loadOptions = (
//     inputValue: string,
//     callback: (options: {value: string, label: string}[]) => void
//   ) => {
//     setTimeout( async () => {
//       callback( await getAddressText({text: inputValue}));
//     }, 1000);
//   };
  
//   return (
//     <div className="">
//       <AsyncSelect cacheOptions loadOptions={loadOptions} />
//     </div>
//   );
// });

// export default AsyncSelectMap;
"use client";
import React from "react";
import { observer } from "mobx-react";
import AsyncSelect from 'react-select/async';
import AuthService from '@/api/Auth/AuthService';

const AsyncSelectMap: React.FC = observer(() => {

  const getAddressText = async ({ text }: { text: string }) => {
    const getAddresses = await AuthService.getValidAddress({ data: text });
    
    if ('data' in getAddresses) {
      const data = getAddresses.data.results; // адаптируй этот путь под реальную структуру ответа
      return data.map((item: any) => ({
        value: item.text, // это пример, используй реальные поля ответа
        label: item.text, // это пример, используй реальные поля ответа
      }));
    }
    return [];
  };

  const loadOptions = (
    inputValue: string,
    callback: (options: {value: string, label: string}[]) => void
  ) => {
    setTimeout( async () => {
      callback( await getAddressText({text: inputValue}));
    }, 1000);
  };

  return (
    <div className="">
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        placeholder="Введите адрес"
      />
    </div>
  );
});

export default AsyncSelectMap;
