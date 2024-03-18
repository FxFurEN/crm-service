import { useState, useEffect } from 'react';
import { Spin, Table } from 'antd';
import { crmAPI } from '@service/api';

const ReportDetails = ({ reportType }) => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchReportData = async (type) => {
        setLoading(true);
        try {
            let data;
            switch (type) {
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

    useEffect(() => {
        if (reportType) {
            fetchReportData(reportType);
        }
    }, [reportType]);

    const columns = dataSource.length > 0 ? Object.keys(dataSource[0]).map(key => ({
        title: key,
        dataIndex: key,
        key,
    })) : [];

    return (
        <div>
            {loading ? (
                <Spin />
            ) : (
                <Table dataSource={dataSource} columns={columns} />
            )}
        </div>
    );
};

export default ReportDetails;
