import { Link, useLocation } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { personOutline } from 'ionicons/icons';


const NavHeader = () => {

    const location = useLocation();
  const currentPage = location.pathname;

  const russianPageNames = new Map([
    ['/home', 'Главная'],
    ['/clients', 'Клиенты'],
    ['/report', 'Отчет'],
    ['/orders', 'Заказы'],
    ['/inventory', 'Склад'],
    ['/settings', 'Настройки'],
    ['/settings/profile', 'Профиль'],
    ['/settings/documents', 'Документы'],
    ['/settings/integrations', 'Интеграции'],
    ['/settings/general/company', 'Компания'],
    ['/settings/general/orders', 'Общие заказы'],
    ['/settings/statuses', 'Статусы'],
    ['/settings/services', 'Услуги'],
    ['/settings/notifications', 'Уведомления'],
    ['/settings/accounts', 'Статьи движения денежных средств'],
    ['/settings/paymentMethods', 'Способы оплаты'],
    ['/settings/fields/order', 'Поля заказов'],
    ['/settings/fields/client', 'Поля клиентов'],
    ['/settings/orderType', 'Типы заказов'],
    ['/settings/clientType', 'Типы клиентов'],
    ['/settings/handbooks', 'Справочники'],
  ]);
  const additionalPageNames = new Map([
    ['/settings/general', 'Общие'],
    ['/settings/fields', 'Поле'],
    ['/settings/reference', 'Справочники'],
  ]);

  const getPageSpans = (path) => {
    const pathParts = path.split('/').filter(part => part !== ''); 
    let currentPath = '';
    return pathParts.map((part, index) => {
      currentPath += `/${part}`;
      const pageName = russianPageNames.get(currentPath) || additionalPageNames.get(currentPath);
      const isClickable = russianPageNames.has(currentPath) || currentPath === '/settings';
      const isCurrentPage = currentPath === path;
      
      return (
        <span key={index}>
          {isClickable ? (
            <Link to={currentPath} className={isCurrentPage ? '' : 'hover-navbar'} style={{ cursor: isCurrentPage ? 'text' : 'pointer' }}>
              {pageName || part}
            </Link>
          ) : (
            <span style={{ cursor: 'text' }}>{pageName !== undefined ? pageName : part}</span>
          )}
          {index < pathParts.length - 1 && <span> /</span>} {}
        </span>
      );
    });
  };



    return(
        <div className='nav-line'>
        <div className="wrapper">
        <li className="navbar-item flexbox-left " style={{ paddingLeft: '5em', width: 'auto', height: 'auto'}}>
          <Link to={currentPage} >
            {getPageSpans(currentPage)}
          </Link>
          </li> 
          <ul className="nav-links">
          <li className="navbar-item flexbox-left" >
            <Link to='/settings/profile' className="navbar-item-inner flexbox-left">
            <span>Профиль</span>
              <div className="navbar-item-inner-icon-wrapper flexbox">
                <IonIcon icon={personOutline}></IonIcon>
              </div>
            </Link>
          </li>
          </ul>
        </div>
      </div>
    )
}


export default NavHeader;