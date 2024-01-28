import { Link, useLocation } from 'react-router-dom';
import { IonIcon, IonBreadcrumb, IonBreadcrumbs } from '@ionic/react';
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
  ]);
  const additionalPageNames = new Map([
    ['/settings/general', 'Общие'],
    ['/settings/fields', 'Поле'],
    ['/settings/reference', 'Справочники'],
    ['/settings/fields', 'Поле'],
    ['/settings/documents', 'Документы'],
  ]);

  const getPageSpans = (path) => {
    const pathParts = path.split('/').filter(part => part !== ''); 
    let currentPath = '';
    const breadcrumbElements = [];
  
    pathParts.forEach((part, index) => {
      currentPath += `/${part}`;
      const pageName = russianPageNames.get(currentPath) || additionalPageNames.get(currentPath);
      const isClickable = russianPageNames.has(currentPath);
      const isCurrentPage = currentPath === path;
  
      breadcrumbElements.push({
        path: currentPath,
        pageName: pageName || part,
        isClickable: isClickable,
        isCurrentPage: isCurrentPage
      });
    });
  
    return breadcrumbElements;
  };
  
  
  const breadcrumbs = getPageSpans(currentPage);

    return(
        <div className='nav-line'>
        <div className="wrapper">
        <li className="navbar-item flexbox-left " style={{ paddingLeft: '5em', width: 'auto', height: 'auto'}}>
            <IonBreadcrumbs>
                {breadcrumbs.map((breadcrumb, index) => (
                    <IonBreadcrumb key={index} href={breadcrumb.isClickable ? breadcrumb.path : undefined}>
                    {breadcrumb.isClickable ? (
                        <Link
                        to={breadcrumb.path}
                        style={{
                            color: breadcrumb.isCurrentPage ? 'white' : 'gray',
                            cursor: 'pointer',textDecoration: 'none', 
                            transition: 'color 0.3s ease', }}
                        className={breadcrumb.isClickable ? 'hover-navbar' : ''} 
                        >
                        {breadcrumb.pageName}
                        </Link>
                    ) : (
                        <span style={{ color: 'gray', cursor: 'text' }}>{breadcrumb.pageName}</span>
                    )}
                    </IonBreadcrumb>
                ))}
            </IonBreadcrumbs>
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
