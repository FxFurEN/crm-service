import { Button, List } from 'antd';
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
                            title={<strong href="https://ant.design" style={{ color: 'white' }}>{item.title}</strong>}
                            description={item.description.map((desc, index) => (
                                <Button
                                    type="text"
                                    block
                                    key={index}
                                    style={{height: '40px', textAlign: 'left', color: 'white', fontSize: '18px', paddingLeft: '0' }}
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