import { useState, useRef, useEffect } from 'react';
import { Button, Input, Space, Table, Tag } from 'antd';
import Highlighter from 'react-highlight-words';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import InfoOrders from './InfoOrders';
import NewOrders from './NewOrders';
import Floatbutton from '@components/float-button/FloatButton';
import { crmAPI } from '@service/api';

const Orders = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleNew, setIsModalVisibleNew] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Поиск клиента`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Поиск
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Сбросить
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Услуга',
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: 'Дата создания',
      dataIndex: 'createdAt', 
      key: 'createdAt',
    },
    {
      title: 'Срок',
      dataIndex: 'leadTime', 
      key: 'leadTime',
    },
    {
      title: 'Клиент',
      dataIndex: 'client', 
      key: 'client',
      ...getColumnSearchProps('client'), 
    },
    {
      title: 'Сотрудник',
      dataIndex: 'employee', 
      key: 'employee',
    },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await crmAPI.getOrders();
      const orders = response.data.map(order => ({
        key: order.id,
        service: order.service.name,
        createdAt: order.createdAt, 
        leadTime: order.leadTime, 
        client: order.client.phone, 
        employee: order.employee.initials, 
        comments: order.comments 
      }));
      setData(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleInfoModal = (record) => {
    setSelectedOrder(record);
    setIsModalVisible(true);
  };

  const handleNewOrderModal = () => {
    setIsModalVisibleNew(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleOkNew = () => {
    setIsModalVisibleNew(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalVisibleNew(false);
  };

  return (
    <>
      <main id="main">
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 50, position: ['none'] }}
          scroll={{ y: 600 }}
          expandable={{
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>
                {record.description}
              </p>
            ),
            rowExpandable: (record) => record.name !== 'Not Expandable',
          }}
          onRow={(record) => ({
            onClick: () => handleInfoModal(record),
          })}
        />
        <Floatbutton onClick={handleNewOrderModal} icon={<PlusOutlined />}>
          Добавить заказ
        </Floatbutton>
        <InfoOrders
          visible={isModalVisible}
          handleOk={handleOk}
          handleCancel={handleCancel}
          order={selectedOrder}
        />
        <NewOrders
          visible={isModalVisibleNew}
          handleOk={handleOkNew}
          handleCancel={handleCancel}
        />
      </main>
    </>
  );
}

export default Orders;
