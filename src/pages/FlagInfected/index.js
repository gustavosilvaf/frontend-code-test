import React, { useState, useEffect } from 'react';

import './styles.scss';

import { loadPeople, getUUID } from '../../services/Users';
import { Menu, baseUrl } from '../../utils/constants';

const FlagInfected = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    async function load() {
      setPeople(await loadPeople());
    }
    load();
  }, []);

  const handleSumbmit = async (e) => {
    e.preventDefault();

    const reporteruser = getUUID(e.target.reporter.value);
    const reportedUser = new FormData();

    reportedUser.append('infected', getUUID(e.target.reported.value));
    console.log(`${reportedUser}${reporteruser}`);

    await fetch(`${baseUrl}/people/${reporteruser}/report_infection.json`, {
      headers: {
        Accept: 'application/json',
      },
      body: reportedUser,
      method: 'post',
    });
  };

  return (
    <div className="FlagInfected">
      <Menu />
      <h1 className="FlagInfected__title">Reporte um usuário</h1>
      <form onSubmit={handleSumbmit} className="FlagInfected__form">
        <div className="FlagInfected__report-container">
          <div className="FlagInfected__reporter">
            <h3 className="FlagInfected__report-title">Quem reporta</h3>
            <select
              className="FlagInfected__select"
              name="reporter"
              id="reporter"
            >
              <option defaultChecked> -- Selecione</option>
              {people.map(({ name, location }) => (
                <option
                  key={location}
                  className="UpdateLocation__option"
                  value={location}
                >
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="FlagInfected__reported">
            <h3 className="FlagInfected__report-title">Suspeito</h3>
            <select
              className="FlagInfected__select"
              name="reported"
              id="reported"
            >
              <option defaultChecked> -- Selecione</option>
              {people.map(({ name, location }) => (
                <option
                  key={location}
                  className="UpdateLocation__option"
                  value={location}
                >
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="FlagInfected__submit-container">
          <input
            className="FlagInfected__submit"
            type="submit"
            value="Enviar"
          />
        </div>
      </form>
    </div>
  );
};

export default FlagInfected;
