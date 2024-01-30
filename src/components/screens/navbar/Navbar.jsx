import './navbar.css';
import '../../../assets/styles/global.css';
import { IonIcon } from '@ionic/react';
import { homeOutline, peopleOutline, settingsOutline, diamondOutline, appsOutline, barChartOutline, archiveOutline, bagHandleOutline} from 'ionicons/icons';
import { Link, Outlet} from 'react-router-dom';
import NavHeader from './nav-header/NavHeader';
import { useEffect, useState } from 'react';

const Navbar = ({ visibility = {} }) => {
  const { isSkladVisible, isMagazinVisible, isOrdersVisible } = visibility;
  const [showSklad, setShowSklad] = useState(true);
  const [showMagazin, setShowMagazin] = useState(true);
  const [showOrders, setShowOrders] = useState(true);

  useEffect(() => {
    setShowSklad(isSkladVisible);
    setShowMagazin(isMagazinVisible);
    setShowOrders(isOrdersVisible);
  }, [isSkladVisible, isMagazinVisible, isOrdersVisible]);

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
          {showOrders && (
          <li className="navbar-item flexbox-left">
            <Link to='/orders' className="navbar-item-inner flexbox-left">
              <div className="navbar-item-inner-icon-wrapper flexbox">
                <IonIcon icon={archiveOutline}></IonIcon>
              </div>
              <span className="link-text">Заказы</span>
            </Link>
          </li>
          )}
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
          {showSklad && (
          <li className="navbar-item flexbox-left">
            <Link to='/inventory' className="navbar-item-inner flexbox-left">
              <div className="navbar-item-inner-icon-wrapper flexbox">
                <IonIcon icon={appsOutline}></IonIcon>
              </div>
              <span className="link-text">Склад</span>
            </Link>
          </li>
          )}
          {showMagazin && (
          <li className="navbar-item flexbox-left">
            <Link to='/shop' className="navbar-item-inner flexbox-left">
              <div className="navbar-item-inner-icon-wrapper flexbox">
                <IonIcon icon={bagHandleOutline}></IonIcon>
              </div>
              <span className="link-text">Магазин</span>
            </Link>
          </li>
          )}
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
      <NavHeader/>
      <Outlet />
    </>
    
  );
}

export default Navbar;
