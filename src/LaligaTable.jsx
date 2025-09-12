import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLaligaTeams } from './redux/laligaTeams/laligaTeamsSlice';
import MatchModal from './components/MatchModal';

const LaLigaTable = () => {
	const { error, teams, isLoading } = useSelector(state => state.laligaTeams);
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(false)
	const [selectedTeamId, setSelectedTeamId] = useState(null);


	useEffect(() => {
		dispatch(getLaligaTeams());
	}, [dispatch]);

	const handleModal = (id)=>{
		setShowModal(true)
		setSelectedTeamId(id)		
	}

	if (error) {
		return (
			<div className="max-w-md mx-auto mt-6 p-4 rounded-xl bg-white/30 backdrop-blur-md border border-white/40 shadow-lg animate-fadeIn">
				<div className="flex items-center gap-3">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 text-red-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14"
						/>
					</svg>
					<span className="text-red-700 font-semibold">Error:</span>
				</div>
				<p className="mt-2 text-red-600">{error}</p>
				<button
					onClick={() => window.location.reload()}
					className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
					Retry
				</button>
			</div>
		);
	}
	return (
		<div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-lg animate-fadeIn">
			<h2 className="text-2xl font-bold mb-4 text-center">La Liga Table 2024-2025</h2>
			<table className="w-full border-collapse">
				<thead>
					<tr className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
						<th className="p-3">Rank</th>
						<th className="p-3">Team</th>
						<th className="p-3">Played</th>
						<th className="p-3">Wins</th>
						<th className="p-3">Draws</th>
						<th className="p-3">Losses</th>
						<th className="p-3">Goals difference</th>
						<th className="p-3">Points</th>
					</tr>
				</thead>
				<tbody className={isLoading ? 'animate-pulse' : ''}>
					{isLoading
						? Array.from({ length: 10 }).map((_, rowIndex) => (
								<tr key={rowIndex} className="text-center">
									{Array.from({ length: 8 }).map((_, colIndex) => (
										<td key={colIndex} className="p-3">
											<div className="h-4 bg-gray-200 rounded"></div>
										</td>
									))}
								</tr>
						  ))
						: teams.map((team, index) => (
								<tr
									onClick={()=>handleModal(team.idTeam)}
									key={index}
									className="text-center transition transform hover:scale-[1.02] hover:bg-red-50">
									<td className="p-3 font-bold">{index + 1}</td>
									<td className="p-3">
										<div className="flex items-center gap-3">
											<img className="w-10 h-10" src={team.strBadge} alt="" />
											<span>{team.strTeam}</span>
										</div>
									</td>
									<td className="p-3">{team.intPlayed}</td>
									<td className="p-3">{team.intWin}</td>
									<td className="p-3">{team.intDraw}</td>
									<td className="p-3">{team.intLoss}</td>
									<td className="p-3">{team.intGoalDifference}</td>
									<td className="p-3">{team.intPoints}</td>
								</tr>
						  ))}
				</tbody>
			</table>
			{showModal && (
				<MatchModal onClose={() => setShowModal(false)} id={selectedTeamId} />
			)}
		</div>
	);
};

export default LaLigaTable;
