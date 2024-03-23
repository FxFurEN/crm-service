import { useState, useEffect } from 'react';
import { Card, Flex } from 'antd';
import { Column } from '@ant-design/charts';
import { crmAPI } from '@service/api';

const Home = () => {
  const [orderDataLast7Days, setOrderDataLast7Days] = useState([]);
  const [orderDataByEmployee, setOrderDataByEmployee] = useState([]);

  useEffect(() => {
    asyncFetchOrdersLast7Days();
    asyncFetchOrdersByEmployee();
  }, []);

  const asyncFetchOrdersLast7Days = () => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 6);

    crmAPI.getOrders()
      .then(response => {
        const ordersData = response.data;
        const ordersLast7Days = ordersData.filter(order => {
          const orderDate = new Date(order.createdAt);
          return orderDate >= startDate && orderDate <= endDate;
        });
        const ordersCountByDay = ordersLast7Days.reduce((acc, order) => {
          const orderDate = new Date(order.createdAt);
          const day = orderDate.toLocaleDateString();
          acc[day] = (acc[day] || 0) + 1;
          return acc;
        }, {});
        const chartData = Object.keys(ordersCountByDay).map(date => ({
          date,
          количество: ordersCountByDay[date],
        }));
        setOrderDataLast7Days(chartData);
      })
      .catch(error => {
        console.error('Не удалось загрузить данные о заказах:', error);
      });
  };

  const asyncFetchOrdersByEmployee = () => {
    crmAPI.getOrders()
      .then(response => {
        const ordersData = response.data;
        const ordersCountByEmployee = ordersData.reduce((acc, order) => {
          const employee = order.employee.initials;
          acc[employee] = (acc[employee] || 0) + 1;
          return acc;
        }, {});
        const chartData = Object.keys(ordersCountByEmployee).map(employee => ({
          employee,
          количество: ordersCountByEmployee[employee],
        }));
        setOrderDataByEmployee(chartData);
      })
      .catch(error => {
        console.error('Не удалось загрузить данные о заказах:', error);
      });
  };

  const configLast7Days = {
    data: orderDataLast7Days,
    xField: 'date',
    yField: 'количество',
    legend: false,
    height: 400,
    width: 600,
  };

  const configByEmployee = {
    data: orderDataByEmployee,
    xField: 'employee',
    yField: 'количество',
    legend: false,
    height: 400,
    width: 600,
  };

  return (
    <main id="main">
      <Flex wrap="wrap" gap="large" justify="center">
        <div>
          <Card size="small" title="Количество заказов за последние 7 дней">
            <Column {...configLast7Days} />
          </Card>
        </div>
        <div>
          <Card size="small" title="Количество заказов по сотрудникам">
            <Column {...configByEmployee} />
          </Card>
        </div>
      </Flex>
    </main>
  );
};

export default Home;
