import usePersianDate from '../hook/usePersianDate';

const MatchInfo = ({ date }) => {
	const { shamsiDate, timePart, ampmPart, label } = usePersianDate(date);


	return (
		<div className="w-1/3 flex flex-col items-center  gap-4  text-white">
			<h3 className="md:text-3xl text-lg font-bold text-gray-900">Match Info</h3>
			<p className="text-base text-white/70 font-semibold  ">{label}</p>
			<p className="text-5xl font-semibold">
				{timePart}
				<span className="text-sm ml-1 text-white/70">{ampmPart}</span>
			</p>
			<p className="text-sm text-white/70 ">📅 {shamsiDate}</p>
		</div>
	);
};

export default MatchInfo;
