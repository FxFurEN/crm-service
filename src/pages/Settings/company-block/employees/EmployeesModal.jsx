import { DeleteOutlined } from '@ant-design/icons';
import { Modal, Form, Input, Button, Select, Popconfirm } from 'antd';
import { useState, useEffect } from 'react';

const { Option } = Select;

const EmployeesModal = ({ visible, handleCancel, handleSave, handleDelete, employee, positions }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

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
    setConfirmLoading(true);
    handleDelete(employee.id).then(() => {
      setConfirmLoading(false);
      handleClose();
    });
  };

  useEffect(() => {
    if (visible && employee) {
      form.setFieldsValue({
        initials: employee.initials,
        email: employee.email,
        positionId: employee.positionId,
      });
    }
  }, [visible, employee, form]);

  return (
    <Modal
      title={employee ? (
        <span>
          Редактировать сотрудника
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
        </span>
      ) : 'Добавить сотрудника'}
      open={visible}
      onCancel={handleClose}
      footer={[
        <Button key="cancel" onClick={handleClose}>
          Отмена
        </Button>,
        <Button key="submit" type="primary" onClick={onFinish} loading={confirmLoading}>
          {employee ? 'Сохранить' : 'Добавить'}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="initials"
          label="ФИО"
          rules={[{ required: true, message: 'Пожалуйста, введите ФИО сотрудника' }]}
        >
          <Input placeholder="ФИО" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Почта"
          rules={[{ required: true, message: 'Пожалуйста, введите почту сотрудника' }]}
        >
          <Input placeholder="Почта" />
        </Form.Item>
        <Form.Item
          name="positionId"
          label="Должность"
          rules={[{ required: true, message: 'Пожалуйста, выберите должность сотрудника' }]}
        >
          <Select placeholder="Должность">
            {positions.map((position) => (
              <Option key={position.id} value={position.id}>
                {position.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EmployeesModal;
