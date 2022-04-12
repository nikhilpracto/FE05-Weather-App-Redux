const DailyDataCard = (props) => {
    return (
        props.dailyDatas.daily.map((value, index) =>
        (<div key={index} className='weatherCard'>
            <p>{new Date(value.dt * 1000).toLocaleDateString("en", {
                weekday: "long",
            })}</p>
            <p>{value.temp.max}</p>
            <img src={`http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`} alt="" />
            <p>{value.temp.min}</p>
            <p>{value.weather[0].description}</p>
        </div>)
        )
    )
};

export default DailyDataCard;