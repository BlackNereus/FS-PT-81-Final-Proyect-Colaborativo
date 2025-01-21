import React, { useState, useEffect } from "react";
import "../../styles/calendar.css";

export const Calendar = () => {
  const [month, setMonth] = useState("February");
  const [year, setYear] = useState(2021);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState("12"); // Establece una hora predeterminada
  const [selectedMinute, setSelectedMinute] = useState("00"); // Establece minutos predeterminados
  const [showMonthSelector, setShowMonthSelector] = useState(false);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const prevYear = () => setYear(year - 1);
  const nextYear = () => setYear(year + 1);

  const handleMonthClick = (selectedMonth) => {
    setMonth(selectedMonth);
    setShowMonthSelector(false); // Oculta el selector de meses después de elegir
  };

  const toggleMonthSelector = () => setShowMonthSelector(!showMonthSelector);

  const getDaysInMonth = (month, year) => {
    const date = new Date(year, months.indexOf(month) + 1, 0);
    return date.getDate();
  };

  const handleDayClick = (day) => {
    const dateString = `${year}-${months.indexOf(month) + 1}-${day < 10 ? '0' + day : day}`;
    setSelectedDate(dateString);
  };

  const generateDays = () => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = new Date(year, months.indexOf(month), 1).getDay();
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div className="empty-day" key={`empty-${i}`}></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const isSelected = selectedDate === `${year}-${months.indexOf(month) + 1}-${i < 10 ? '0' + i : i}`;
      days.push(
        <div
          key={i}
          className={`calendar-day ${isSelected ? 'selected' : ''}`}
          onClick={() => handleDayClick(i)}
        >
          {i}
        </div>
      );
    }
    return days;
  };

  // Maneja la selección de hora
  const handleHourChange = (e) => {
    setSelectedHour(e.target.value);
  };

  // Maneja la selección de minutos
  const handleMinuteChange = (e) => {
    setSelectedMinute(e.target.value);
  };

  useEffect(() => {
    generateDays();
  }, [month, year, selectedDate]);

  return (
    <div className={`calendar ${showMonthSelector ? "show" : ""}`}>
      <div className="calendar-header">
        <span className="month-picker" onClick={toggleMonthSelector}>
          {month}
        </span>
        <div className="year-picker">
          <span className="year-change" onClick={prevYear}>-</span>
          <span>{year}</span>
          <span className="year-change" onClick={nextYear}>+</span>
        </div>
      </div>

      {/* Selector de Meses */}
      <div className={`month-selector ${showMonthSelector ? 'show' : ''}`}>
        {months.map((m, index) => (
          <div key={index} className="month-option" onClick={() => handleMonthClick(m)}>
            {m}
          </div>
        ))}
      </div>

      {/* Calendario */}
      <div className="calendar-body">
        <div className="calendar-week-day">
          <div>Dom</div>
          <div>Lun</div>
          <div>Mar</div>
          <div>Mie</div>
          <div>Jue</div>
          <div>Vie</div>
          <div>Sab</div>
        </div>
        <div className="calendar-days">
          {generateDays()}
        </div>
      </div>

      {/* Fecha seleccionada */}
      <div className="calendar-footer">
        {selectedDate && (
          <div className="selected-date">
            Fecha seleccionada: {selectedDate} 
            <br />
            {/* Selector de Hora */}
            <div className="time-selector">
              <label>Hora:</label>
              <select value={selectedHour} onChange={handleHourChange}>
                {Array.from({ length: 24 }, (_, i) => {
                  const hour = i < 10 ? `0${i}` : i;
                  return (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  );
                })}
              </select>
              :
              {/* Selector de Minutos */}
              <select value={selectedMinute} onChange={handleMinuteChange}>
                {Array.from({ length: 60 }, (_, i) => {
                  const minute = i < 10 ? `0${i}` : i;
                  return (
                    <option key={minute} value={minute}>
                      {minute}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        )}
      </div>
      <div className="calendar-button">
          <button className="button-submit">Enviar</button>
          <button className="button-cancel">Cancelar</button>

      </div>
    </div>
  );
};

export default Calendar;