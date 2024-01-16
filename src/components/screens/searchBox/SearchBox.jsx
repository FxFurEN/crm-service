import { useState } from 'react';
import { IonSearchbar } from '@ionic/react';
import '../../../assets/styles/searchBar.css';

const SearchBox = ({ fields, data, onFilter }) => {
    const [searchText, setSearchText] = useState('');

    const handleInput = (ev) => {
      const query = ev.target.value.toLowerCase();
      setSearchText(query);
      
      const filteredResults = data.filter(item =>
        fields.some(field =>
          item[field].toLowerCase().includes(query)
        )
      );
  
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