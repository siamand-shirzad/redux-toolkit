// usePersianDate.js
import moment from 'moment';
import 'moment-timezone';
import momentJalaali from 'moment-jalaali';

momentJalaali.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

const usePersianDate = (utcDate) => {
  if (!utcDate) return {};

  const iranMoment = moment.utc(utcDate).tz("Asia/Tehran");
  const jMoment = momentJalaali(iranMoment);

  const shamsiDate = jMoment.format("jYYYY/jMM/jDD");
  const timeFull = iranMoment.format("hh:mm A");
  const [timePart, ampmPart] = timeFull.split(" ");

  const matchDate = moment(utcDate, 'YYYY-MM-DD').startOf('day');
  const todayDate = moment().startOf('day');
  const daysDiff = matchDate.diff(todayDate, 'days');

  let label = '';
  switch (daysDiff) {
    case 0:
      label = 'Today';
      break;
    case 1:
      label = 'Tommorow';
      break;
    default:
      label = `${daysDiff} days`;
  }

  return {
    shamsiDate,
    timePart,
    ampmPart,
    label,
    daysDiff,
  };
};

export default usePersianDate;