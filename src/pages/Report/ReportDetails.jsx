import React, { useState, useEffect } from 'react';
import { Spin, Table, Select, Button } from 'antd';
import { crmAPI } from '@service/api';
import dayjs from 'dayjs';
import { NoPrint, PrintProvider } from 'react-easy-print';

const { Option } = Select;

const ReportDetails = ({ reportType }) => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [uniqueCategories, setUniqueCategories] = useState([]);

    const fetchReportData = async (type) => {
        setLoading(true);
        try {
            let response;
            switch (type) {
                case 'Отчет о заказах по категориям услуг':
                    response = await crmAPI.getOrdersByCategory();
                    break;
                case 'Отчет о выполненных заказах сотрудниками':
                    response = await crmAPI.getCompletedOrdersByEmployee();
                    break;
                case 'Отчет о клиентах с наибольшим числом заказов':
                    response = await crmAPI.getClientsWithMostOrders();
                    break;
                case 'Отчет о стадиях выполнения заказов':
                    response = await crmAPI.getOrderStages();
                    break;
                case 'Отчет о среднем времени выполнения заказов':
                    response = await crmAPI.getAverageOrderCompletionTime();
                    break;
                default:
                    response = { data: [] };
                    break;
            }
            const dataWithIndex = response.data.map((item, index) => ({
                ...item,
                index: index + 1,
                service: item.service.name, 
                category: item.service.category.name,
                createdAt: dayjs(item.createdAt).format('DD.MM.YYYY'), 
                leadTime: dayjs(item.leadTime).format('DD.MM.YYYY'),
                client: `${item.client.initials ? item.client.initials + ' ' : ''}${item.client.name ? item.client.name : ''}`,
            }));
            setDataSource(dataWithIndex);
            // Получение уникальных категорий
            const uniqueCategories = [...new Set(dataWithIndex.map(item => item.category))];
            setUniqueCategories(uniqueCategories);
        } catch (error) {
            console.error('Ошибка получения данных отчета:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (reportType) {
            fetchReportData(reportType);
        }
    }, [reportType]);

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
    };

    const filteredData = selectedCategory ? dataSource.filter(item => item.category === selectedCategory) : dataSource;

    const columns = filteredData.length > 0 ? [
        {
            title: '№',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Название услуги',
            dataIndex: 'service',
            key: 'service',
        },
        {
            title: 'Клиент',
            dataIndex: 'client', 
            key: 'client',
        },
        {
            title: 'Дата создания',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Срок выполнения',
            dataIndex: 'leadTime',
            key: 'leadTime',
        }
    ] : [];

    return (
        <>
            <NoPrint>
                <Select showSearch placeholder="Выберите категорию" style={{ width: 200, marginBottom: 16 }} onChange={handleCategoryChange}>
                    <Option value="">Все категории</Option>
                    {uniqueCategories.map(category => (
                        <Option key={category} value={category}>{category}</Option>
                    ))}
                </Select>
                <Button type="primary" onClick={() => window.print()} style={{ marginBottom: 16 }}>Печать</Button>
            </NoPrint>
            {loading ? (
                <Spin />
            ) : (
                <PrintProvider>
                    <Table 
                        dataSource={filteredData}
                        pagination={{
                            position: ['none'],
                        }}
                        scroll={{
                            y: 600,
                        }}
                        columns={columns}
                    />
                </PrintProvider>
            )}
        </>
    );
};

export default ReportDetails;
