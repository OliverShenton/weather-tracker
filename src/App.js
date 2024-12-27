import "./App.css";
import Header from "./components/Header/Header";
import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";

function App() {
  const API_KEY = "";

  return (
    <div className="App">
      <Header />
      <WeatherDisplay apiKey={API_KEY} />
    </div>
  );
}

export default App;
