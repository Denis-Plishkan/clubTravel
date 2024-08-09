import { Header } from "../components/header";
import { CompanyProduct } from "../code/company/company-company";


document.addEventListener("DOMContentLoaded", async function() {
    const productCompany = new CompanyProduct();
    await productCompany.loadCards();
    new Header();
})
