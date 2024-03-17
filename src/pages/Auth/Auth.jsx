import { useState } from "react";
import { Button, Checkbox, Form, Input, Spin, Typography } from "antd";
import { AimOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
const {Title } = Typography;

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

const Auth = () => {
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
            <Title level={3}>Вход в систему</Title>
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

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Запомнить меня?</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={inputStyle}>
                Войти
              </Button>
            </Form.Item>
            <Title level={5} align="center" style={{ marginBottom: "1.5em" }}>или </Title>
            <Link to="/signup">
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

export default Auth;
