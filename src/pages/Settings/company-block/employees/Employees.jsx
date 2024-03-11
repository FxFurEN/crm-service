import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Select } from 'antd';
import { crmAPI } from '@service/api';
import Floatbutton from '@components/float-button/FloatButton';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const baseStyle = {
  width: 'clamp(200px, 100%, 500px)',
  height: 40,
};

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [positions, setPositions] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false); 

  useEffect(() => {
    fetchEmployees();
    fetchPositions();
  }, []);

  const fetchEmployees = () => {
    crmAPI.getAllEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
        message.error('Ошибка при загрузке сотрудников');
      });
  };

  const fetchPositions = () => {
    crmAPI.getAllPositions()
      .then((response) => {
        setPositions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching positions:', error);
        message.error('Ошибка при загрузке должностей');
      });
  };

  const handleDelete = (id) => {
    setConfirmLoading(true); 
    Modal.confirm({
      title: 'Вы уверены, что хотите удалить сотрудника?',
      okText: 'Да',
      cancelText: 'Отмена',
      onOk: () => {
        crmAPI.deleteEmployee(id)
          .then(() => {
            message.success('Сотрудник удален');
            fetchEmployees();
          })
          .catch((error) => {
            console.error('Ошибка при удалении сотрудника:', error);
            message.error('Failed to delete employee');
          })
          .finally(() => {
            setConfirmLoading(false);
          });
      },
    });
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true); 
    form
      .validateFields()
      .then((values) => {
        crmAPI.createEmployee(values)
          .then(() => {
            message.success('Сотрудник добавлен');
            setModalVisible(false);
            fetchEmployees();
            form.resetFields();
          })
          .catch((error) => {
            console.error('Ошибка при добавлении:', error);
            message.error('Failed to add employee');
          })
          .finally(() => {
            setConfirmLoading(false);
          });
      })
      .catch((error) => {
        console.error('Validation error:', error);
      })
      .finally(() => {
        setConfirmLoading(false);
      });
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const columns = [
    {
      title: 'ФИО',
      dataIndex: 'initials',
      key: 'initials',
    },
    {
      title: 'Почта',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Должность',
      dataIndex: ['position', 'name'],
      key: 'position',
    },
    {
      title: 'Действия',
      key: 'action',
      render: (text, record) => (
        <span
          style={{ color: '#1890ff', cursor: 'pointer' }}
          onClick={() => handleDelete(record.id)}
        >
          <EditOutlined /> Удалить
        </span>
      ),
    },
  ];

  return (
    <main id="main">
      <Floatbutton 
        onClick={showModal}  
        text="Добавить сотрудника" 
        icon={<PlusOutlined />} >
        Добавить сотрудника
      </Floatbutton>
      <Modal
        title="Добавить сотрудника"
        open={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading} 
        footer={[
          <Button key="submit" style={{ ...baseStyle }} loading={confirmLoading} onClick={handleOk}>
              Добавить
          </Button>
      ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="initials"
            label="ФИО"
            rules={[{ required: true, message: 'Пожалуйста, введите ФИО сотрудника' }]}
          >
            <Input
            style={{ ...baseStyle }}
            placeholder="ФИО" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Почта"
            rules={[{ required: true, message: 'Пожалуйста, введите почту сотрудника' }]}
          >
            <Input 
             style={{ ...baseStyle }}
             placeholder="Почта"/>
          </Form.Item>
          <Form.Item
            name="positionId"
            label="Должность"
            rules={[{ required: true, message: 'Пожалуйста, выберите должность сотрудника' }]}
          >
            <Select
             style={{ ...baseStyle }}
             placeholder="Должность"
            
            >
              {positions.map((position) => (
                <Option key={position.id} value={position.id}>
                  {position.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Table columns={columns} dataSource={employees} />
    </main>
  );
};

export default Employees;
