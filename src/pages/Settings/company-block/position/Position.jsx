import { Modal, Form, Input, Button, Table, message } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import Floatbutton from '@components/float-button/FloatButton';
import { crmAPI } from '@service/api';

const PositionModal = ({ visible, handleCancel, handleSave, position }) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    form.validateFields().then((values) => {
      handleSave(values);
    });
  };

  const handleClose = () => {
    form.resetFields();
    handleCancel();
  };

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({ name: position ? position.name : '' });
    }
  }, [visible, form, position]);

  return (
    <Modal
      title={position ? "Редактировать должность" : "Добавить должность"}
      open={visible}
      onCancel={handleClose}
      footer={[
        <Button key="cancel" onClick={handleClose}>
          Отмена
        </Button>,
        <Button key="submit" type="primary" onClick={onFinish}>
          {position ? "Сохранить" : "Добавить"}
        </Button>,
      ]}
    >
      <Form form={form}>
        <Form.Item
          name="name"
          label="Название"
          rules={[{ required: true, message: 'Пожалуйста, введите название должности' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const Position = () => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState(null);
  const [positions, setPositions] = useState([]);

  const fetchPositions = async () => {
    try {
      const response = await crmAPI.getAllPositions();
      setPositions(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке должностей:', error);
      message.error('Ошибка при загрузке должностей');
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  const handleEdit = (record) => {
    setPosition(record);
    setVisible(true);
  };

  const handleSave = async (values) => {
    try {
      if (position) {
        await crmAPI.updatePosition(position.id, values);
        message.success('Должность успешно отредактирована');
      } else {
        await crmAPI.createPosition(values);
        message.success('Должность успешно создана');
      }
      setVisible(false);
      fetchPositions();
    } catch (error) {
      console.error('Ошибка при сохранении должности:', error);
      message.error('Ошибка при сохранении должности');
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const showModalService = () => {
    setPosition(null); 
    setVisible(true);
  };

  const columns = [
    {
      title: 'Название',
      dataIndex: 'name',
      width: 500,
      key: 'name',
    },
    {
      title: 'Действие',
      key: 'operation',
      width: 100,
      render: (text, record) => (
        <span
          style={{ color: '#1890ff', cursor: 'pointer' }}
          onClick={() => handleEdit(record)}
        >
          <EditOutlined /> Редактировать
        </span>
      ),
    },
  ];

  return (
    <main id="main">
      <Floatbutton type="primary" onClick={showModalService} icon={<PlusOutlined />}>
        Добавить должность
      </Floatbutton>
      <Table columns={columns} dataSource={positions} />
      <PositionModal
        visible={visible}
        handleCancel={handleCancel}
        handleSave={handleSave}
        position={position}
      />
    </main>
  );
};

export default Position;
