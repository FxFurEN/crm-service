import { AppstoreOutlined, BarsOutlined, BookOutlined, ContactsOutlined, ControlOutlined, FileOutlined, NotificationOutlined, ScheduleOutlined, TeamOutlined, ToolOutlined, UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const dataCompany = [
    { title: 'Общее', link: '/settings/general/company', icon: <AppstoreOutlined /> },
    { title: 'Профиль', link: '/settings/profile', icon: <UserOutlined /> },
    { title: 'Документы', link: '/settings/documents', icon: <FileOutlined /> },
    { title: 'Сотрудники', link: '/settings/employees', icon: <TeamOutlined /> },
    { title: 'Модули', link: '/settings/modules', icon: <ControlOutlined /> },
    { title: 'Должности', link: '/settings/position', icon: <UserSwitchOutlined /> },
];
const dataOrder = [
    { title: 'Общее', link: '/settings/general/orders', icon: <AppstoreOutlined /> },
    { title: 'Этапы', link: '/settings/statuses', icon: <BarsOutlined /> },
];
const dataNotifaction = [
    { title: 'Уведомления', link: '/settings/notifications', icon: <NotificationOutlined /> },
];
const dataForms = [
    { title: 'Поле: заказы', link: '/settings/fields/order', icon: <ScheduleOutlined />},
    { title: 'Поле: клиенты', link: '/settings/fields/client', icon: <ContactsOutlined /> },
    { title: 'Справочник', link: '/settings/handbooks', icon: <BookOutlined/> },
];

const Settings = () => {
    return (
        <main id="main">
                <Row justify="center">
                    <Col 
                    xs={{ flex: '100%' }}
                    sm={{ flex: '50%' }}
                    md={{ flex: '40%' }}
                    lg={{ flex: '20%' }}
                    xl={{ flex: '10%' }}
                    >
                        <p>Компания</p>
                        {dataCompany.map((item, index) => (
                            <Link key={index} to={item.link} style={{ color: 'white' }}>
                                <Button type="text" style={{ color: 'white', textAlign: 'left', fontSize: '16px' }} icon={item.icon}>
                                    {item.title}
                                </Button>
                            </Link>
                        ))}
                    </Col>
                    <Col 
                    xs={{ flex: '100%' }}
                    sm={{ flex: '50%' }}
                    md={{ flex: '40%' }}
                    lg={{ flex: '20%' }}
                    xl={{ flex: '10%' }}
                    >
                        <p>Заказы</p>
                        {dataOrder.map((item, index) => (
                            <Link key={index} to={item.link} style={{ color: 'white', }}>
                                <Button type="text" style={{ color: 'white', textAlign: 'left',  fontSize: '16px'  }} icon={item.icon}>
                                    {item.title}
                                </Button>
                            </Link>
                        ))}
                    </Col>
                    <Col 
                    xs={{ flex: '100%' }}
                    sm={{ flex: '50%' }}
                    md={{ flex: '40%' }}
                    lg={{ flex: '20%' }}
                    xl={{ flex: '10%' }}
                    >
                        <p>Уведомления</p>
                        {dataNotifaction.map((item, index) => (
                            <Link key={index} to={item.link} style={{ color: 'white', }}>
                                <Button type="text" style={{ color: 'white', textAlign: 'left',  fontSize: '16px'  }} icon={item.icon}>
                                    {item.title}
                                </Button>
                            </Link>
                        ))}
                    </Col>
                    <Col 
                    xs={{ flex: '100%' }}
                    sm={{ flex: '50%' }}
                    md={{ flex: '40%' }}
                    lg={{ flex: '20%' }}
                    xl={{ flex: '10%' }}
                    >
                        <p>Формы</p>
                        {dataForms.map((item, index) => (
                            <Link key={index} to={item.link} style={{ color: 'white' }}>
                                <Button type="text" style={{ color: 'white', textAlign: 'left',fontSize: '16px'  }} icon={item.icon}>
                                    {item.title}
                                </Button>
                            </Link>
                        ))}
                    </Col>
                </Row>     
            <Outlet />
        </main>
    );
};

export default Settings;
