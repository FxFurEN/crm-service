import { Button, Flex, Switch } from "antd";

const baseStyle = {
  width: 'clamp(300px, 100%, 500px)',
  backgroundColor: 'var(--background-secondary-light)', 
  border: '1px solid hsl(var(--quite-gray))',
  height: 50,
};

const switchStyle = {
  width: 'clamp(20px, 100%, 50px)',

};

const Notification = () => {
  return (
    <main id="main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Flex direction="column" justify="center" align="flex-start" gap="20px" vertical>
        <h4 style={{ textAlign: 'left', margin: 0 }}>Уведомления</h4>
        {Array.from({ length: 4 }).map((_, i) => (
          <Button key={i} style={{ ...baseStyle,display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
                <span>Текст уведомления</span>
                <Switch defaultChecked style={{ ...switchStyle }} />
          </Button>
        ))}
      </Flex>
    </main>
  );
}

export default Notification;
