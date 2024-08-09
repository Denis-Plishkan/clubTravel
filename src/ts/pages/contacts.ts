import { Header } from "../components/header";
import { Contacts } from "../code/contacts/contacts-main"

document.addEventListener("DOMContentLoaded", () => {
  new Contacts();
  new Header();
})