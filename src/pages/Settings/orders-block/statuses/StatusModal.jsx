import { Modal, Typography, Space, Input, Checkbox, ColorPicker, Collapse, Button } from 'antd';
import { useState, useEffect } from 'react';

const StatusModal = ({ visible, handleOk, handleCancel, selectedStatus, selectedColor }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [newColor, setNewColor] = useState(selectedColor);
  useEffect(() => {
    setNewStatus(selectedStatus);
    setNewColor(selectedColor);
  }, [selectedStatus, selectedColor]);

  const handleOkAsync = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      handleOk();
      setConfirmLoading(false);
    }, 2000);
  };

  const handleColorChange = (color) => {
    setNewColor(color);
  };
  const baseStyle = {
    width: 'clamp(200px, 100%, 500px)',
    height: 40,
  };

  return (
    <Modal
      title={`${selectedStatus ? 'Статус' : 'Новый статус'}`}
      centered
      open={visible}
      onOk={handleOkAsync}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={[
        <Button key="submit" loading={confirmLoading} onClick={handleOkAsync} style={{...baseStyle} }>
          Добавить
        </Button>,
      ]}
    >
      <Space direction="vertical" size="small" style={{ display: 'flex' }}>
        <br />
        <Input
        
          placeholder="Наименование"
          style={{...baseStyle}}
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        />
        <Checkbox>Закрывает заказ</Checkbox>
        <Typography.Text>Цвет*</Typography.Text>
        <ColorPicker
          value={selectedColor}
          size="large"
          showText={(color) => <span>Цвет: ({color.toHexString()})</span>}
          onChange={handleColorChange}
        />
        <Collapse ghost items={[
          {
            key: '1',
            label: 'Дополнительно',
            children: (
              <Space direction="vertical" size="small" style={{ display: 'flex' }}>
                <Typography.Text style={{ color: 'gray' }}>
                  Дайте статусу лаконичное название и описание,
                  эта информация будет отображена в виджете `Статус заказа`
                  и различных уведомлениях.
                </Typography.Text>
                <Input style={{...baseStyle} } placeholder="Название для клиента" />
                <Input style={{...baseStyle} } placeholder="Описание для клиента" />
              </Space>
            )
          }
        ]}>
        </Collapse>
      </Space>
    </Modal>
  );
};

export default StatusModal;
