import { Button, Flex, Input } from 'antd';
const baseStyle = {
  width: 'clamp(300px, 100%, 500px)',
  height: 50,
};

const buttonStyle = {
    height: 35,
  };
        

const GeneralOrders = () =>{
    return(
        <main id="main">
            <Flex gap="middle" vertical>
                <Input style={{...baseStyle} } placeholder="Срок по умолчанию, дн*" />
                <Input style={{...baseStyle} } placeholder="Гарантия по умолчанию, дн*"/>
                <Button style={{...baseStyle, ...buttonStyle} } type='primary' >Сохранить</Button>

            </Flex>
        </main>
    )
}

export default GeneralOrders