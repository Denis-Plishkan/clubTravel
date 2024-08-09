import { Header } from '../../ts/components/header';
import { Preloader } from '../components/preloader';
import { HotOffers } from '../code/hotOffers/hot';

document.addEventListener('DOMContentLoaded', () => {
  new Header();
  new Preloader();
  new HotOffers();
});
