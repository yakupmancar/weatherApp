import { forecastType } from "../types/Types";
import { FaWind } from "react-icons/fa";
import { FaTemperatureHalf } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { MdOutlineVisibility } from "react-icons/md";
import "../assets/image.css";

type Props = {
  data: forecastType;
};

const Forecast = ({ data }: Props) => {
  const kelvinToCelsius = (kelvin: number) => {
    return kelvin - 273.15;
  };

  const today = data.list[0];
  return (
    <div className="relative flex flex-col items-center">
      <section className="flex gap-x-10 items-center justify-center shadow-2xl absolute bottom-full text-center text-xl backdrop-blur-lg bg-opacity-20 drop-shadow-lg rounded-lg w-[300px] md:w-[400px] py-3">
        <div>
          <h1 className="text-2xl font-black">
            {data.name}, <span className="font-normal">{data.country}</span>
          </h1>
          <h1 className="text-2xl font-extrabold">
            {" "}
            {kelvinToCelsius(today.main.temp).toFixed(2)}°C
          </h1>
          <div className="text-sm flex justify-center gap-x-3">
            <h1>
              <strong>Highest:</strong>{" "}
              {Math.ceil(kelvinToCelsius(today.main.temp_max))}°C
            </h1>
            <h1>
              <strong>Lowest:</strong>{" "}
              {Math.floor(kelvinToCelsius(today.main.temp_min))}°C
            </h1>
          </div>
        </div>

        <div className="relative flex flex-col items-center">
          <img
          className="drop-shadow-lg w-[75px] mb-2"
            src={`http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`}
          />
          <p className="text-sm font-bold absolute w-[100px] md:w-[200px] bottom-0">
            {today.weather[0].main}
          </p>
        </div>
      </section>

      <section className="text-xl boxShadow backdrop-blur-[7px] bg-opacity-20 drop-shadow-lg rounded-lg flex gap-x-6 overflow-x-scroll my-20 pb-2 w-[350px] md:w-[500px] px-5 py-3">
        {data.list.map((item, i) => (
          <div
            key={i}
            className="text-center w-[500px] inline-block text-[15px]"
          >
            <h1 className="">
              {i === 0 ? "Now" : new Date(item.dt * 1000).getHours()}
            </h1>
            <img
              className="text-xl"
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={`weather-icon-${item.weather[0].description}`}
            />
            <h1 className="font-semibold">
              {Math.round(kelvinToCelsius(item.main.temp))}°C
            </h1>
          </div>
        ))}
      </section>

      <section className="boxShadow backdrop-blur-[7px] bg-opacity-20 drop-shadow-lg rounded-lg text-sm font-bold flex items-center justify-around text-zinc-900 md:gap-x-5 md:px-5 py-3">
        <div className="flex flex-col items-center">
          <h1 className="flex items-center gap-x-1">
            <FaTemperatureHalf /> Feels Like
          </h1>
          <span>{kelvinToCelsius(today.main.feels_like).toFixed(2)}°C</span>
        </div>

        <span className="border py-5 border-zinc-800 mx-3"></span>

        <div className="flex flex-col items-center">
          <h1 className="flex items-center gap-x-1">
            <FaWind /> Wind
          </h1>
          <span>{today.wind.speed.toFixed(2)} km</span>
        </div>

        <span className="border py-5 border-zinc-800 mx-3"></span>

        <div className="flex flex-col items-center">
          <h1 className="flex items-center">
            <WiHumidity /> Humadity
          </h1>
          <span>{today.main.humidity}%</span>
        </div>

        <span className="border py-5 border-zinc-800 mx-3"></span>

        <div className="flex flex-col items-center">
          <h1 className="flex items-center gap-x-1">
            <MdOutlineVisibility /> Visibility
          </h1>
          <span>{(today.visibility / 1000).toFixed(0)} km</span>
        </div>
      </section>
    </div>
  );
};

export default Forecast;
