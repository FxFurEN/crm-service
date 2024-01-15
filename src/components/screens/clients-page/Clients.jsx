import '../../../assets/styles/main.css';
import '../../../assets/styles/global.css';
import '../../../assets/styles/searchBar.css';
import style from  '../../../assets/styles/table.module.css';

import {IonSearchbar} from '@ionic/react';

function Example() {

    return (
        <main id="main">
            <div>
                <div>
                    <IonSearchbar showCancelButton="never" debounce={1000} class="custom"></IonSearchbar>
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
                        <div className={style.row}>
                            <div className={style.cell} data-title="Имя">
                                Рома Аегси Хиро
                            </div>
                            <div className={style.cell} data-title="Телефон">
                                +375(**)**-**-**
                            </div>
                            <div className={style.cell} data-title="Почта">
                                -
                            </div>
                            <div className={style.cell} data-title="Тип">
                                Физ.лицо
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            
        </main>
            
    );
}
export default Example;