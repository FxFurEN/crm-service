import '../../../assets/styles/main.css';
import '../../../assets/styles/global.css';
import '../../../assets/styles/searchBar.css';

import {IonSearchbar } from '@ionic/react';

function Example() {

    return (
        <main id="main">
            <IonSearchbar showCancelButton="never" debounce={550} class="custom"></IonSearchbar>
        </main>
            
    );
}
export default Example;