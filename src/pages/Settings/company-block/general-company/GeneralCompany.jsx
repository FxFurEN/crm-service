import { PlusOutlined,  } from '@ant-design/icons';
import { Button, Flex, Input, Tooltip } from 'antd';
const baseStyle = {
  width: 'clamp(300px, 100%, 500px)',
  height: 50,
};

const buttonStyle = {
    height: 35,
  };
        

const GeneralCompany = () =>{
    return(
        <main id="main">
            <Flex gap="middle" vertical>
                <p>Компания</p>
                <Input style={{...baseStyle} } placeholder="Название" />
                <Input style={{...baseStyle} } placeholder="Телефон" 
                suffix={
                    <Tooltip title="Extra information">
                        <PlusOutlined />
                    </Tooltip>
                } />
                <Input style={{...baseStyle} } placeholder="Адрес" />
                <Button style={{...baseStyle, ...buttonStyle} } type='primary' >Сохранить</Button>

            </Flex>
        </main>
    )
}

export default GeneralCompany