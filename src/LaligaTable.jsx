import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLaligaTeams } from './redux/laligaTeams/laligaTeamsSlice';

const LaLigaTable = () => {
  const { error, teams, isLoading } = useSelector(state => state.laligaTeams);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLaligaTeams());
  }, [dispatch]);

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
                  key={index}
                  className="text-center transition transform hover:scale-[1.02] hover:bg-red-50"
                >
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
    </div>
  );
};

export default LaLigaTable;