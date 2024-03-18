import { useState, useEffect } from 'react';
import { Table } from 'antd';
import { crmAPI } from '@service/api';

const ReportDetails = ({ reportType }) => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReportData = async () => {
            setLoading(true);
            try {
                let data;
                switch (reportType) {
                    case 'Отчет о заказах по категориям услуг':
                        data = await crmAPI.getOrdersByCategory();
                        break;
                    case 'Отчет о выполненных заказах сотрудниками':
                        data = await crmAPI.getCompletedOrdersByEmployee();
                        break;
                    case 'Отчет о клиентах с наибольшим числом заказов':
                        data = await crmAPI.getClientsWithMostOrders();
                        break;
                    case 'Отчет о стадиях выполнения заказов':
                        data = await crmAPI.getOrderStages();
                        break;
                    case 'Отчет о среднем времени выполнения заказов':
                        data = await crmAPI.getAverageOrderCompletionTime();
                        break;
                    default:
                        data = [];
                        break;
                }
                
                setDataSource(data);
            } catch (error) {
                console.error('Ошибка получения данных отчета:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReportData();
    }, [reportType]);

    let columns = [];
    switch (reportType) {
        case 'Отчет о заказах по категориям услуг':
            columns = [
                {
                    title: 'Категория услуг',
                    dataIndex: 'category',
                    key: 'category',
                },
                {
                    title: 'Количество заказов',
                    dataIndex: 'orderCount',
                    key: 'orderCount',
                },
                {
                    title: 'Общая выручка',
                    dataIndex: 'totalRevenue',
                    key: 'totalRevenue',
                },
            ];
            break;
        case 'Отчет о выполненных заказах сотрудниками':
            columns = [
                {
                    title: 'Сотрудник',
                    dataIndex: 'employeeName',
                    key: 'employeeName',
                },
                {
                    title: 'Количество выполненных заказов',
                    dataIndex: 'completedOrdersCount',
                    key: 'completedOrdersCount',
                },
            ];
            break;
        case 'Отчет о стадиях выполнения заказов':
            columns = [
                {
                    title: 'Название стадии',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: 'Описание',
                    dataIndex: 'description',
                    key: 'description',
                },
            ];
            break;
        case 'Отчет о среднем времени выполнения заказов':
            columns = [
                {
                    title: 'Среднее время выполнения',
                    dataIndex: 'averageCompletionTime',
                    key: 'averageCompletionTime',
                },
            ];
            break;
        default:
            columns = [];
            break;
    }

    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            loading={loading}
            pagination={false}
            bordered
            rowKey={(record) => record.id}
        />
    );
};

export default ReportDetails;
