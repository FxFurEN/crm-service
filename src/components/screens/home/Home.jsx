import '../../../assets/styles/main.css';
import '../../../assets/styles/global.css';

import sourceData from '../../../data/sourceData.json';

import {Chart as ChartJS} from 'chart.js/auto';
import {Bar, Doughnut, Line} from 'react-chartjs-2';


const Home = () =>{
    return(
            <main id="main">
                <div style={{ flex: 1, overflow: 'auto' }}>
                    <div style={{height: '50%', width: '50%'}}>  
                        <Bar 
                            data={{
                                labels: sourceData.map(data => data.label),
                                datasets: [
                                    {
                                        label: 'Количество',
                                        data: sourceData.map(data => data.value),
                                    }
                                ]
                            }}/>
                            <Doughnut
                                data={{
                                    labels: sourceData.map(data => data.label),
                                    datasets: [
                                        {
                                            label: 'Количество',
                                            data: sourceData.map(data => data.value),
                                        }
                                    ]
                                }}
                            />
                            <Line
                                data={{
                                    labels: sourceData.map(data => data.label),
                                    datasets: [
                                        {
                                            label: 'Количество',
                                            data: sourceData.map(data => data.value),
                                        }
                                    ]
                                }}
                            
                            />
                    </div>
                    
                    
                </div> 
                
            </main>
       
    )
}
export default Home