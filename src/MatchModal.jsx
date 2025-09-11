import axios from 'axios';
import { useEffect, useState } from 'react';
import PersianDate from './components/PersianDate';

const MatchModal = ({ id, onClose }) => {
	const [matchData, setMatchData] = useState([]);
	useEffect(() => {
		const getMatch = async id => {
			const res = await axios.get(
				`https://www.thesportsdb.com/api/v1/json/123/eventsnext.php?id=${id}`
			);

			setMatchData(res.data.events?.[0]);
		};
		getMatch(id);
	}, []);
	useEffect(() => {
		console.log(matchData);
		console.log(matchData.dateEvent);
	}, [matchData]);

	return (
		<div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center">
			<div className="bg-white/10 p-6 rounded-xl text-white">
				<div className="flex ">
					<div className="w-1/3 flex flex-col items-center gap-2  ">
						<h3 className="md:text-3xl text-lg text-gray-900 font-bold">Home</h3>
						<img className="w-1/2" src={matchData.strHomeTeamBadge} alt="logo" loading="lazy" />
						<p className="text-lg">{matchData.strHomeTeam}</p>
					</div>
					{matchData?.dateEvent && <PersianDate date={matchData.dateEvent} />}{' '}
					<div className="w-1/3 flex flex-col items-center gap-2 ">
						<h3 className="md:text-3xl text-lg text-gray-900 font-bold">Away</h3>
						<img className="w-1/2" src={matchData.strAwayTeamBadge} alt="logo" />
						<p className="text-lg">{matchData.strAwayTeam}</p>
					</div>
				</div>

				<button
					className="mt-4 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transitio cursor-pointer "
					onClick={onClose}>
					Back
				</button>
			</div>
		</div>
	);
};

export default MatchModal;
