import '../../../assets/styles/main.css';
import '../../../assets/styles/global.css';
import '../../../assets/styles/cards-ion.css';
import style from  '../../../assets/styles/table.module.css';


import sourceData from '../../../data/sourceData.json';

import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

import {Chart as ChartJS} from 'chart.js/auto';
import {Bar, Doughnut, Line} from 'react-chartjs-2';


const Home = () =>{
    const chartStyle = {
        width: '100%', // Укажите желаемую ширину
        height: '300px', // Укажите желаемую высоту
      };


    return(
            <main id="main">
                <div style={{ flex: 1, overflow: 'auto' }}>
                <div className={style.wrapper} >
                    <div className={style.table}>
                        <div className={style.row}>
                            <div className={style.cell}>
                                <IonCard>
                                    <IonCardHeader>
                                        <IonCardTitle>Card Title</IonCardTitle>
                                        <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                                    </IonCardHeader>
                                    <IonCardContent>
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
                                    </IonCardContent>
                                </IonCard> 
                            </div>
                            <div className={style.cell}>
                                <IonCard>
                                    <IonCardHeader>
                                        <IonCardTitle>Card Title</IonCardTitle>
                                        <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                                    </IonCardHeader>
                                    <IonCardContent>
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
                                    </IonCardContent>
                                </IonCard> 
                            </div>
                        </div>
                            <div className={style.row} >
                                <div className={style.cell}>
                                    <IonCard>
                                        <IonCardHeader>
                                            <IonCardTitle>Card Title</IonCardTitle>
                                            <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                                        </IonCardHeader>
                                        <IonCardContent>
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
                                        </IonCardContent>
                                    </IonCard> 
                                </div>
                                <div className={style.cell}>
                                    <IonCard>
                                        <IonCardHeader>
                                            <IonCardTitle>Card Title</IonCardTitle>
                                            <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                                        </IonCardHeader>
                                        <IonCardContent>
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
                                        </IonCardContent>
                                    </IonCard>  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
       
    )
}
export default Home