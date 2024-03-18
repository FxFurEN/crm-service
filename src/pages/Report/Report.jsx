import { useState } from 'react';
import { Button, List } from 'antd';
import ReportDetails from './ReportDetails'; 

const data = [
    {
        title: 'Отчет о заказах по категориям услуг',
        description: ['Просмотр заказов по категориям', 'Общая выручка по категориям']
    },
    {
        title: 'Отчет о выполненных заказах сотрудниками',
        description: ['Просмотр выполненных заказов по сотрудникам']
    },
    {
        title: 'Отчет о клиентах с наибольшим числом заказов',
        description: ['Просмотр клиентов с наибольшим числом заказов']
    },
    {
        title: 'Отчет о стадиях выполнения заказов',
        description: ['Просмотр стадий выполнения заказов']
    },
    {
        title: 'Отчет о среднем времени выполнения заказов',
        description: ['Просмотр среднего времени выполнения заказов']
    },
];

const Report = () => {
    const [selectedReport, setSelectedReport] = useState(null);

    const handleReportClick = (reportTitle) => {
        setSelectedReport(reportTitle);
    };

    return (
        <main id="main">
            {selectedReport && (
                <ReportDetails reportType={selectedReport} /> 
            )}
            {!selectedReport && (
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                title={<strong style={{ color: 'white' }}>{item.title}</strong>}
                                description={item.description.map((desc, index) => (
                                    <Button
                                        type="text"
                                        block
                                        key={index}
                                        style={{ height: '40px', textAlign: 'left', color: 'white', fontSize: '18px', paddingLeft: '0' }}
                                        onClick={() => handleReportClick(item.title)}
                                    >
                                        {desc}
                                    </Button>
                                ))}
                            />
                        </List.Item>
                    )}
                />
            )}
        </main>
    );
};

export default Report;
