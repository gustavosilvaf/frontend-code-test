import React, { useEffect, useState } from 'react';
import './styles.scss';
import { Map, TileLayer, Marker } from 'react-leaflet';

import { Menu, center, baseUrl } from '../../utils/constants';
import { loadPeople, getUUID } from '../../services/Users';

const UpdateLocation = () => {
  const [people, setPeople] = useState([]);
  const [selectedPersonUUID, setSelectedPersonUUID] = useState('');
  const [clickedLat, setClickedLat] = useState(0);
  const [clickedLng, setClickedLng] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uuid = e.target.uuid.value;

    const person = await fetch(`${baseUrl}/people/${uuid}.json`).then((res) =>
      res.json()
    );

    const formData = new FormData();
    formData.append('person[name]', person.name);
    formData.append('person[age]', person.age);
    formData.append('person[gender]', person.gender);
    formData.append('person[lonlat]', `Point(${clickedLat} ${clickedLng})`);

    await fetch(`${baseUrl}/people/${uuid}.json`, {
      headers: {
        Accept: 'application/json',
      },
      body: formData,
      method: 'PATCH',
    })
      .then((res) => res.json())
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    setSelectedPersonUUID(getUUID(e.target.value));
  };

  const handleClick = ({ latlng }) => {
    setClickedLat(latlng.lat.toFixed(3));
    setClickedLng(latlng.lng.toFixed(3));
  };

  useEffect(() => {
    async function load() {
      setPeople(await loadPeople());
    }

    load();
  }, []);

  return (
    <div className="UpdateLocation">
      <Menu />
      <h1 className="UpdateLocation__title">Atualize sua localização</h1>
      <div className="UpdateLocation__container">
        <h3 className="UpdateLocation__instruction">Selecione o seu usuário</h3>
        <select
          className="UpdateLocation__select"
          name=""
          id=""
          onChange={handleChange}
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
        <h3 className="UpdateLocation__uuid-title">Sua chave</h3>
        <p className="UpdateLocation__uuid">
          {!selectedPersonUUID ? 'Selecione um usuário' : selectedPersonUUID}
        </p>
        <h3 className="UpdateLocation__update-instruction">
          Insira sua chave para atualizar sua localização
        </h3>
        <form onSubmit={handleSubmit} className="UpdateLocation__form">
          <input
            className="UpdateLocation__input"
            type="text"
            name="uuid"
            id="uuid"
            placeholder="Digite aqui sua chave"
          />
          <p className="UpdateLocation__update-instruction">
            Selecione sua nova localização
          </p>
          <p className="UpdateLocation__update-instruction">
            Nova localização: Latitude: {clickedLat} Longitude {clickedLng}{' '}
          </p>
          <Map zoom={12} center={center} onclick={handleClick}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[clickedLat, clickedLng]} />
          </Map>
          <input
            className="UpdateLocation__submit"
            type="submit"
            value="Atualizar"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateLocation;
