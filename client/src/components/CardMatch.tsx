type CardMatchProps = {
  category: string;
  homeTeamLogo: string;
  homeTeamName: string;
  awayTeamLogo: string;
  awayTeamName: string;
  homeScore: number;
  awayScore: number;
  date: string;
  location: string;
};

const CardMatch = ({
  category,
  homeTeamLogo,
  homeTeamName,
  awayTeamLogo,
  awayTeamName,
  homeScore,
  awayScore,
  date,
  location
}: CardMatchProps) => {
  return (
    <div className="card-match">
      {/* Header avec catégorie */}
      <div className="card-match__header">
        <span className="card-match__category">{category}</span>
      </div>

      {/* Corps avec logos et score */}
      <div className="card-match__body">
        {/* Équipe domicile */}
        <div className="card-match__team">
          <img 
            src={homeTeamLogo} 
            alt={homeTeamName}
            className="card-match__logo"
          />
        </div>

        {/* Score */}
        <div className="card-match__score">
          <span className="card-match__score-number">{homeScore}</span>
          <span className="card-match__score-separator">x</span>
          <span className="card-match__score-number">{awayScore}</span>
        </div>

        {/* Équipe extérieur */}
        <div className="card-match__team">
          <img 
            src={awayTeamLogo} 
            alt={awayTeamName}
            className="card-match__logo"
          />
        </div>
      </div>

      {/* Footer avec date et lieu */}
      <div className="card-match__footer">
        <span className="card-match__date">{date}</span>
        <span className="card-match__separator">•</span>
        <span className="card-match__location">{location}</span>
      </div>
    </div>
  );
};

export default CardMatch;