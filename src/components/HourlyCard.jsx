const HourlyCard = ({ value }) => {
    return (
        <div className="HourlyCard">
            <p>{value.dt_txt.slice(11, 16)}</p>
            <p>{value.main.temp_max}</p>
            <img src={`http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`} alt="" />
            <p>{value.main.temp_min}</p>
            <p>{value.weather[0].description}</p>
        </div>
    )
};

export default HourlyCard;
