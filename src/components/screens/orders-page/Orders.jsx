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
import NewOrders from '../addOrders/NewOrders'; // Import NewOrders component

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
      <div>
        <div className={style.wrapper}>
          <div className={style.table} style={{ boxShadow: '0 10px 13px 2px rgba(0, 0, 0, 0.2)' }}>

            <div className={style.row + ' ' + style.header}>
              <div className={style.cell}>
                Заказ
              </div>
              <div className={style.cell}>
                Обновлен
              </div>
              <div className={style.cell}>
                Статус
              </div>
              <div className={style.cell}>
                Срок
              </div>
              <div className={style.cell}>
                Клиент
              </div>
              <div className={style.cell}>
                Исполнитель
              </div>
              <div className={style.cell}>
                Наименование услуги
              </div>
            </div>

            {filteredData.map((item, index) => (
                <div className={style.row} key={index}>
                    {fields.map((field, fieldIndex) => (
                    <div className={style.cell} data-title={field} key={fieldIndex}>
                        {item[field]}
                    </div>
                    ))}
                </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <AddButton onClick={openNewOrdersModal} />
        <NewOrders isOpen={isNewOrdersModalOpen} onClose={closeNewOrdersModal} addOrders={addOrders} />
      </div>
    </main>
  );
}

export default Orders