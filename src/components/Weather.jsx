import './Weather.css';
import { useState } from 'react';
import HourlyCard from './HourlyCard'

const Weather = () => {
    const [data, setData] = useState(null);
    const [dailyData, setDailyData] = useState(null);
    const [latLon, setLatLon] = useState({ lat: 0, lon: 0 });
    const [city, setCity] = useState("Nagpur");
    const [day, setDay] = useState("Monday");

    const callLatLon = async () => {
        let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},91&limit=1&appid=31d3abaf0f1303eb267a9bc704c77edc`;
        await fetch(url)
            .then((res) => res.json())
            .then((datas) => setLatLon({ ...latLon, lat: datas[0].lat, lon: datas[0].lon }))
            .catch((err) => console.log(`Error: ${err}`));
    }
    
    const callDailyData = async () => {
        let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latLon.lat}&lon=${latLon.lon}&exclude=hourly,minutely,alerts,current&appid=31d3abaf0f1303eb267a9bc704c77edc&units=metric`;
        await fetch(url)
            .then((res) => res.json())
            .then((datas) => setDailyData(datas))
            .catch((err) => console.log(`Error: ${err}`));

    }

    const callHourData = async () => {
        let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latLon.lat}&lon=${latLon.lon}&appid=31d3abaf0f1303eb267a9bc704c77edc&units=metric`;
        await fetch(url)
            .then((res) => res.json())
            .then((datas) => setData(datas))
            .catch((err) => console.log(`Error: ${err}`));
    }

    const handleSubmit = () => {
        // let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},91&limit=1&appid=31d3abaf0f1303eb267a9bc704c77edc`;
        // fetch(url).then((res)=>res.json()).then((datas)=>{
        //     setLatLon({lat: datas[0].lat, lon: datas[0].lon});
        //     let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${latLon.lat}&lon=${latLon.lon}&exclude=hourly,minutely,alerts,current&appid=31d3abaf0f1303eb267a9bc704c77edc&units=metric`;
        //     return fetch(url2);
        // }).then((res)=>res.json()).then((dailydata)=>{
        //     setDailyData(dailydata);
        //     let url3 = `https://api.openweathermap.org/data/2.5/forecast?lat=${latLon.lat}&lon=${latLon.lon}&appid=31d3abaf0f1303eb267a9bc704c77edc&units=metric`;
        //     return fetch(url3);
        // }).then((res)=>res.json()).then((hourdata)=>{
        //     setData(hourdata);
        // }).catch((error) =>{
	    //     console.warn(error);
        // });

        callLatLon();
        callDailyData();
        callHourData();
        
        console.log(data, dailyData, latLon, city);
    }

    return (
        <div className='WeatherApp'>
            <h1>Weather ForeCast</h1>

            <div className='inputBox'>
                <div className='searchBar'>
                    <div class="icons8-search"></div>
                    <input value={city} onChange={(e) => setCity(e.target.value)} className='searchBox' type="text" placeholder='Type Your City Name' />
                </div>
                <div className='submitSearch'>
                    <button class="submitBtn" onClick={() => { handleSubmit(); }}>SEARCH</button>
                </div>
            </div>

            <div className='fiveDayWeather'>
                {
                    dailyData && dailyData.daily.map((value, index) =>
                        index < 7 ? (<div key={index} onClick={() => {
                            setDay(new Date(value.dt * 1000).toLocaleDateString("en", {
                                weekday: "long",
                            }));
                        }
                        } className='weatherCard'>
                            <p>{new Date(value.dt * 1000).toLocaleDateString("en", {
                                weekday: "long",
                            })}</p>
                            <p>{value.temp.max}</p>
                            <img src={`http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`} alt="" />
                            <p>{value.temp.min}</p>
                            <p>{value.weather[0].description}</p>
                        </div>) : null
                    )
                }
            </div>

            <div className="threeHourTemp">
                {
                    data && data.list.map((value, index) => day === new Date(value.dt * 1000).toLocaleDateString("en", {
                        weekday: "long",
                    }) ? (
                        <HourlyCard value={value} />
                    ) : null
                    )
                }
            </div>
        </div>
    );
}

export default Weather;
