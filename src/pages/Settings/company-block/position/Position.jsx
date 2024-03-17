import { Modal, Form, Input, Button, Table, message, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import Floatbutton from '@components/float-button/FloatButton';
import { crmAPI } from '@service/api';

const PositionModal = ({ visible, handleCancel, handleSave, handleDelete, position }) => {
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

  const handleConfirmDelete = () => {
    handleDelete(position.id);
    handleClose();
  };

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({ name: position ? position.name : '' });
    }
  }, [visible, form, position]);

  return (
    <Modal
      title={position ? <span>
                          Редактировать должность
                          <Popconfirm
                            key="delete"
                            title="Вы уверены, что хотите удалить эту должность?"
                            onConfirm={handleConfirmDelete}
                            okText="Да"
                            cancelText="Отмена"
                        >
                            <Button
                            danger
                            type="link"
                            style={{ right: 50, position: 'absolute', marginTop: -8.5 }}
                            icon={<DeleteOutlined />}
                        >
                            Удалить
                        </Button>
                        </Popconfirm>

      </span> : "Добавить должность"}
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
      message.error('Ошибка при сохранении должности');
    }
  };

  const handleDelete = async (positionId) => {
    try {
      await crmAPI.deletePosition(positionId);
      message.success('Должность успешно удалена');
      fetchPositions();
    } catch (error) {
      message.error('Ошибка при удалении должности');
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
        handleDelete={handleDelete}
        position={position}
      />
    </main>
  );
};

export default Position;

