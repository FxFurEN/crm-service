import { useState, useRef } from 'react';
import { Button, ConfigProvider, Flex, Space, Tooltip, Input, Table, List } from 'antd';
import {PlusOutlined, SearchOutlined, SmileOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import AddCategory from './AddCetegory'
import InfoInventory from './InfoInventory';

const Inventory = () =>{
  const [selectionType] = useState('checkbox');
  const [customize] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  


  const showModal = () => {
    setIsModalVisible(true);
  };
  const showAddCategoryModal = () => {
    setIsAddCategoryModalVisible(true);
  };
  
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleRowClick = (record) => {
    setSelectedItem(record);
    setIsModalVisible(true);
  };
  
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
          placeholder={`Поиск товара`}
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
      title: 'Артикуль',
      width: 50,
      dataIndex: 'article',
      key: 'article',
      responsive: ['md'],
      ...getColumnSearchProps('article'),
    },
    {
      title: 'Товар',
      width: 100,
      dataIndex: 'good',
      key: 'good',
      ...getColumnSearchProps('good'),
    },
    {
      title: 'Количество',
      dataIndex: 'amount',
      key: 'amount',
      width: 150,
      responsive: ['md'],
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.amount - b.amount,
    },
  ];
  const data = [];
  for (let i = 1; i < 50; i++) {
    const article = String(i).padStart(6, '0');
    data.push({
      key: i,
      article: article,
      good: `Good ${i}`,
      amount: `${i}`,
    });
  }
  const dataCategory = [
      {
        description: ['Телефон', 'Ноутбук']
      },
  ];

  const customizeRenderEmpty = () => (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <SmileOutlined
        style={{
          fontSize: 20,
        }}
      />
      <p>Данные не найдены</p>
    </div>
  );
    return(
      <main id="main">
      <Flex  wrap="wrap" gap="large">
        <div style={{ marginLeft: '1em',}}>
        <Space size={100}>
          Все категории
            <Tooltip title="Добавить категорию" >
              <Button 
                shape="circle" 
                icon={<PlusOutlined />} 
                type="text" 
                style={{ color: 'white' }} 
                onClick={showAddCategoryModal}
              />
            </Tooltip>
        </Space>
          <List
            itemLayout="horizontal"
            dataSource={dataCategory}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  description={item.description.map((desc, index) => (
                    <Button
                      type="text"
                      block
                      key={index}
                      style={{ textAlign: 'left', color: 'white', position: 'relative', paddingLeft: '0' }}
                    >
                      {desc}
                    </Button>
                  ))}
                />
              </List.Item>
            )}
          />
        </div>

        <div style={{ flex: '1 1' }}>
          <ConfigProvider renderEmpty={customize ? customizeRenderEmpty : undefined}>
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
              summary={() => (
                <Table.Summary>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={2}></Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              )}
              onRow={(record) => ({
                onClick: () => handleRowClick(record),
              })}
            />
          </ConfigProvider>
        </div>
      </Flex>
      <AddCategory 
        visible={isAddCategoryModalVisible}
        handleOk={() => setIsAddCategoryModalVisible(false)}
        handleCancel={() => setIsAddCategoryModalVisible(false)}
      />

      <InfoInventory
        visible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        item={selectedItem}
      />
    </main>
        
    )
}

export default Inventory