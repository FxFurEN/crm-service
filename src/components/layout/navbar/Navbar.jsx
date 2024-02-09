import './navbar.css';
import '@assets/styles/global.css';
import { Link, Outlet} from 'react-router-dom';
import NavHeader from '../nav-header/NavHeader';
import { useSelector } from 'react-redux';
import { selectVisibility } from '@store/visibilitySlice';
import { HarmonyOSOutlined, HomeOutlined, InboxOutlined, LineChartOutlined, SettingOutlined, ShoppingCartOutlined, TagsOutlined, TeamOutlined } from '@ant-design/icons'; 


const Navbar = () => {
  const { isSkladVisible, isMagazinVisible, isOrdersVisible } = useSelector(selectVisibility);

  return (
    <>
      <nav id="navbar">
        <ul className="navbar-items flexbox-col">
          <li className="navbar-logo flexbox">
            <Link to='/home' className="navbar-item-inner flexbox">
              <HarmonyOSOutlined style={{ fontSize: '30px', color:'white',}} />
            </Link>
          </li>
          <li className="navbar-item flexbox-left">
            <Link to='/home' className="navbar-item-inner flexbox-left">
              <div className="navbar-item-inner-icon-wrapper flexbox">
                  <HomeOutlined style={{ fontSize: '20px', color:'white',}}/>
              </div>
              <span className="link-text">Главная</span>
            </Link>
          </li>
          {isOrdersVisible && (
          <li className="navbar-item flexbox-left">
            <Link to='/orders' className="navbar-item-inner flexbox-left">
              <div className="navbar-item-inner-icon-wrapper flexbox">
                <TagsOutlined style={{ fontSize: '20px', color:'white',}}/>
              </div>
              <span className="link-text">Заказы</span>
            </Link>
          </li>
          )}
          <li className="navbar-item flexbox-left">
            <Link to='/clients' className="navbar-item-inner flexbox-left">
              <div className="navbar-item-inner-icon-wrapper flexbox">
                <TeamOutlined style={{ fontSize: '20px', color:'white',}}/>
              </div>
              <span className="link-text">Клиенты</span>
            </Link>
          </li>
          <li className="navbar-item flexbox-left">
            <Link to='/report' className="navbar-item-inner flexbox-left">
              <div className="navbar-item-inner-icon-wrapper flexbox">
                  <LineChartOutlined style={{ fontSize: '20px', color:'white',}}/>
              </div>
              <span className="link-text">Отчет</span>
            </Link>
          </li>
          {isSkladVisible && (
          <li className="navbar-item flexbox-left">
            <Link to='/inventory' className="navbar-item-inner flexbox-left">
              <div className="navbar-item-inner-icon-wrapper flexbox">
                <InboxOutlined style={{ fontSize: '20px', color:'white',}} />
              </div>
              <span className="link-text">Склад</span>
            </Link>
          </li>
          )}
          {isMagazinVisible && (
          <li className="navbar-item flexbox-left">
            <Link to='/shop' className="navbar-item-inner flexbox-left">
              <div className="navbar-item-inner-icon-wrapper flexbox">
                  <ShoppingCartOutlined style={{ fontSize: '20px', color:'white',}} />
              </div>
              <span className="link-text">Магазин</span>
            </Link>
          </li>
          )}
          <li className="navbar-item flexbox-left">
            <Link to='/settings' className="navbar-item-inner flexbox-left">
              <div className="navbar-item-inner-icon-wrapper flexbox">
                <SettingOutlined style={{ fontSize: '20px', color:'white',}} />
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
