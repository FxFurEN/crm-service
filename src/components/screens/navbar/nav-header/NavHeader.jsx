import { Link, useLocation } from 'react-router-dom';
import { IonIcon, IonBreadcrumb, IonBreadcrumbs, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton } from '@ionic/react';
import { personOutline } from 'ionicons/icons';
import '../../../../assets/styles/ion-style.css'

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
  return (
    <IonHeader>
        <IonToolbar>
            <IonBreadcrumbs>
              {breadcrumbs.map((breadcrumb, index) => (
                <IonBreadcrumb key={index}>
                  {breadcrumb.isCurrentPage ? (
                    breadcrumb.pageName
                  ) : (
                    <Link
                        to={breadcrumb.path} 
                        className={breadcrumb.isClickable ? 'clickable' : 'not-clickable'}
                        style={{ color: breadcrumb.isClickable ? 'gray' : 'gray' }}
                    >
                        {breadcrumb.pageName}
                    </Link>
                  )}
                </IonBreadcrumb>
              ))}
            </IonBreadcrumbs>
              <IonButtons slot="end">
                <Link to='/settings/profile'>
                    <IonButton color='light'>
                      <IonIcon icon={personOutline}></IonIcon>
                    Профиль
                    </IonButton>
                  </Link>
              </IonButtons>
        </IonToolbar>
      </IonHeader>
  );
}


export default NavHeader;
