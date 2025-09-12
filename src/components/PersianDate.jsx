import moment from 'moment';
import 'moment-timezone';
import momentJalaali from 'moment-jalaali';
momentJalaali.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

const PersianDate = ({ date }) => {
	const iranMoment = moment.utc(date).tz('Asia/Tehran');
	const jMoment = momentJalaali(iranMoment);

	const shamsiDate = jMoment.format('jYYYY/jMM/jDD');
	const shamsiTime = jMoment.format('hh:mm A');
	const [timePart, ampmPart] = shamsiTime.split(' ');

	const matchDate = moment(date, 'YYYY-MM-DD').startOf('day');
	const todayDate = moment().startOf('day');
	const d = matchDate.diff(todayDate, 'days');

	let daysLeftText = '';
	switch (d) {
		case 0:
			daysLeftText = 'Today';
			break;
		case 1:
			daysLeftText = 'Tomorrow';
			break;
		default:
			daysLeftText = `${d} days`;
	}

	return (
		<div className="w-1/3 flex flex-col items-center  gap-4  text-white">
			<h3 className="md:text-3xl text-lg font-bold text-gray-900">Match Info</h3>
			<p className="text-base text-white/70 font-semibold  ">{daysLeftText}</p>
			<p className="text-5xl font-semibold">
				{timePart}
				<span className="text-sm ml-1 text-white/70">{ampmPart}</span>
			</p>
			<p className="text-sm text-white/70 ">📅 {shamsiDate}</p>
		</div>
	);
};

export default PersianDate;
