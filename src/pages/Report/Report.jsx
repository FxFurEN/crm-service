import { Button, List } from 'antd';
import { RightOutlined  } from '@ant-design/icons';
const data = [
    {
        title: 'Финансы',
        description: ['Прибыль по заказам', 'Прибыль от продаж', 'Сводка платежей', 'Возвраты']
      },
      {
        title: 'Товары и услуги',
        description: ['Отчет по товарам и услугам', 'Отчет по товарам', 'Отчет по услугам по дням']
      },
      {
        title: 'Заказы',
        description: ['Заказы по полю']
      },
      {
        title: 'Склад',
        description: ['Остатки на складе', 'История']
      },
  ];


const Report = () =>{
    return(
        <main id="main">
             <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            title={<a href="https://ant.design" style={{ color: 'white' }}>{item.title}</a>}
                            description={item.description.map((desc, index) => (
                                <Button
                                    type="text"
                                    block
                                    key={index}
                                    style={{ textAlign: 'left', color: 'white', position: 'relative', paddingLeft: '0' }}
                                    icon={<RightOutlined style={{ position: 'absolute', right: '0' }} />}
                                >
                                    {desc}
                                </Button>
                            ))}
                        />
                    </List.Item>
                )}
            />
        </main>
    )
}

export default Report