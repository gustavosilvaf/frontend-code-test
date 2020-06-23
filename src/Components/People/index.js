import React, { useState, useEffect } from 'react';
import './styles.scss';
import Player from '../Player';
import { loadPeople } from '../../services/Users';

const People = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    async function load() {
      setPeople(await loadPeople());
    }
    load();
  }, []);

  return (
    <div className="People">
      {people.map(({ location, name, age, infected }) => (
        <div data-testid={location} key={location}>
          <Player name={name} age={age} infected={infected} />
        </div>
      ))}
    </div>
  );
};

export default People;
