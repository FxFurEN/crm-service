import { useState, useEffect } from 'react';
import { IonButton, IonCol, IonGrid, IonIcon, IonItem, IonItemGroup, IonLabel, IonRow } from '@ionic/react';
import { filterOutline, cloudUploadOutline, cloudDownloadOutline } from 'ionicons/icons';
import { crmAPI } from '../../../service/api';

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
        <div className={style.tableContainer}>
          <IonItemGroup>
            <IonItem color='light' className={style.tableRow} data-hide-header="true">
              {fields.map((field, index) => (
                <IonLabel key={index} className={style.tableColumn}>
                  {columnLabels[index]}
                </IonLabel>
              ))}
            </IonItem>
            {filteredData.map((item, rowIndex) => (
              <IonItem button key={rowIndex} className={style.tableRow}>
                {fields.map((field, index) => (
                  <IonLabel key={index} className={style.tableColumn} data-label={columnLabels[index]}>
                    {item[field.toLowerCase()]}
                  </IonLabel>
                ))}
              </IonItem>
            ))}
          </IonItemGroup>
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
