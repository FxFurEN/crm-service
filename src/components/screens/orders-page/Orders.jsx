import '../../../assets/styles/main.css';
import style from  '../../../assets/styles/table.module.css';
import '../../../assets/styles/global.css';


const Orders = () =>{
    return(
        <main id="main">
            <h2>Заказы</h2>
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
                        
                        <div className={style.row}>
                            <div className={style.cell} data-title="Номер">
                                1
                            </div>
                            <div className={style.cell} data-title="Обновлен">
                                07.01
                            </div>
                            <div className={style.cell} data-title="Статус">
                                В работе
                            </div>
                            <div className={style.cell} data-title="Срок">
                                3 дн
                            </div>
                            <div className={style.cell} data-title="Клиент">
                                Рома Аегис Хиро
                            </div>
                            <div className={style.cell} data-title="Исполнитель">
                                Тикита Нимошенко
                            </div>
                            <div className={style.cell} data-title="Наименование услуги">
                                Ремонт ноутбука
                            </div>
                        </div>
                        
                    </div>
                </div>
        </main>
    )
}

export default Orders