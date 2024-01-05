import './navbar.css';
import { IonIcon } from '@ionic/react';
import { homeOutline, peopleOutline, settingsOutline, diamondOutline, appsOutline, barChartOutline } from 'ionicons/icons';
import { Link, Outlet } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <nav id="navbar">
        <ul className="navbar-items flexbox-col">
          <li className="navbar-logo flexbox-left">
            <Link to='/home' className="navbar-item-inner flexbox">
              <IonIcon icon={diamondOutline} />
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
      <Outlet />
    </>
    
  );
}

export default Navbar;
