import { Header } from "../components/header";
import { DirectionProduct } from "../code/directions/directions";


document.addEventListener("DOMContentLoaded", async function() {
    const productDirection = new DirectionProduct();
    await productDirection.loadCards();
    
    new Header();
})

