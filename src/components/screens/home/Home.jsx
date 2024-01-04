import "../navbar/navbar.css";
import Navbar from "../navbar/Navbar.jsx";



function Home(){
    return(
        <div>
            <Navbar/>
            <main id="main" className="flexbox-col">
                <h2>Lorem ipsum!</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum corporis, 
                    rerum doloremque iste sed voluptates omnis molestias molestiae animi recusandae 
                    labore sit amet delectus ad necessitatibus laudantium qui! Magni quisquam illum 
                    quaerat necessitatibus sint quibusdam perferendis! Aut ipsam cumque deleniti error 
                    perspiciatis iusto accusamus consequuntur assumenda. Obcaecati minima sed natus?</p>
            </main>
        </div>
       
    )
}
export default Home