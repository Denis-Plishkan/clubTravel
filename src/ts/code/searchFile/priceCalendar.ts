import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

export class Calendar {
  constructor() {}

  initCalendar() {
    const headerSlides = document.querySelectorAll('.result__header-slide');

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    headerSlides.forEach(function (slide, index) {
      const calendar = document.createElement('div');
      calendar.id = 'calendar-' + index;
      slide.appendChild(calendar);

      const nextMonthDate = new Date(currentYear, currentMonth + index - 1);

      const startDate = new Date(nextMonthDate);
      startDate.setDate(startDate.getDate());

      new AirDatepicker('#' + calendar.id, {
        inline: true,
        startDate: startDate,

        onRenderCell({ date}) {
          const dates = [19, 22];
          const isDay = date.getDate();
          const month = date.getMonth();
          let money = '';

          if (month === 2) {
            if (isDay === 19) {
              money = '500€';
            } else if (isDay === 22) {
              money = '600€';
            } else {
              money = '400€';
            }
          }

          const shouldChangeContent = isDay && dates.includes(isDay);
          const dateMoney = shouldChangeContent ? `${isDay} <span>${money}</span>` : '';

          return {
            html: shouldChangeContent ? dateMoney : undefined,
            classes: shouldChangeContent ? '-money-' : undefined,
            attrs: {
              title: shouldChangeContent ? dateMoney : '',
            },
          };
        },
      });
    });
  }
}
