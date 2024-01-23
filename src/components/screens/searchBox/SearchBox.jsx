import { useState } from 'react';
import { IonSearchbar } from '@ionic/react';
import '../../../assets/styles/searchBar.css';

const SearchBox = ({ fields, data, onFilter }) => {
  const [searchText, setSearchText] = useState('');

  const handleInput = (ev) => {
    const query = ev.target.value.toLowerCase();
  
    const filteredResults = query
      ? data.filter((item) =>
          fields.some((field) => {
            const fieldValue = item[field.toLowerCase()];
            return fieldValue && fieldValue.toLowerCase().includes(query);
          })
        )
      : data;
  
    setSearchText(query);
    onFilter(filteredResults);
  };
  

  return (
    <IonSearchbar
      showCancelButton="never"
      debounce={500}
      class="custom"
      value={searchText}
      onIonInput={handleInput}
    ></IonSearchbar>
  );
};

export default SearchBox;
