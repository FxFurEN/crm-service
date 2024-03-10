import './navbar.scss';
import '@assets/styles/global.scss';
import { Link, Outlet } from 'react-router-dom';
import NavHeader from '../nav-header/NavHeader';
import { useSelector } from 'react-redux';
import { selectVisibility } from '@store/visibilitySlice';
import { Menu } from 'antd';
import {
  AimOutlined,
  HomeOutlined,
  InboxOutlined,
  LineChartOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  TagsOutlined,
  TeamOutlined,
  ToolOutlined
} from '@ant-design/icons';

const colors = {
  primary: 'hsla(237, 94%, 81%, 1)',
  background: 'hsla(257, 11%, 16%, 1)',
  backgroundSecondary: 'hsla(256, 12%, 12%, 1)',
  backgroundSecondaryLight: 'hsla(257, 11%, 16%, 1)',
  textPrimary: 'hsla(0, 0%, 0%, 1)',
  black: 'hsla(0, 0%, 0%, 1)',
  white: 'hsla(0, 0%, 100%, 1)',
  quiteGray: 'hsla(0, 0%, 50%, 1)',
  grooble: 'hsla(10, 28%, 93%, 1)'
};

const iconStyle = {
  color: '#FFF',
};

const Navbar = () => {
  const { isSkladVisible, isMagazinVisible, isOrdersVisible } = useSelector(selectVisibility);
  return (
    <>
      <div
        style={{
          position: 'absolute',
          zIndex: 100,
        }}
      >
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={true}
          style={{
            overflow: 'auto',
            height: '100vh',
            width: '4em',
            position: 'fixed',
            backgroundColor: colors.backgroundSecondary,
            color: colors.textPrimary,
          }}
        >
           <div
          style={{
            marginTop: '1em',
            marginBottom: '1em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}
        >
          <AimOutlined style={{ ...iconStyle, fontSize: '24px' }} />
        </div>
          <Menu.Item key="1" icon={<HomeOutlined style={iconStyle} />}>
            <Link to='/home'>Главная</Link>
          </Menu.Item>
          {isOrdersVisible && (
            <Menu.Item key="2" icon={<TagsOutlined style={iconStyle} />}>
              <Link to='/orders'>Заказы</Link>
            </Menu.Item>
          )}
          <Menu.Item key="3" icon={<TeamOutlined style={iconStyle} />}>
            <Link to='/clients'>Клиенты</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<LineChartOutlined style={iconStyle} />}>
            <Link to='/report'>Отчет</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<ToolOutlined style={iconStyle} />}>
            <Link to='/services'>Услуги</Link>
          </Menu.Item>
          {isSkladVisible && (
            <Menu.Item key="6" icon={<InboxOutlined style={iconStyle} />}>
              <Link to='/inventory'>Склад</Link>
            </Menu.Item>
          )}
          {isMagazinVisible && (
            <Menu.Item key="7" icon={<ShoppingCartOutlined style={iconStyle} />}>
              <Link to='/shop'>Магазин</Link>
            </Menu.Item>
          )}
          <Menu.Item key="8" icon={<SettingOutlined style={iconStyle} />}>
            <Link to='/settings'>Настройки</Link>
          </Menu.Item>
        </Menu>
      </div>
      <NavHeader />
      <Outlet />
    </>
  );
}

export default Navbar;
