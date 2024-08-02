import { useEffect, useState } from "react";
import "./assets/image.css";
import axios from "axios";
import { forecastType, OptionType } from "./types/Types";
import Search from "./components/Search";
import Forecast from "./components/Forecast";

function App() {
  const [term, setTerm] = useState<string>("");
  const apiKey = import.meta.env.VITE_API_KEY;

  //! OPTIONS
  const [options, setOptions] = useState<[]>([]);
  const searchOptions = async (value: string) => {
    if (!apiKey) {
      console.error("API key is missing");
      return;
    }
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${apiKey}`
      );
      setOptions(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //! INPUT CHANGES
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTerm(value);

    if (value === "") {
      setOptions([]);
      return;
    }
    searchOptions(value);
  };

  //!OPTION SELECTING
  const [city, setCity] = useState<OptionType | null>(null);
  const onOptionSelect = (option: OptionType) => {
    setCity(option);
  };
  useEffect(() => {
    if (city) {
      setTerm(city.name);
      setOptions([]);
    }
  }, [city]);

  //! FORECAST
  const [forecast, setForecast] = useState<forecastType | null>(null);
  const getForecast = async (city: OptionType) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}`
      );
      const forecastData = {
        ...res.data.city,
        list: res.data.list.slice(0, 16),
      };
      setForecast(forecastData);
      console.log(res);
    } catch (error) {
      console.log("Error", error);
    }
  };
  const onSubmit = () => {
    if (!city) return;
    getForecast(city);
  };

  return (
    <div className="img flex justify-center items-center w-full">
      <main>
        {forecast ? (
          <Forecast data={forecast} />
        ) : (
          <Search
            term={term}
            options={options}
            inputChange={inputChange}
            onOptionSelect={onOptionSelect}
            onSubmit={onSubmit}
          />
        )}
      </main>
    </div>
  );
}

export default App;
