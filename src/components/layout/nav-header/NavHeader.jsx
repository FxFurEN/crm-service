import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { Header } from 'antd/es/layout/layout';

import '../navbar.css';

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
    ['/settings/profile', 'Профиль'],
    ['/settings/documents/statementOfWork', 'Акт выполненных работ'],
    ['/settings/general/company', 'Компания'],
    ['/settings/general/orders', 'Общие заказы'],
    ['/settings/statuses', 'Статусы'],
    ['/settings/services', 'Услуги'],
    ['/settings/fields/order', 'Поля заказов'],
    ['/settings/fields/client', 'Поля клиентов'],
    ['/settings/orderType', 'Типы заказов'],
    ['/settings/clientType', 'Типы клиентов'],
    ['/settings/handbooks', 'Справочники'],
    ['/settings/documents', 'Документы'],
    ['/settings/modules', 'Модули'],
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
    <Header className="nav-line">
      <Breadcrumb separator={<span style={{ color: 'gray', fontSize: '17px' }}>/</span>} style={{ paddingLeft: '40px', paddingTop: '10px' }}>
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
    </Header>
  );
};

export default NavHeader;
