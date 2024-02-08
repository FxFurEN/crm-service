import '../../../assets/styles/main.css';
import '../../../assets/styles/global.css';

import { useState, useEffect } from 'react';
import { Card,Flex,} from 'antd';
import { Area, Column, Line, Pie} from '@ant-design/charts';



const Home = () =>{
    const [data, setData] = useState([]);

    useEffect(() => {
      asyncFetch();
    }, []);
  
    const asyncFetch = () => {
      fetch('https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => {
          console.log('fetch data failed', error);
        });
    };
    const config = {
      data,
      xField: 'timePeriod',
      yField: 'value',
      xAxis: {
        range: [0, 1],
      },
      height: 400, 
    width: 600,
    };

    return(
        <main id="main">
            <Flex wrap="wrap" gap="large" justify="center">
                <div>
                    <Card size='small' title="Line Chart"> 
                        <Line {...config} />;
                    </Card>
                </div>
                <div>
                    <Card size='small' title="Pie Chart"> 
                        <Pie {...config} />;
                    </Card>
                </div>
                <div>
                    <Card size='small' title="Column Chart"> 
                        <Column {...config}/>;
                    </Card>
                </div>
                <div>
                    <Card size='small' title="Area Chart"> 
                        <Area {...config}/>;
                    </Card>
                </div>
            </Flex>
                
        </main>
       
    )
}
export default Home