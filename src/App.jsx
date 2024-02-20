import { SmileOutlined } from "@ant-design/icons";
import Router from "@components/routing/Router"
import { ConfigProvider } from "antd";
import { useState } from "react";


function App() {
  const [customize] = useState(true);
  const customizeRenderEmpty = () => (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <SmileOutlined
        style={{
          fontSize: 20,
        }}
      />
      <p>Данные не найдены</p>
    </div>
  );
  return (
    <ConfigProvider renderEmpty={customize ? customizeRenderEmpty : undefined}>
        <Router/>
    </ConfigProvider>
  
  );
}

export default App
