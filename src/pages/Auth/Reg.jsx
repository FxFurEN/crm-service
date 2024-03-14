import { useState } from "react";
import { Button, Form, Input, Spin, Typography } from "antd";
import { AimOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
const { Title } = Typography;

const containerStyle = {
  display: "flex",
  height: "100vh",
};

const leftBlockStyle = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const rightBlockStyle = {
  flex: 1,
  backgroundColor: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const inputStyle = {
  width: "clamp(200px, 100%, 500px)",
  height: 40,
};

const Reg = () => {
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false); 
  
    const handleLogin = () => {
      setLoading(true); 
      setTimeout(() => {
        setLoading(false); 
        setLoggedIn(true); 
      }, 3000);
    };
  
    if (loggedIn) {
      return <Navigate to="/home" />;
    }

  return (
    <div style={containerStyle}>
      <div style={leftBlockStyle}>
        <AimOutlined style={{ fontSize: "64px" }} />
      </div>
      <div style={rightBlockStyle}>
        <Spin spinning={loading} tip="Загрузка...">
          <Form
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            style={{ minWidth: "300px" }}
            onFinish={handleLogin}
          >
            <Title level={3}>Регистрация</Title>
            <Form.Item
              label="Почта"
              name="login"
              rules={[
                { required: true, message: "Пожалуйста, введите логин!" },
              ]}
            >
              <Input style={inputStyle} />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              rules={[
                { required: true, message: "Пожалуйста, введите пароль!" },
              ]}
            >
              <Input.Password style={inputStyle} />
            </Form.Item>

            <Form.Item
              label="Подтвердите пароль"
              name="confirmPassword" // Уникальное имя для подтверждения пароля
              rules={[
                { required: true, message: "Пожалуйста, подтвердите пароль!" },
              ]}
            >
              <Input.Password style={inputStyle} />
            </Form.Item>
            
            <Form.Item>
              <Button type="primary" htmlType="submit" style={inputStyle}>
                Зарегистрироваться
              </Button>
            </Form.Item>
            <Title level={5} align="center" style={{ marginBottom: "1.5em" }}>или</Title>
            <Link to="/signin">
              <Button type="primary" style={inputStyle}>
                Создать аккаунт
              </Button>
            </Link>
          </Form>
        </Spin>
      </div>
    </div>
  );
};

export default Reg;
