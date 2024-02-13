import { FloatButton, } from 'antd';

const Floatbutton = ({ text, icon }) => (
    <FloatButton icon={icon} tooltip={<div>{text}</div>} style={{width: '5em', height: '5em'}}/>
);

export default Floatbutton;
