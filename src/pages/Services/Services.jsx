import { useState, useRef, useEffect } from 'react';
import { Button, Flex, Space, Tooltip, Input, Table, List } from 'antd';
import { EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { crmAPI } from '@service/api';
import { setServicesData } from '@store/serviceSlice'; 
import { useDispatch, useSelector } from 'react-redux';
import AddServiceModal from './AddServiceModal';
import CategoryModal from './CategoryModal';
import Floatbutton from '@components/float-button/FloatButton';

const Services = () =>{
  const [selectionType] = useState('checkbox');
  const [visibleCategoryModal, setVisibleCategoryModal] = useState(false);
  const [visibleServiceModal, setVisibleServiceModal] = useState(false);
  const [initialCategory, setInitialCategory] = useState(null); 
  const rowSelection = {
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };
  
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchServices();
  }, []);

  const fetchServices = () => {
    setLoading(true);
    crmAPI.getAllServices()
      .then(response => {
        const servicesData = response.data;
        const categoriesData = servicesData.map(service => service.category);

        dispatch(setServicesData({ services: servicesData, categories: categoriesData }));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching services:', error);
        setLoading(false);
      });
  };

  const fetchCategories = () => {
      setLoading(true);
      crmAPI.getAllCategories()
        .then(response => {
          const categoriesData = response.data;
          setCategories(categoriesData);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching categories:', error);
          setLoading(false);
        });
    };

  const services = useSelector(state => state.services.services);

  const showModalCategory = (category) => { 
    setInitialCategory(category); 
    setVisibleCategoryModal(true);
  };

  const handleOkCategory = (values) => {
    fetchCategories();
    setVisibleCategoryModal(false);
  };

  const handleCancelCategory = () => {
    setVisibleCategoryModal(false);
    setInitialCategory(null); 
  };

  const showModalService = () => {
    setVisibleServiceModal(true);
  };

  const handleOkService = (values) => {
    fetchServices();
    setVisibleServiceModal(false);
  };

  const handleCancelService = () => {
    setVisibleServiceModal(false);
  };

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
      title: 'Название услуги',
      width: 100,
      dataIndex: 'service',
      key: 'service',
      ...getColumnSearchProps('service'),
    },
    {
        title: 'Категория',
        width: 100,
        dataIndex: 'categoryService',
        key: 'categoryService',
        ...getColumnSearchProps('categoryService'),
      },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
      width: 150,
      responsive: ['md'],
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.price - b.price,
    },
  ];
  const data = services.map((service, index) => ({
    key: index + 1,
    service: service.name,
    categoryService: service.category.name,
    price: service.price,
  }));
  const dataCategory = categories.map(category => ({
    description: [{ id: category.id, name: category.name }],
  }));
  
  

  return (
    <main id="main">
      <Flex wrap="wrap" gap="large">
        <div style={{ marginLeft: '1em', }}>
          <Space size={100}>
            Все категории
            <Tooltip title="Добавить категорию" >
              <Button
                shape="circle"
                icon={<PlusOutlined />}
                type="text"
                style={{ color: 'white' }}
                onClick={() => showModalCategory()}
              />
            </Tooltip>
          </Space>
          <List
            itemLayout="horizontal"
            dataSource={dataCategory}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  description={item.description.map((category, index) => (
                    <Button
                      type="text"
                      block
                      icon={<EditOutlined/>}
                      key={index}
                      style={{ textAlign: 'left', color: 'white', position: 'relative', paddingLeft: '0' }}
                      onClick={() => showModalCategory(category)} 
                    >
                      {category.name} 
                    </Button>
                  ))}
                />
              </List.Item>
            )}
          />
        </div>

        <div style={{ flex: '1 1' }}>
            <Table
              rowSelection={{ type: selectionType, ...rowSelection }}
              columns={columns}
              dataSource={data}
              pagination={{
                position: ['right'],
              }}
              summary={() => (
                <Table.Summary>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={2}></Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              )}
            />
        </div>
      </Flex>
      <Floatbutton onClick={showModalService} icon={<PlusOutlined />} >Добавить услугу
      </Floatbutton>
      <CategoryModal
        visible={visibleCategoryModal}
        handleOk={handleOkCategory}
        handleCancel={handleCancelCategory}
        initialCategory={initialCategory} 
      />

      <AddServiceModal
        visible={visibleServiceModal}
        categories={categories}
        handleOk={handleOkService}
        handleCancel={handleCancelService}
      />
    </main>
  );
}

export default Services;
