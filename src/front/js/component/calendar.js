import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/calendar.css";
import { DoctorCards } from "./doctorCard.js";

export const Calendar = () => {
  const [month, setMonth] = useState("February");
  const [year, setYear] = useState(2021);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState("12");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [showMonthSelector, setShowMonthSelector] = useState(false);

  const navigate = useNavigate(); 
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const prevYear = () => setYear(year - 1);
  const nextYear = () => setYear(year + 1);

  const handleMonthClick = (selectedMonth) => {
    setMonth(selectedMonth);
    setShowMonthSelector(false);
  };

  const toggleMonthSelector = () => setShowMonthSelector(!showMonthSelector);

  const getDaysInMonth = (month, year) => {
    const date = new Date(year, months.indexOf(month) + 1, 0);
    return date.getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    const date = new Date(year, months.indexOf(month), 1);
    return date.getDay();
  };

  const handleDayClick = (day) => {
    const dateString = `${year}-${months.indexOf(month) + 1}-${day < 10 ? '0' + day : day}`;
    setSelectedDate(dateString);
  };

  const generateDays = () => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);
    const totalCells = Math.ceil((daysInMonth + firstDay) / 7) * 7; // Completa la cuadrícula

    const days = [];
    let currentDay = 1;

    // Agregar espacios vacíos al principio según el primer día del mes
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty-day"></div>);
    }

    // Agregar los días del mes
    for (let i = firstDay; i < totalCells; i++) {
      if (currentDay <= daysInMonth) {
        const isSelected = selectedDate === `${year}-${months.indexOf(month) + 1}-${currentDay < 10 ? '0' + currentDay : currentDay}`;
        days.push(
          <div
            key={currentDay}
            className={`calendar-day ${isSelected ? 'selected' : ''}`}
            onClick={() => handleDayClick(currentDay)}
          >
            {currentDay}
          </div>
        );
        currentDay++;
      } else {
        // Agregar días vacíos al final del mes si es necesario
        days.push(<div key={`empty-${currentDay}`} className="calendar-day empty-day"></div>);
      }
    }

    // Agrupar los días en filas de 7 elementos
    const rows = [];
    for (let i = 0; i < days.length; i += 7) {
      rows.push(
        <div className="calendar-week" key={`week-${i}`}>
          {days.slice(i, i + 7)}
        </div>
      );
    }
    return rows;
  };

  const handleScheduleAppointment = () => {
    if (selectedDate) {
      const fullDate = `${selectedDate} ${selectedHour}:${selectedMinute}`;
      navigate(`/calendar/${fullDate}`);
    } else {
      alert("Por favor, selecciona una fecha.");
    }
  };

  return (
    <div className="container">
      <div className="doctor-calendar-wrapper">
        <div className="doctor-section">
          <DoctorCards />
        </div>

        <div className="calendar-section">
          <div className="calendar-container">
            <div className="calendar-header">
              <span
                className="month-picker"
                onClick={toggleMonthSelector}
              >
                {month}
              </span>
              <div className="year-picker">
                <span className="year-change" onClick={prevYear}>-</span>
                <span>{year}</span>
                <span className="year-change" onClick={nextYear}>+</span>
              </div>
            </div>

            <div
              className={`month-selector ${showMonthSelector ? 'show' : ''}`}
            >
              {months.map((m, index) => (
                <div
                  key={index}
                  className="month-option"
                  onClick={() => handleMonthClick(m)}
                >
                  {m}
                </div>
              ))}
            </div>

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

            <div className="time-selector">
              <select
                value={selectedHour}
                onChange={(e) => setSelectedHour(e.target.value)}
              >
                {[...Array(24).keys()].map((h) => (
                  <option key={h} value={h < 10 ? `0${h}` : h}>
                    {h < 10 ? `0${h}` : h}
                  </option>
                ))}
              </select>
              <span>:</span>
              <select
                value={selectedMinute}
                onChange={(e) => setSelectedMinute(e.target.value)}
              >
                {[...Array(60).keys()].map((m) => (
                  <option key={m} value={m < 10 ? `0${m}` : m}>
                    {m < 10 ? `0${m}` : m}
                  </option>
                ))}
              </select>
            </div>

            <div className="calendar-footer">
              <div className="calendar-buttons">
                <button
                  className="button-cancel"
                  onClick={() => {
                    setSelectedDate(null);
                    setSelectedHour("12");
                    setSelectedMinute("00");
                  }}
                >
                  Cancelar
                </button>
                <button
                  className="button-submit"
                  onClick={handleScheduleAppointment}
                >
                  Agendar Cita
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;