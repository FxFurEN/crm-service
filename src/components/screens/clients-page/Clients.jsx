import { useState, useEffect } from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { filterOutline, cloudUploadOutline, cloudDownloadOutline } from 'ionicons/icons';
import { crmAPI } from '../../../api/api';

import '../../../assets/styles/main.css';
import '../../../assets/styles/global.css';
import style from  '../../../assets/styles/table.module.css';
import '../../../assets/styles/addbutton.css';
import '../../../assets/styles/ion-style.css';

import AddButton from '../addButton/AddButton';
import SearchBox from '../searchBox/SearchBox';
import NewClients from './addClients/NewClients';

function Clients() {
  const [filteredData, setFilteredData] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [isNewClientsModalOpen, setIsNewClientsModalOpen] = useState(false);

  const fields = ['FioClient', 'PhoneNumber', 'Mail', 'TypeClientID'];
  const columnLabels = ['Клиент', 'Номер телефона', 'Почта', 'Тип клиента'];  

  useEffect(() => {
    loadClientData();
  }, []);

  const loadClientData = () => {
    crmAPI.getAllClientsData() 
      .then(response => {
        setClientList(response.data);
        setFilteredData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleFilter = (filteredResults) => {
    setFilteredData(filteredResults);
  };

  const addClient = (newClient) => {
    crmAPI.addClient(newClient)
      .then(response => {
        loadClientData();
        closeNewClientsModal();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const openNewClientsModal = () => {
    setIsNewClientsModalOpen(true);
  };

  const closeNewClientsModal = () => {
    setIsNewClientsModalOpen(false);
  };

  

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
                  className={`${style.column}`}
                  data-label={columnLabels[index]}
                  key={index}
                >
                  {columnLabels[index]}
                </div>
              ))}
            </div>

            {filteredData.map((item, rowIndex) => (
              <div className={style.row} key={rowIndex}>
                {fields.map((field, index) => (
                  <div
                    className={`${style.column}`}
                    data-label={columnLabels[index]}
                    key={index}
                  >
                    {item[field.toLowerCase()]}
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
