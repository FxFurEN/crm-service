import { useState, useEffect } from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { filterOutline, cloudUploadOutline, cloudDownloadOutline } from 'ionicons/icons';

import '../../../assets/styles/main.css';
import style from  '../../../assets/styles/table.module.css';
import '../../../assets/styles/global.css';
import '../../../assets/styles/addbutton.css';
import '../../../assets/styles/button-ion.css';

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
      serviceName: 'Ремонт ноутбука',
    },
  ];

  const [filteredData, setFilteredData] = useState([...initialData]);
  const [orderList, setOrderList] = useState([...initialData]);
  const [isNewOrdersModalOpen, setIsNewOrdersModalOpen] = useState(false);

  const fields = ['id', 'updated', 'status', 'deadline', 'client', 'performer', 'serviceName'];
  const columnLabels = ['Заказ', 'Обновлен', 'Статус', 'Срок', 'Клиент', 'Исполнитель', 'Наименование товара'];


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
        <div style={{ flex: 1, overflow: 'auto' }}> 
          <div className={style.table}>
            <div className={`${style.tableHead} ${style.row}`}>
              {fields.map((field, index) => {
                const label = columnLabels[index];
                return (
                  <div
                    className={`${style.column}`}
                    data-label={label}
                    key={index}
                  >
                    {label}
                  </div>
                );
              })}
            </div>

            {filteredData.map((item, rowIndex) => (
              <div className={style.row} key={rowIndex}>
                {fields.map((field, colIndex) => {
                  const label = columnLabels[colIndex];
                  return (
                    <div
                      className={`${style.column}`}
                      data-label={label}
                      key={colIndex}
                    >
                      {item[field]}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
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