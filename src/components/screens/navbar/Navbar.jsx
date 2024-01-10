import './navbar.css';
import '../../../assets/styles/global.css';
import { IonIcon } from '@ionic/react';
import { homeOutline, peopleOutline, settingsOutline, diamondOutline, appsOutline, barChartOutline, archiveOutline, personOutline } from 'ionicons/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Navbar = () => {
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
    ['/settings/reference/accounts', 'Статьи движения денежных средств'],
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
      return (
        <span key={index}>
          {isClickable ? (
            <Link to={currentPath} style={{ cursor: 'pointer' }}>{pageName || part}</Link>
          ) : (
            <span style={{ cursor: 'text' }}>{pageName !== undefined ? pageName : part}</span>
          )}
          {index < pathParts.length - 1 && <span> /</span>} {}
        </span>
      );
    });
  };

  return (
    <>
      <nav id="navbar">
        <ul className="navbar-items flexbox-col">
          <li className="navbar-logo flexbox">
            <Link to='/home' className="navbar-item-inner flexbox">
              <IonIcon icon={diamondOutline} size="large"/>
            </Link>
          </li>
          <li className="navbar-item flexbox-left">
            <Link to='/home' className="navbar-item-inner flexbox-left">
              <div className="navbar-item-inner-icon-wrapper flexbox">
                <IonIcon icon={homeOutline}></IonIcon>
              </div>
              <span className="link-text">Главная</span>
            </Link>
          </li>
          <li className="navbar-item flexbox-left">
            <Link to='/orders' className="navbar-item-inner flexbox-left">
              <div className="navbar-item-inner-icon-wrapper flexbox">
                <IonIcon icon={archiveOutline}></IonIcon>
              </div>
              <span className="link-text">Заказы</span>
            </Link>
          </li>
          <li className="navbar-item flexbox-left">
            <Link to='/clients' className="navbar-item-inner flexbox-left">
              <div className="navbar-item-inner-icon-wrapper flexbox">
                <IonIcon icon={peopleOutline}></IonIcon>
              </div>
              <span className="link-text">Клиенты</span>
            </Link>
          </li>
          <li className="navbar-item flexbox-left">
            <Link to='/report' className="navbar-item-inner flexbox-left">
              <div className="navbar-item-inner-icon-wrapper flexbox">
                <IonIcon icon={barChartOutline}></IonIcon>
              </div>
              <span className="link-text">Отчет</span>
            </Link>
          </li>
          <li className="navbar-item flexbox-left">
            <Link to='/inventory' className="navbar-item-inner flexbox-left">
              <div className="navbar-item-inner-icon-wrapper flexbox">
                <IonIcon icon={appsOutline}></IonIcon>
              </div>
              <span className="link-text">Склад</span>
            </Link>
          </li>
          <li className="navbar-item flexbox-left">
            <Link to='/settings' className="navbar-item-inner flexbox-left">
              <div className="navbar-item-inner-icon-wrapper flexbox">
                <IonIcon icon={settingsOutline}></IonIcon>
              </div>
              <span className="link-text">Настройки</span>
            </Link>
          </li>
        </ul>
        
      </nav>
      <div className='nav-line'>
        <div className="wrapper">
        <li className="navbar-item flexbox-left hover-navbar" style={{ paddingLeft: '5em' }}>
          <Link to={currentPage}>
            {getPageSpans(currentPage)}
          </Link>
          </li> 
          <ul className="nav-links">
          <li className="navbar-item flexbox-left">
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
      <Outlet />
    </>
    
  );
}

export default Navbar;
