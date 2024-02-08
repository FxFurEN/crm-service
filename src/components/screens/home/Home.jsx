import '../../../assets/styles/main.css';
import '../../../assets/styles/global.css';
import '../../../assets/styles/cards-ion.css';


import sourceData from '../../../data/sourceData.json';

import { Card,Flex } from 'antd';

import {Chart as ChartJS, defaults} from 'chart.js/auto';
import {Bar, Doughnut, Line} from 'react-chartjs-2';


defaults.responsive = true;
defaults.maintainAspectRatio = false;

const Home = () =>{
    return(
        <main id="main">
            <Flex wrap="wrap" gap="large">
                    <div>
                        <Card title="Bar Chart"> 
                            <Bar
                                data={{
                                    labels: sourceData.map(data => data.label),
                                    datasets: [
                                        {
                                            label: 'Количество',
                                            data: sourceData.map(data => data.value),
                                        }
                                    ],
                                }}
                                                                            
                            />
                        </Card>
                    </div>
                    <div>
                        <Card title="Line Chart">
                            <Line
                                data={{
                                    labels: sourceData.map(data => data.label),
                                    datasets: [
                                        {
                                            label: 'Количество',
                                            data: sourceData.map(data => data.value),
                                        }
                                    ],
                                }}
                                                                            
                            />
                        </Card>
                    </div>
                    <div>
                        <Card title="Doughnut Chart">
                            <Doughnut
                                data={{
                                    labels: sourceData.map(data => data.label),
                                    datasets: [
                                        {
                                            label: 'Количество',
                                            data: sourceData.map(data => data.value),
                                        }
                                    ],
                                }}
                                                                            
                            />
                        </Card>
                    </div>
                    <div>
                        <Card title="Line Chart">
                            <Line
                                data={{
                                    labels: sourceData.map(data => data.label),
                                    datasets: [
                                        {
                                            label: 'Количество',
                                            data: sourceData.map(data => data.value),
                                        }
                                    ],
                                }}
                                                                            
                            />
                        </Card>
                    </div>
            </Flex>
                
        </main>
       
    )
}
export default Home