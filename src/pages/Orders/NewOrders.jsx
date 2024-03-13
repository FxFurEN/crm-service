import { Modal, Button, Typography, Select, Spin, Input, DatePicker, Form } from 'antd';
import { useState } from 'react';
const { TextArea } = Input;
import debounce from 'lodash/debounce';
import dayjs from 'dayjs';

const { useForm } = Form;
const { Option } = Select;

const NewOrders = ({ visible, handleOk, handleCancel }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const [form] = useForm();

  const handleOkAsync = () => {
    form
      .validateFields()
      .then((values) => {
        setConfirmLoading(true);
        setTimeout(() => {
          handleOk();
          setConfirmLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.error('Validation error:', error);
      });
  };

  const baseStyle = {
    width: 'clamp(200px, 100%, 500px)',
    height: 40,
  };

  const handleUserSearch = debounce((value) => {
    setFetching(true);
    fetchUserList(value)
      .then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      })
      .catch((error) => {
        console.error('Error fetching user list:', error);
        setFetching(false);
      });
  }, 800);

  return (
    <Modal
      title="Добавить заказ"
      centered
      open={visible}
      onOk={handleOkAsync}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={[
        <Button key="submit" loading={confirmLoading} onClick={handleOkAsync} style={{ ...baseStyle, width: '100%' }}>
          Добавить
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Typography.Title level={4}>Клиент</Typography.Title>
        <Form.Item
          name="client"
          rules={[{ required: true, message: 'Пожалуйста, выберите клиента' }]}
        >
          <Select
            showSearch
            placeholder="Имя"
            style={{ ...baseStyle }}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            filterOption={false}
            onSearch={handleUserSearch}
          >
            {options.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Typography.Title level={4}>Информация о заказе</Typography.Title>
        <Form.Item 
          name="serviceName" 
          rules={[{ required: true, message: 'Пожалуйста, введите наименование услуги' }]} 
          label="Услуга"
          style={{ marginBottom: -2 }} >
          <Select
              showSearch
              placeholder="Наименование услуги"
              style={{ ...baseStyle }}
              notFoundContent={fetching ? <Spin size="small" /> : null}
              filterOption={false}
              onSearch={handleUserSearch}
            >
              {options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
        </Form.Item>
        <Form.Item 
          name="date" 
          rules={[{ required: true, message: 'Пожалуйста, выберите дату проведения' }]} 
          label="Дата обращения"
          style={{ marginBottom: -2 }} 
          >
          <DatePicker style={{ ...baseStyle }} placeholder="Дата проведения" />
        </Form.Item>
        <Form.Item name="notes" label="Коментарии к заказу">
          <TextArea 
          style={{ ...baseStyle }} 
          placeholder="Коментарии" 
            autoSize={{
            minRows: 3,
            maxRows: 5,
          }} />
        </Form.Item>

        <Typography.Title level={4}>Дополнительно</Typography.Title>
        <Form.Item name="performer" label="Исполнитель" style={{ marginBottom: -2 }} >
        <Select
            showSearch
            placeholder="Исполнитель"
            style={{ ...baseStyle }}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            filterOption={false}
            onSearch={handleUserSearch}
          >
            {options.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="deadline" label="Дата срока выполнения">
          <DatePicker style={{ ...baseStyle }} placeholder="Срок" defaultValue={dayjs('2024-03-01')} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

async function fetchUserList(username) {
  console.log('fetching user', username);
  return fetch('https://randomuser.me/api/?results=10')
    .then((response) => response.json())
    .then((body) =>
      body.results.map((user) => ({
        label: `${user.name.first} ${user.name.last}`,
        value: user.login.username,
      })),
    );
}

export default NewOrders;
