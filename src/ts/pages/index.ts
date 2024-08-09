import { Header } from "../components/header";
import { HeroSwiper } from '../code/swiper';
import { CompanySwiper } from '../code/swiper';
import { HotDealsSwiper } from '../code/swiper';
import { WinterTourSwiper } from '../code/swiper';
import { SummerTourSwiper } from '../code/swiper';
import { CompanyProduct } from '../code/main/main-company';
import { HotDealsProduct } from '../code/main/hot-deals';
import { WinterTourProduct } from '../code/main/winter-tour';
import { SummerTourProduct } from '../code/main/summer-tour';
import {AllImportFile} from '../code/searchFile/allImportFile';

document.addEventListener("DOMContentLoaded", async function() {
    
    const productCompany = new CompanyProduct();
    const productHotDeals = new HotDealsProduct();
    const productWinterTour = new WinterTourProduct();
    const productSummerTour = new SummerTourProduct();
    new HeroSwiper();
    new CompanySwiper();
    new HotDealsSwiper();
    new WinterTourSwiper();
    new SummerTourSwiper();
    new AllImportFile();

    await productCompany.loadCards();
    await productHotDeals.loadCards();
    await productWinterTour.loadCards();
    await productSummerTour.loadCards();
    new Header();
})



