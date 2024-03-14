import { Link, useLocation } from 'react-router-dom';
import { Avatar, Breadcrumb, Button, Layout, Space, Typography } from 'antd';
import { Header } from 'antd/es/layout/layout';

import '../navbar/navbar.scss';
import { UserOutlined } from '@ant-design/icons';

const NavHeader = () => {
  const location = useLocation();
  const currentPage = location.pathname;

  const russianPageNames = new Map([
    ['/home', 'Главная'],
    ['/clients', 'Клиенты'],
    ['/report', 'Отчет'],
    ['/orders', 'Заказы'],
    ['/inventory', 'Склад'],
    ['/shop', 'Магазин'],
    ['/settings', 'Настройки'],
    ['/services', 'Услуги'],
    ['/settings/profile', 'Профиль'],
    ['/settings/documents/statementOfWork', 'Акт выполненных работ'],
    ['/settings/general/company', 'Компания'],
    ['/settings/general/orders', 'Общие заказы'],
    ['/settings/statuses', 'Этапы'],
    ['/settings/services', 'Услуги'],
    ['/settings/fields/order', 'Поля заказов'],
    ['/settings/fields/client', 'Поля клиентов'],
    ['/settings/orderType', 'Типы заказов'],
    ['/settings/clientType', 'Типы клиентов'],
    ['/settings/handbooks', 'Справочники'],
    ['/settings/documents', 'Документы'],
    ['/settings/modules', 'Модули'],
    ['/settings/position', 'Должности'],
    ['/settings/employees', 'Сотрудники'],
    ['/settings/notifications', 'Уведомления'],
  ]);

  const additionalPageNames = new Map([
    ['/settings/general', 'Общие'],
    ['/settings/reference', 'Справочники'],
    ['/settings/fields', 'Поле'],
  ]);

  const getPageSpans = (path) => {
    const pathParts = path.split('/').filter(part => part !== ''); 
    let currentPath = '';
    const breadcrumbElements = [];
  
    pathParts.forEach((part, index) => {
      currentPath += `/${part}`;
      const pageName = russianPageNames.get(currentPath) || additionalPageNames.get(currentPath) || part; 
      const isCurrentPage = currentPath === path;
      const isClickable = russianPageNames.has(currentPath); 
  
      breadcrumbElements.push({
        path: currentPath,
        pageName: pageName,
        isClickable: isClickable,
        isCurrentPage: isCurrentPage
      });
    });
  
    return breadcrumbElements;
  };

  const breadcrumbs = getPageSpans(currentPage);

  return (
    <Layout>
        <Header className="nav-line" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ paddingLeft: '40px', paddingTop: '10px' }}>
            <Breadcrumb separator={<span style={{ color: 'gray', fontSize: '17px' }}>/</span>} >
                {breadcrumbs.map((breadcrumb, index) => (
                  <Breadcrumb.Item key={breadcrumb.path}>
                    {breadcrumb.isCurrentPage ? (
                      <span style={{ color: 'white', fontSize: '17px' }}>{breadcrumb.pageName}</span>
                    ) : (
                      breadcrumb.isClickable ? (
                        <Link to={breadcrumb.path}>{breadcrumb.pageName}</Link>
                      ) : (
                        <span style={{ color: 'gray', fontSize: '17px' }}>{breadcrumb.pageName}</span>
                      )
                    )}
                  </Breadcrumb.Item>
                ))}
              </Breadcrumb>
          </div>
          <div>
              <Link to='/settings/profile'>
                <Button type="text" icon={<UserOutlined />} size="large" style={{ color: 'white' }}>
                    Профиль
                </Button>
              </Link>
          </div>
      
        </Header>
    </Layout>
    
  );
};

export default NavHeader;
