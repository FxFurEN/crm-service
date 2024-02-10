import { EditOutlined,  } from '@ant-design/icons';
import { Button, Flex, Input, Tooltip } from 'antd';
const baseStyle = {
  width: 'clamp(300px, 100%, 500px)',
  height: 50,
};

const buttonStyle = {
    height: 35,
  };
        

const Profile = () =>{
    return(
        <main id="main">
            <Flex gap="middle" vertical>
                <p>Профиль</p>
                <Input style={{...baseStyle} } placeholder="Имя" />
                <Input style={{...baseStyle} } placeholder="Телефон" />
                <Input style={{...baseStyle} } placeholder="Почта" 
                suffix={
                    <Tooltip title="Extra information">
                        <EditOutlined />
                    </Tooltip>
                } />
                <Button style={{...baseStyle, ...buttonStyle} } type='primary' >Сохранить</Button>
                <p>Безопасность</p>
                <Button style={{...baseStyle, ...buttonStyle} } type='primary' danger>Сменить пароль</Button>
                <Button style={{...baseStyle, ...buttonStyle}  } type='primary' danger >Завершить все сесси кроме текущей</Button>

            </Flex>
        </main>
    )
}

export default Profile