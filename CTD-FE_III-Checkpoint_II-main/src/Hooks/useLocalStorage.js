import { useState, useEffect } from "react";

const useLocalStorage = (key, defaultValue) => {
   const [value, setValue] = useState(() => {
      let currentValue;

      console.log(key, localStorage.getItem(key));

      try {
         currentValue = JSON.parse(
            localStorage.getItem(key) || String(defaultValue)
         );
      } catch (error) {
         currentValue = defaultValue;
      }

      return currentValue;
   });

   useEffect(() => {
      console.log('set', value);
      localStorage.setItem(key, JSON.stringify(value));
   }, [value, key]);

   return [value, setValue];
};

export default useLocalStorage;