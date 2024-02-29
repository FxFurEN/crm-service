import { Button, List } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const data = [
  {
    title: 'Магазин',
    routes: ['/settings/documents/shablondoc', '/settings/documents/shablondoc'], 
    description: ['Акт выполненных работ', 'Приемная квитанция']
  },
  {
    title: 'Заказы',
    routes: ['/settings/documents/shablondoc'],
    description: ['Товарный чек']
  },
  {
    title: 'Склад',
    routes: ['/settings/documents/shablondoc', '/settings/documents/shablondoc'],
    description: ['Ценник ленточный', 'QR-код']
  },
];

const Documents = () => {
  return (
    <main id="main">
      <List
        size="large"
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              title={<Link to={item.routes[0]} style={{ color: 'white'}}>{item.title}</Link>}
              description={item.description.map((desc, i) => (
                <Link to={item.routes[i]} key={i} style={{ marginRight: '1em' }}>
                  <Button
                    type="text"
                    block
                    style={{ textAlign: 'left', color: 'white', position: 'relative', paddingLeft: '0' }}
                    icon={<RightOutlined style={{ position: 'absolute', right: '0' }} />}
                  >
                    {desc}
                  </Button>
                </Link>
              ))}
            />
          </List.Item>
        )}
      />
    </main>
  );
}

export default Documents;
