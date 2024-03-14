import { Modal, Button, Typography, Select, Spin, Input, DatePicker, Form, message } from 'antd';
import { useState } from 'react';
import debounce from 'lodash/debounce';
import dayjs from 'dayjs';
import { crmAPI } from '@service/api';

const { TextArea } = Input;
const { useForm } = Form;
const { Option } = Select;

const NewOrders = ({ visible, handleOk, handleCancel }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [fetchingClient, setFetchingClient] = useState(false);
  const [fetchingService, setFetchingService] = useState(false);
  const [fetchingEmployee, setFetchingEmployee] = useState(false);
  const [optionsClient, setOptionsClient] = useState([]);
  const [optionsService, setOptionsService] = useState([]);
  const [optionsEmployee, setOptionsEmployee] = useState([]);
  const [form] = useForm();

  const handleOkAsync = () => {
    form
      .validateFields()
      .then(async (values) => {
        setConfirmLoading(true);
        try {
          const serviceId = values.service;
          const clientId = values.client;
          const employeeId = values.employee;
          const comments = values.comments;
          const createdAt = values.createdAt;
          const leadTime = values.leadTime;
  
          await crmAPI.createOrder({ serviceId, clientId, employeeId, comments, createdAt, leadTime });
          message.success('Заказ успешно создан');
          handleOk();
        } catch {
          message.error('Ошибка при создании заказа');
        } finally {
          setConfirmLoading(false);
        }
      })
      .catch(() => {
        message.error('Ошибка валидации');
      });
  };
  
  

  const baseStyle = {
    width: 'clamp(200px, 100%, 500px)',
    height: 40,
  };

  const handleClientSearch = debounce((value) => {
    setFetchingClient(true);
    fetchClientList(value)
      .then((newOptions) => {
        setOptionsClient(newOptions);
        setFetchingClient(false);
      })
      .catch(() => {
        message.error('Ошибка получения списка клиентов', 5);
        setFetchingClient(false);
      });
  }, 800);
  
  const handleServiceSearch = debounce((value) => {
    setFetchingService(true);
    fetchServiceList(value)
      .then((newOptions) => {
        setOptionsService(newOptions);
        setFetchingService(false);
      })
      .catch(() => {
        message.error('Ошибка получения списка услуг', 5);
        setFetchingService(false);
      });
  }, 800);
  
  const handleEmployeeSearch = debounce((value) => {
    setFetchingEmployee(true);
    fetchEmployeeList(value)
      .then((newOptions) => {
        setOptionsEmployee(newOptions);
        setFetchingEmployee(false);
      })
      .catch(() => {
        message.error('Ошибка получения списка сотрудников', 5);
        setFetchingEmployee(false);
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
        <Form.Item name="client" rules={[{ required: true, message: 'Пожалуйста, выберите клиента' }]}>
          <Select
            showSearch
            placeholder="Имя"
            style={{ ...baseStyle }}
            notFoundContent={fetchingClient ? <Spin size="small" /> : null}
            filterOption={false}
            onSearch={handleClientSearch}
          >
            {optionsClient.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Typography.Title level={4}>Информация о заказе</Typography.Title>
        <Form.Item name="service" rules={[{ required: true, message: 'Пожалуйста, введите наименование услуги' }]} label="Услуга" style={{ marginBottom: -2 }}>
          <Select
            showSearch
            placeholder="Наименование услуги"
            style={{ ...baseStyle }}
            notFoundContent={fetchingService ? <Spin size="small" /> : null}
            filterOption={false}
            onSearch={handleServiceSearch}
          >
            {optionsService.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="createdAt" rules={[{ required: true, message: 'Пожалуйста, выберите дату проведения' }]} label="Дата обращения" style={{ marginBottom: -2 }}>
          <DatePicker style={{ ...baseStyle }} placeholder="Дата проведения" />
        </Form.Item>
        <Form.Item name="comments" label="Коментарии к заказу">
          <TextArea
            style={{ ...baseStyle }}
            placeholder="Коментарии"
            autoSize={{
              minRows: 3,
              maxRows: 5,
            }}
          />
        </Form.Item>

        <Typography.Title level={4}>Дополнительно</Typography.Title>
        <Form.Item name="employee" label="Исполнитель" style={{ marginBottom: -2 }}>
          <Select
            showSearch
            placeholder="Исполнитель"
            style={{ ...baseStyle }}
            notFoundContent={fetchingEmployee ? <Spin size="small" /> : null}
            filterOption={false}
            onSearch={handleEmployeeSearch}
          >
            {optionsEmployee.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="leadTime" label="Дата срока выполнения">
          <DatePicker style={{ ...baseStyle }} placeholder="Срок" defaultValue={dayjs('2024-03-01')} />
        </Form.Item>
    </Form>
    </Modal>
  );
};

async function fetchClientList() {
  try {
    const response = await crmAPI.getAllClientsData();
    const clients = response.data;
    return clients.map((client) => ({
      label: `${client.phone}`,
      value: client.id,
    }));
  } catch (error) {
    message.error('Ошибка получения списка клиентов', 5);
    return [];
  }
}

async function fetchServiceList() {
  try {
    const response = await crmAPI.getAllServices();
    const services = response.data;
    return services.map((service) => ({
      label: service.name,
      value: service.id,
    }));
  } catch (error) {
    message.error('Ошибка получения списка услуг', 5);
    return [];
  }
}

async function fetchEmployeeList() {
  try {
    const response = await crmAPI.getAllEmployees();
    const employees = response.data;
    return employees.map((employee) => ({
      label: `${employee.initials}`,
      value: employee.id,
    }));
  } catch (error) {
    message.error('Ошибка получения списка сотрудников', 5);
    return [];
  }
}

export default NewOrders;