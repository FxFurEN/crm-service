import { useState, useEffect } from 'react';
import { Card, Flex } from 'antd';
import { Area, Column, Line, Pie } from '@ant-design/charts';
import { crmAPI } from '@service/api';

const Home = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    asyncFetchServices();
  }, []);

  const asyncFetchServices = () => {
    crmAPI.getAllServices()
      .then(response => {
        const servicesData = response.data;
        setServices(servicesData);
      })
      .catch(error => {
        console.error('Failed to fetch services:', error);
      });
  };

  const priceChartData = services.map(service => ({
    name: service.name,
    price: service.price,
  }));

  const config = {
    data: priceChartData,
    xField: 'name',
    yField: 'price',
    xAxis: { label: { autoRotate: false } },
    tooltip: { formatter: ({ value }) => `$${value.toFixed(2)}` },
    height: 400,
    width: 600,
  };

  return (
    <main id="main">
      <Flex wrap="wrap" gap="large" justify="center">
        <div>
          <Card size="small" title="Line Chart">
            <Line {...config} />
          </Card>
        </div>
        <div>
          <Card size="small" title="Pie Chart">
            <Pie {...config} />
          </Card>
        </div>
        <div>
          <Card size="small" title="Column Chart">
            <Column {...config} />
          </Card>
        </div>
        <div>
          <Card size="small" title="Area Chart">
            <Area {...config} />
          </Card>
        </div>
      </Flex>
    </main>
  );
};

export default Home;
