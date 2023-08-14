import '../styles/errorPage.css';
import { useRouteError } from "react-router-dom";
import error_image from '../assets/error_image.gif'




function NotFound404() {
    const error: any = useRouteError();
    console.error(error);

    return (
        <div id="error-page" className='error'>
        <img src={error_image}></img>
        <h1>Opa, vamos com calma...</h1>
        <p>Pedimos perdão, mas parece que a página que você está tentando acessar não existe ou está indisponível.</p>
        <p>
            <i>Error Status: {error.status || null} {error.statusText || null} {error.message || null}</i>
        </p>
        </div>
    )
}

export default NotFound404
