import { useState } from 'react';
import '../../../assets/styles/main.css';
import '../../../assets/styles/global.css';
import style from  '../../../assets/styles/table.module.css';

import AddButton from '../addButton/AddButton';
import SearchBox from '../searchBox/SearchBox';

function Clients() {
    const initialData = [
        {
          name: 'Рома Аегси Хиро',
          phone: '+375(**)**-**-**',
          email: '-',
          type: 'Физ.лицо',
        },
        {
            name: '11',
            phone: '+375(**)**-**-**',
            email: '-',
            type: 'Юр.лицо',
        },
        {
            name: 'Иванов Иван Иванович',
            phone: '+375(**)**-**-**',
            email: 'ivanov@example.com',
            type: 'Физ.лицо',
        },
        {
            name: 'ООО "Пример"',
            phone: '+375(**)**-**-**',
            email: 'info@example.com',
            type: 'Юр.лицо',
        },
        {
            name: 'Имя1',
            phone: '+375(**)**-**-**',
            email: 'email1@example.com',
            type: 'Физ.лицо',
        },
        {
            name: 'Имя2',
            phone: '+375(**)**-**-**',
            email: 'email2@example.com',
            type: 'Юр.лицо',
        },
        {
            name: 'Имя3',
            phone: '+375(**)**-**-**',
            email: 'email1@example.com',
            type: 'Физ.лицо',
        },
        {
            name: 'Имя4',
            phone: '+375(**)**-**-**',
            email: 'email2@example.com',
            type: 'Юр.лицо',
        },
        {
            name: 'Имя5',
            phone: '+375(**)**-**-**',
            email: 'email1@example.com',
            type: 'Физ.лицо',
        },
        {
            name: 'Имя6',
            phone: '+375(**)**-**-**',
            email: 'email2@example.com',
            type: 'Юр.лицо',
        },
        {
            name: 'Рома Аегси Хиро',
            phone: '+375(**)**-**-**',
            email: '-',
            type: 'Физ.лицо',
          },
          {
              name: '11',
              phone: '+375(**)**-**-**',
              email: '-',
              type: 'Юр.лицо',
          },
          {
              name: 'Иванов Иван Иванович',
              phone: '+375(**)**-**-**',
              email: 'ivanov@example.com',
              type: 'Физ.лицо',
          },
          {
              name: 'ООО "Пример"',
              phone: '+375(**)**-**-**',
              email: 'info@example.com',
              type: 'Юр.лицо',
          },
          {
              name: 'Имя1',
              phone: '+375(**)**-**-**',
              email: 'email1@example.com',
              type: 'Физ.лицо',
          },
          {
              name: 'Имя2',
              phone: '+375(**)**-**-**',
              email: 'email2@example.com',
              type: 'Юр.лицо',
          },
          {
              name: 'Имя3',
              phone: '+375(**)**-**-**',
              email: 'email1@example.com',
              type: 'Физ.лицо',
          },
          {
              name: 'Имя4',
              phone: '+375(**)**-**-**',
              email: 'email2@example.com',
              type: 'Юр.лицо',
          },
          {
              name: 'Имя5',
              phone: '+375(**)**-**-**',
              email: 'email1@example.com',
              type: 'Физ.лицо',
          },
          {
              name: 'Имя6',
              phone: '+375(**)**-**-**',
              email: 'email2@example.com',
              type: 'Юр.лицо',
          },
          {
            name: 'Рома Аегси Хиро',
            phone: '+375(**)**-**-**',
            email: '-',
            type: 'Физ.лицо',
          },
          {
              name: '11',
              phone: '+375(**)**-**-**',
              email: '-',
              type: 'Юр.лицо',
          },
          {
              name: 'Иванов Иван Иванович',
              phone: '+375(**)**-**-**',
              email: 'ivanov@example.com',
              type: 'Физ.лицо',
          },
          {
              name: 'ООО "Пример"',
              phone: '+375(**)**-**-**',
              email: 'info@example.com',
              type: 'Юр.лицо',
          },
          {
              name: 'Имя1',
              phone: '+375(**)**-**-**',
              email: 'email1@example.com',
              type: 'Физ.лицо',
          },
          {
              name: 'Имя2',
              phone: '+375(**)**-**-**',
              email: 'email2@example.com',
              type: 'Юр.лицо',
          },
          {
              name: 'Имя3',
              phone: '+375(**)**-**-**',
              email: 'email1@example.com',
              type: 'Физ.лицо',
          },
          {
              name: 'Имя4',
              phone: '+375(**)**-**-**',
              email: 'email2@example.com',
              type: 'Юр.лицо',
          },
          {
              name: 'Имя5',
              phone: '+375(**)**-**-**',
              email: 'email1@example.com',
              type: 'Физ.лицо',
          },
          {
              name: 'Имя6',
              phone: '+375(**)**-**-**',
              email: 'email2@example.com',
              type: 'Юр.лицо',
          },
      ];
    
        const [data] = useState(initialData);
        const [filteredData, setFilteredData] = useState(initialData);

        const fields = ['name', 'phone', 'email', 'type'];

        const handleFilter = (filteredResults) => {
            setFilteredData(filteredResults);
        };

    return (
        <main id="main">
            <div>
                <div>
                    <SearchBox fields={fields} data={data} onFilter={handleFilter} />
                </div>
            </div>
            <div>
                <div className={style.wrapper}>
                    <div className={style.table} style={{ boxShadow: '0 10px 13px 2px rgba(0, 0, 0, 0.2)' }}>
                        <div className={style.row + ' ' + style.header}>
                            <div className={style.cell}>
                                Имя
                            </div>
                            <div className={style.cell}>
                                Телефон
                            </div>
                            <div className={style.cell}>
                                Почта
                            </div>
                            <div className={style.cell}>
                                Тип
                            </div>
                        </div>
                        {filteredData.map((item, index) => (
                            <div className={style.row} key={index}>
                                <div className={style.cell} data-title="Имя">
                                {item.name}
                                </div>
                                <div className={style.cell} data-title="Телефон">
                                {item.phone}
                                </div>
                                <div className={style.cell} data-title="Почта">
                                {item.email}
                                </div>
                                <div className={style.cell} data-title="Тип">
                                {item.type}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <AddButton/>
            </div>
        </main>
    );
}

export default Clients;
