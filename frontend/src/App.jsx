import React, { useState } from "react";
import "./index.css";
import axios from "axios";

const App = () => {
  const [data, setData] = useState({});
  const [input, setInput] = useState("");
  const [weatherIcon, setWeatherIcon] = useState(""); // Store weather icon URL

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/weather?city=${input}`
      );
      setData(response.data);

      // Set weather icon based on condition
      const weatherCondition = response.data.weather[0].main;
      let iconSrc = "";

      if (weatherCondition === "Clouds") {
        iconSrc = "../images/clouds.png";
      } else if (weatherCondition === "Clear") {
        iconSrc = "../images/clear.png";
      } else if (weatherCondition === "Rain") {
        iconSrc = "../images/rain.png";
      } else if (weatherCondition === "Drizzle") {
        iconSrc = "../images/drizzle.png";
      } else if (weatherCondition === "Mist") {
        iconSrc = "../images/mist.png";
      }

      setWeatherIcon(iconSrc)
    } catch (error) {
      console.error("Error fetching data:", error);
      setData({});
      setWeatherIcon("");
    }
  };

  return (
    <div className="bg-gradient-to-br mt-8 from-teal-400 to-indigo-500 text-white mx-auto rounded-2xl px-5 py-10 text-center w-3/4 max-w-md">
      <div className="relative w-full flex items-center justify-center">
        <input
          type="text"
          placeholder="Enter city name"
          className="border-0 outline-0 bg-teal-100 text-gray-700 py-[10px] px-[25px] h-12 rounded-full flex-1 pr-12 text-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {input && (
          <button
            className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => setInput("")}
          >
            ✖
          </button>
        )}
        <button
          className="border-0 outline-0 bg-teal-100 rounded-full cursor-pointer w-12 h-12 ml-2"
          onClick={getData}
        >
          <img src="../images/search.png" className="w-9 pl-3" alt="Search" />
        </button>
      </div>

      <div className="my-3">
        {weatherIcon && <img src={weatherIcon} className="mx-auto w-20" alt="Weather Icon" />}

        {data.main && (
          <p className="font-bold text-4xl text-white pt-4">
            {data.main.temp}°C
          </p>
        )}

        {data.name ? (
          <>
            <p className="text-gray-700 font-bold py-2 text-2xl">{data.name}</p>
            <div className="flex items-center justify-between py-0 px-5 mt-12">
              <div className="flex text-left items-center">
                <img
                  src="../images/humidity.png"
                  className="w-10 mr-2.5 "
                  alt=""
                />
                {data.main && (
                  <p className="text-xl mb-2 -mt-1.5 pt-4 mr-7">
                    Humidity: <span className="block font-bold">{data.main.humidity} %</span>
                  </p>
                )}
              </div>

              <div className="flex text-left items-center mr-8">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5YJ8IvfApVu_ZA9S8mt4skH7zvTVFh6Gfyw&s"
                  className="w-10 mr-2.5"
                  alt=""
                />
                {data.main && (
                  <p className="text-xl -mt-1.5">
                    Pressure: <span className="block font-bold">{data.main.pressure} Pa</span> 
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between py-0 px-5 mt-12">
              <div className="flex text-left items-center">
                <img src="https://cdn-icons-png.flaticon.com/256/2105/2105242.png" className="w-10 mr-2.5" alt="" />
                {data.main && (
                  <p className="text-xl mb-2 -mt-1.5 pt-4">
                    Description:
                    <span className="block font-bold">{data.weather[0].main}</span>
                  </p>
                )}
              </div>
              <div className="flex text-left items-center">
                <img src="../images/wind.png" className="w-10 mr-2.5 " alt="" />
                {data.main && (
                  <p className="text-xl -mt-1.5">
                    Wind speed: <span className="block font-bold">{data.wind.speed} km/h</span>
                  </p>
                )}
              </div>
            </div>
          </>
        ) : (
          <p className="font-bold text-2xl pt-2">Please enter city name</p>
        )}
      </div>
    </div>
  );
};

export default App;
