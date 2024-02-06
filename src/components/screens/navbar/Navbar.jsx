import './navbar.css';
import '../../../assets/styles/global.css';
import '../../../assets/styles/ion-style.css';
import { IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { homeOutline, peopleOutline, settingsOutline, diamondOutline, appsOutline, barChartOutline, archiveOutline, bagHandleOutline} from 'ionicons/icons';
import { Link, Outlet} from 'react-router-dom';
import NavHeader from './nav-header/NavHeader';
import { useSelector } from 'react-redux';
import { selectVisibility } from '../../../redux/visibilitySlice';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const { isSkladVisible, isMagazinVisible, isOrdersVisible } = useSelector(selectVisibility);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 425); 
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  if (isMobile) {
    return (
            <IonTabs >
                  <IonRouterOutlet>
                      <NavHeader />
                      <Outlet />
                  </IonRouterOutlet>

                  <IonTabBar slot="bottom">
                    <IonTabButton tab="home" href="/home">
                      <IonIcon icon={homeOutline} />
                      <span className="link-text">Главная</span>
                    </IonTabButton>

                    {isOrdersVisible && (
                      <IonTabButton tab="orders" href="/orders">
                        <IonIcon icon={archiveOutline} />
                        <span className="link-text">Заказы</span>
                      </IonTabButton>
                    )}

                    <IonTabButton tab="clients" href="/clients">
                      <IonIcon icon={peopleOutline} />
                      <span className="link-text">Клиенты</span>
                    </IonTabButton>

                    <IonTabButton tab="report" href="/report">
                      <IonIcon icon={barChartOutline} />
                      <span className="link-text">Отчет</span>
                    </IonTabButton>

                    {isSkladVisible && (
                      <IonTabButton tab="inventory" href="/inventory">
                        <IonIcon icon={appsOutline} />
                        <span className="link-text">Склад</span>
                      </IonTabButton>
                    )}

                    {isMagazinVisible && (
                      <IonTabButton tab="shop" href="/shop">
                        <IonIcon icon={bagHandleOutline} />
                        <span className="link-text">Магазин</span>
                      </IonTabButton>
                    )}

                    <IonTabButton tab="settings" href="/settings">
                      <IonIcon icon={settingsOutline} />
                      <span className="link-text">Настройки</span>
                    </IonTabButton>
                  </IonTabBar>
              </IonTabs>
    );
  }

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
          {isOrdersVisible && (
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
          {isSkladVisible && (
          <li className="navbar-item flexbox-left">
            <Link to='/inventory' className="navbar-item-inner flexbox-left">
              <div className="navbar-item-inner-icon-wrapper flexbox">
                <IonIcon icon={appsOutline}></IonIcon>
              </div>
              <span className="link-text">Склад</span>
            </Link>
          </li>
          )}
          {isMagazinVisible && (
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
