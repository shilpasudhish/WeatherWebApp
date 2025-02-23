import { useState, useEffect } from "react";
function App() {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [Data, setData] = useState([]);
  const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=33c39443b852ec366e65e975d3dd2032`;
  const [description, setDescription] = useState("");
  const [temp, setTemp] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const getWeather = () => {
    if (!lat || !lon) alert("enter both latitude and logitude");
    fetch(weatherAPI)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setTemp(data.main.temp);
        setDescription(data.weather[0].description);
        setHumidity(data.main.humidity);
        setSunrise(new Date(data.sys.sunrise * 1000).toLocaleTimeString());
        setSunset(new Date(data.sys.sunset * 1000).toLocaleTimeString());
      });
  };
  //for logging the API result
  useEffect(() => {
    console.log(Data);
  }, [Data]);

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZZH_n3nxb72Igkn2ZdcQ_CHTLKAqFhodAow&s')]">
      <div className="App">
        <h1 className=" text-xl font-bold text-blue-950 text-center">
          Current Weather
        </h1>
        <div className="input">
          <label className="font-bold">Latitude </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            placeholder="latitude"
            onChange={(e) => {
              setLat(e.target.value);
            }}
          />

          <label className="font-bold">Longitude </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            placeholder="longitude"
            onChange={(e) => {
              setLon(e.target.value);
            }}
          />

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={getWeather}
          >
            Search
          </button>
        </div>
        {Data.weather ? (
          <div className="bg-yellow-200 rounded-lg px-20 py-8 ring shadow-xl ring-gray-900/5">
            <h2>Description:{description}</h2>
            <h2>temp:{temp}</h2>
            <h2>Humidity:{humidity}</h2>
            <h2>Sunrise:{sunrise}</h2>
            <h2>Sunset:{sunset}</h2>
          </div>
        ) : (
          <div>
            <h2 className="font-bold text-sm">
              Enter valid latitude and longitude
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
