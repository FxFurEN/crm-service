import { Modal, Form, Input, Button, Table } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import Floatbutton from '@components/float-button/FloatButton';

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

  const handleEdit = (record) => {
    setPosition(record);
    setVisible(true);
  };

  const handleSave = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const showModalService = () => {
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

  const data = [];
  for (let i = 1; i < 5; i++) {
    data.push({
      key: i,
      name: `Должность ${i}`,
    });
  }

  return (
    <main id="main">
      <Floatbutton type="primary" onClick={showModalService} icon={<PlusOutlined />}>
        Добавить должность
      </Floatbutton>
      <Table columns={columns} dataSource={data} />
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
