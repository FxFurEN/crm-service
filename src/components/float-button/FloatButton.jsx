import { FloatButton } from 'antd';

const Floatbutton = ({ text, icon, onClick }) => (
    <FloatButton
        icon={icon}
        tooltip={text}
        onClick={onClick} 
        style={{width: '5em', height: '5em'}}
    />
);

export default Floatbutton;
