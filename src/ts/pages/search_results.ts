import { AdvancedSearch } from '../code/searchFile/advanced';
import { AllImportFile } from '../code/searchFile/allImportFile';
import { Header } from '../components/header';
import { Preloader } from '../components/preloader';


document.addEventListener('DOMContentLoaded', async () => {
  new AllImportFile();
  new AdvancedSearch();
  new Header()
  new Preloader();
});
