import $ from 'jquery';
import { FilteringData } from './filteringData';
import { Regions } from './type';

export class FilterRegion {
  constructor() {
    this.selectRegion();
  }

  regionToNumber(info: string): Regions {
    switch (info) {
      case 'Шарм-эль-Шейх':
        return Regions.SharmElSheikh;
      case 'Хургада':
        return Regions.Hurghada;
      case 'Дубай':
        return Regions.Dubai;
      case 'Абу-Даби':
        return Regions.AbuDhabi;
      case 'Бангкок':
        return Regions.Bangkok;
      case 'Хуа Хин':
        return Regions.KuahHin;
      case 'Солнечный берег':
        return Regions.SunnyBeach;
      case 'Золотые пески':
        return Regions.GoldenSands;
      case 'Будва':
        return Regions.Budva;
      case 'Свети Стефан':
        return Regions.StefanBridge;
      case 'Бали':
        return Regions.Bali;
      case 'Батумі':
        return Regions.Batumi;
      case 'Родос':
        return Regions.Rodos;
      case 'Мармарис':
        return Regions.Marmaris;
      case 'Пафос':
        return Regions.Paphos;
      case 'Сусс':
        return Regions.Suss;
      case 'Тенерифе':
        return Regions.Tenerife;
      case 'Майорка':
        return Regions.Majorca;
      case 'Буковель':
        return Regions.Bukovyn;
      case 'Улудаг':
        return Regions.Uldag;
      case 'Бансько':
        return Regions.Bansko;
      case 'Боровець':
        return Regions.Borovets;
      default:
        return Regions.All;
    }
  }

  selectRegion(): void {
    $('.category__btns-regions').on('click', (event) => {
      const regionName = $(event.currentTarget).data('region');
      const region = this.regionToNumber(regionName);
      
      new FilteringData().getHotelsByFilter('isRegion', region);
    });
  }
}
