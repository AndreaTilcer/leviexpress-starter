import React, { useEffect, useState } from 'react';
import mapImage from './img/map.svg';
import './style.css';

export const JourneyPicker = ({ onJourneyChange }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(
      `https://apps.kodim.cz/daweb/leviexpress/api/journey?fromCity=${fromCity}&toCity=${toCity}&date=${date}`,
    )
      .then((response) => response.json())
      .then((data) => onJourneyChange(data.results));
    console.log(fromCity, toCity, date);
  };

  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');

  const [cities, setCities] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    fetch('https://apps.kodim.cz/daweb/leviexpress/api/cities')
      .then((response) => response.json())
      .then((data) => setCities(data.results));
    fetch('https://apps.kodim.cz/daweb/leviexpress/api/dates')
      .then((response) => response.json())
      .then((data) => setDates(data.results));
  }, []);

  return (
    <div className="journey-picker container">
      <h2 className="journey-picker__head">Kam chcete jet?</h2>
      <div className="journey-picker__body">
        <form className="journey-picker__form">
          <label>
            <div className="journey-picker__label">Odkud:</div>
            <select
              value={fromCity}
              onChange={(event) => setFromCity(event.target.value)}
            >
              <CityOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Kam:</div>
            <select
              value={toCity}
              onChange={(event) => setToCity(event.target.value)}
            >
              <CityOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Datum:</div>
            <select
              value={date}
              onChange={(event) => setDate(event.target.value)}
            >
              <DateOptions dates={dates} />
            </select>
          </label>
          <div className="journey-picker__controls">
            <button
              onClick={handleSubmit}
              className="btn"
              type="submit"
              disabled={
                fromCity !== '' && toCity !== '' && date !== '' ? false : true
              }
            >
              Vyhledat spoj
            </button>
          </div>
        </form>
        <img className="journey-picker__map" src={mapImage} />
      </div>
    </div>
  );
};

const CityOptions = ({ cities }) => {
  return (
    <>
      <option value="">Vyberte</option>
      {cities.map((city) => (
        <option value={city.code} key={city.code}>
          {city.name}
        </option>
      ))}
    </>
    /*
     {' '}
      <>
        <option value="">Vyberte</option>
        <option value="mesto01">Město 01</option>
        <option value="mesto02">Město 02</option>
        <option value="mesto03">Město 03</option>
        <option value="mesto04">Město 04</option>
        <option value="mesto05">Město 05</option>
      </>{' '}
      */
  );
};

const DateOptions = ({ dates }) => {
  /* const [dates, setDates] = useState([
    {
      dateBasic: '28.05.2021',
      dateCs: 'pá 28. květen 2021',
    },
    {
      dateBasic: '29.05.2021',
      dateCs: 'so 29. květen 2021',
    },
  ]);
  */

  return (
    <>
      <option value="">Vyberte</option>
      {dates.map((date) => (
        <option value={date.dateBasic} key={date.dateBasic}>
          {date.dateCs}
        </option>
      ))}
    </>
    /*
      <option value="">Vyberte</option>
      <option value="datum01">Datum 01</option>
      <option value="datum02">Datum 02</option>
      <option value="datum03">Datum 03</option>
      <option value="datum04">Datum 04</option>
      <option value="datum05">Datum 05</option>
    </>
    */
  );
};
