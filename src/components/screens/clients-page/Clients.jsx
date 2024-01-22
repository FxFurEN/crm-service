import { useState, useEffect } from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { filterOutline, cloudUploadOutline, cloudDownloadOutline } from 'ionicons/icons';

import '../../../assets/styles/main.css';
import '../../../assets/styles/global.css';
import style from  '../../../assets/styles/table.module.css';
import '../../../assets/styles/addbutton.css';
import '../../../assets/styles/button-ion.css';

import AddButton from '../addButton/AddButton';
import SearchBox from '../searchBox/SearchBox';
import NewClients from './addClients/NewClients';

function Clients() {
  const initialData = [
    {
      name: 'Рома Аегси Хиро',
      phone: '+375(**)**-**-**',
      email: '-',
      type: 'Физ.лицо',
    },
    {
      name: 'Рома Аегси Хиро',
      phone: '+375(**)**-**-**',
      email: '-',
      type: 'Физ.лицо',
    },
  ];

  const [filteredData, setFilteredData] = useState([...initialData]);
  const [clientList, setClientList] = useState([...initialData]);
  const [isNewClientsModalOpen, setIsNewClientsModalOpen] = useState(false);

  const fields = ['name', 'phone', 'email', 'type'];

  useEffect(() => {
    setFilteredData(clientList);
  }, [clientList]);

  const handleFilter = (filteredResults) => {
    setFilteredData(filteredResults);
  };

  const addClient = (newClient) => {
    setClientList((prevList) => [...prevList, newClient]);
  };

  const openNewClientsModal = () => {
    setIsNewClientsModalOpen(true);
  };

  const closeNewClientsModal = () => {
    setIsNewClientsModalOpen(false);
  };

  const columnLabels = ['Клиент', 'Номер телефона', 'Почта', 'Тип клиента'];

  return (
    <>
      <main id="main">
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <SearchBox fields={fields} data={clientList} onFilter={handleFilter} />
            <IonButton fill="clear">
              <IonIcon slot="icon-only" color="white" icon={filterOutline}></IonIcon>
            </IonButton>
            <IonButton fill="clear">
              <IonIcon slot="icon-only" icon={cloudUploadOutline}></IonIcon>
            </IonButton>
            <IonButton fill="clear">
              <IonIcon slot="icon-only" icon={cloudDownloadOutline}></IonIcon>
            </IonButton>
          </div>
        </div>
        <div style={{ flex: 1, overflow: 'auto' }}>
          <div className={style.table}>
            <div className={`${style.tableHead} ${style.row}`}>
              {fields.map((field, index) => (
                <div
                  className={`${style.column} ${index === 0 ? style['first-cell'] : ''}`}
                  data-label={columnLabels[index]}
                  key={index}
                >
                  {columnLabels[index]}
                </div>
              ))}
            </div>

            {filteredData.map((item, rowIndex) => (
              <div className={style.row} key={rowIndex}>
                {fields.map((field, colIndex) => (
                  <div
                    className={`${style.column} ${colIndex === 0 ? style['first-cell'] : ''}`}
                    data-label={columnLabels[colIndex]}
                    key={colIndex}
                  >
                    {item[field]}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div>
          <AddButton onClick={openNewClientsModal} />
          <NewClients isOpen={isNewClientsModalOpen} onClose={closeNewClientsModal} addClient={addClient} />
        </div>
      </main>
    </>
  );
}

export default Clients;
