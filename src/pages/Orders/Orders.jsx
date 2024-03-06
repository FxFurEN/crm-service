import { useState, useRef } from 'react';
import { Button, Input, Space, Table, Tag, Timeline} from 'antd';
import Highlighter from 'react-highlight-words';
import { ClockCircleOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import InfoOrders from './InfoOrders';
import NewOrders from './NewOrders';
import Floatbutton from '@components/float-button/FloatButton';

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
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Поиск клиента `}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Поиск
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Сбросить
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Закрыть
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
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
      title: 'Товар',
      width: 50,
      dataIndex: 'goods',
      key: 'good',
    },
    {
      title: 'Дата создания',
      width: 50,
      dataIndex: 'updateDate',
      key: 'update',
      responsive: ['md'],
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      width: 50,
      responsive: ['md'],
      filters: [
        { text: 'Status 1', value: 'Status 1' },
        { text: 'Status 2', value: 'Status 2' },
        { text: 'Status 3', value: 'Status 3' },
        { text: 'Status 4', value: 'Status 4' },
      ],
      onFilter: (value, record) => record.status.includes(value),
      render: (text) => (
        <Tag color="blue" key={text}>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Клиент',
      width: 50,
      dataIndex: 'nameClient',
      key: 'client',
      fixed: 'left',
      ...getColumnSearchProps('nameClient'),
    },
    {
      title: 'Сотрудник',
      width: 50,
      dataIndex: 'employee',
      key: 'employee',
    },
  ];
  const data = [];
  for (let i = 1; i < 31; i++) {
    data.push({
      key: i,
      updateDate: `Update in 07.${i}`,
      goods: `Goods ${i}`,
      status: `Status ${i % 4 + 1}`,
      nameClient: `Employee ${i}`,
      employee: `Employee ${i}`,
      description: 
      <Timeline
        items={[
          {
            children: 'Create a services site 2015-09-01',
          },
          {
            children: 'Solve initial network problems 2015-09-01',
          },
          {
            dot: (
              <ClockCircleOutlined
                style={{
                  fontSize: '16px',
                }}
              />
            ),
            color: 'red',
            children: 'Technical testing 2015-09-01',
          },
          {
            children: 'Network problems being solved 2015-09-01',
          },
        ]}
      />
    });
  }
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
            pagination={{
              pageSize: 50,
              position: ['none'],
            }}
            scroll={{
              y: 600,
            }}
            expandable={{
              expandedRowRender: (record) => (
                <p
                  style={{
                    margin: 0,
                  }}
                >
                  {record.description}
                </p>
              ),
              rowExpandable: (record) => record.name !== 'Not Expandable',
            }}
            summary={() => (
              <Table.Summary >
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={2}>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            )}
            onRow={(record) => {
              return {
                onClick: () => handleInfoModal(record),
              };
            }}
          />
        <Floatbutton onClick={handleNewOrderModal} icon={<PlusOutlined />} >Добавить заказ</Floatbutton>
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
