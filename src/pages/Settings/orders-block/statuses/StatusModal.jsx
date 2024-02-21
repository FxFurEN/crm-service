import { Modal, Typography, Space, Input, Checkbox, ColorPicker, Collapse, Button, } from 'antd';
import { useState } from 'react';

const genPresets = (presets = presetPalettes) =>
  Object.entries(presets).map(([label, colors]) => ({
    label,
    colors,
  }));
const InfoOrders = ({ visible, handleOk, handleCancel }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOkAsync = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      handleOk();
      setConfirmLoading(false);
    }, 2000);
  };

  const baseStyle = {
    width: 'clamp(200px, 100%, 500px)',
    height: 40,
  };
  return (
      <Modal
        title={`Статус`}
        centered
        open={visible}
        onOk={handleOkAsync}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
            <Button key="submit" loading={confirmLoading} onClick={handleOkAsync} style={{...baseStyle, width: '100%'} }>
                    Добавить
             </Button>,
        ]}
      >
        
        <Space direction="vertical" size="small" style={{ display: 'flex' }}>
            <br/>
            <Input
                style={{...baseStyle} }
                placeholder="Наименование"
            />
            <Checkbox>Закрывает заказ</Checkbox>
            <Checkbox>Закрывает заказ</Checkbox>
            <Checkbox>Закрывает заказ</Checkbox>
            <Typography.Text>Цвет*</Typography.Text>
            <ColorPicker
                defaultValue="#1677ff"
                size="large"
                showText={(color) => <span>Цвет: ({color.toHexString()})</span>}
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
                        <Input style={baseStyle} placeholder="Название для клиента" />
                        <Input style={baseStyle} placeholder="Описание для клиента" />
                    </Space>
                    )
                }
                ]}>
            </Collapse>


        </Space>
        
      </Modal>
  );
};

export default InfoOrders;
