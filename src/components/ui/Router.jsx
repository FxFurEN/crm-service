import App from '../../App.jsx'
import Home from '../screens/home/Home.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home />} path="/"/>


                <Route element={<App/>} path="*"/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router

