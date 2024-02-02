import { useState, useEffect } from 'react';
import { IonButton, IonIcon, IonItem, IonItemGroup, IonLabel } from '@ionic/react';
import { filterOutline, cloudUploadOutline, cloudDownloadOutline } from 'ionicons/icons';

import '../../../assets/styles/main.css';
import style from  '../../../assets/styles/table.module.css';
import '../../../assets/styles/global.css';
import '../../../assets/styles/addbutton.css';
import '../../../assets/styles/ion-style.css';

import AddButton from '../addButton/AddButton';
import SearchBox from '../searchBox/SearchBox';
import NewOrders from './addOrders/NewOrders'; // Import NewOrders component

const Orders = () => {
  const initialData = [
    {
      id: '1',
      updated: '07.01',
      status: 'В работе',
      deadline: '3 дн',
      client: 'Рома Аегис Хиро',
      performer: 'Тикита Нимошенко',
    },
  ];

  const [filteredData, setFilteredData] = useState([...initialData]);
  const [orderList, setOrderList] = useState([...initialData]);
  const [isNewOrdersModalOpen, setIsNewOrdersModalOpen] = useState(false);

  const fields = ['id', 'updated', 'status', 'deadline', 'client', 'performer'];
  const columnLabels = ['Заказ', 'Обновлен', 'Статус', 'Срок', 'Клиент', 'Исполнитель'];


  useEffect(() => {
    setFilteredData(orderList);
  }, [orderList]);

  const handleFilter = (filteredResults) => {
    setFilteredData(filteredResults);
  };
  

  const addOrders = (newOrder) => {
    setOrderList((prevList) => [...prevList, newOrder]);
  };

  const openNewOrdersModal = () => {
    setIsNewOrdersModalOpen(true);
  };

  const closeNewOrdersModal = () => {
    setIsNewOrdersModalOpen(false);
  };

  return (
    <>
      <main id="main">
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <SearchBox fields={fields} data={orderList} onFilter={handleFilter} />
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
        <AddButton onClick={openNewOrdersModal} />
        <NewOrders isOpen={isNewOrdersModalOpen} onClose={closeNewOrdersModal} addOrders={addOrders} />
      </div>
    </main>
    </>
    
  );
}

export default Orders