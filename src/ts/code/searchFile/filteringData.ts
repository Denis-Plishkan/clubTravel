import { app } from '../../modules/firebase';
import { collection, getFirestore, query, where, getDocs } from 'firebase/firestore';
import { Hotel } from './type';
import { ResultSwiper } from '../swiper';
import { DropdownSearch } from './dropSearch';
import { RenderHotels, RenderRegions, RenderInfo, } from './renderFiles';

new DropdownSearch('.info__destination-select');
new DropdownSearch('.info__duration-select');
new DropdownSearch('.info__date-select');
new DropdownSearch('.info__guests-select');

export class FilteringData {
  url: URL;
  constructor() {
    this.url = new URL(window.location.href);
  }

  restoreFilterFromUrl(key: string, _keys?: boolean): void {
    const urlParams = new URLSearchParams(window.location.search);

    const value = urlParams.get(key);

    if (value) {
      this.getHotelsByFilter(key, +value);
    }
  }

  async getHotelsByFilter(key: string, value: string | number | boolean) {
    const db = getFirestore(app);
    const hotelsRef = collection(db, 'hotels');
    let q;

    if (value === 0) {
      q = hotelsRef;
    } else {
      q = query(hotelsRef, where(key, '==', value));
    }

    const querySnapshot = await getDocs(q);

    const hotels: Hotel[] = [];

    querySnapshot.forEach((doc) => {
      const hotelData = doc.data() as Hotel;
      hotels.push(hotelData);
    });

    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set(key, value.toString());
    window.history.pushState({}, '', newUrl.toString());

    if (hotels.length > 0) {
      new RenderHotels().renderHotels(hotels);
      new RenderRegions().renderRegions(hotels);
      new RenderInfo().renderInfo(hotels);
      new ResultSwiper();
    }


    console.log(hotels);
    return hotels;
  }

  async filterAdvanced(key: string, value: string | number | boolean, key2: string, value2: string | number | boolean) {
    const hotelsFiltered = await this.getHotelsByFilter(key, value);

    if (hotelsFiltered.length > 0) {
      let advancedFilterArr;

      if (key2 === 'price') {
        advancedFilterArr = hotelsFiltered.filter((item: Hotel) => {
          return Number(item[key2]) >= Number(value) && Number(item[key2]) <= Number(value2);
        });
      } else {
        advancedFilterArr = hotelsFiltered.filter((item: Hotel) => {
          return item[key2] === value2;
        });
      }

      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set(key2, value2.toString());
      window.history.pushState({}, '', newUrl.toString());

      if (advancedFilterArr.length > 0) {
        new RenderHotels().renderHotels(advancedFilterArr);
        new RenderRegions().renderRegions(advancedFilterArr);
        new RenderInfo().renderInfo(advancedFilterArr);
        new ResultSwiper();
      }

      return advancedFilterArr;
    } else {
      return [];
    }
  }

  removeParametersFromUrl(parameterKeys: string[]): void {
    const url = new URL(window.location.href);
    for (const key of parameterKeys) {
      url.searchParams.delete(key);
    }
    window.history.replaceState({}, '', url.toString());
  }
}
