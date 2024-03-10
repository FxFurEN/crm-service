import { Modal, Form, Input, Button, Table } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useState } from 'react';

const PositionModal = ({ visible, handleCancel, handleSave, position }) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    form.validateFields().then((values) => {
      handleSave(values);
    });
  };

  return (
    <Modal
      centered
      title="Редактировать должность"
      open={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Отмена
        </Button>,
        <Button key="submit" type="primary" onClick={onFinish}>
          Сохранить
        </Button>,
      ]}
    >
      <Form form={form} initialValues={position} layout="vertical">
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

  const handleSave = (values) => {
    // Здесь вы можете добавить код для сохранения обновленной должности
    console.log('Сохранено', values);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
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
          <EditOutlined />
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
