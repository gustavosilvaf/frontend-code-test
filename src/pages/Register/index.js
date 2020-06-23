import React, { useState } from 'react';
import './styles.scss';
import { Map, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import { Menu, center, baseUrl } from '../../utils/constants';

const Register = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('0');
  const [gender, setGender] = useState('m');
  const [clickedLat, setClickedLat] = useState(center.lat);
  const [clickedLng, setClickedLng] = useState(center.lng);
  const [fijiWater, setFijiWater] = useState(0);
  const [campbellSoup, setCampbellSoup] = useState(0);
  const [firstAidPouch, setFirstAidPouch] = useState(0);
  const [ak, setAk] = useState(0);

  const handleClick = ({ latlng }) => {
    setClickedLat(latlng.lat.toFixed(3));
    setClickedLng(latlng.lng.toFixed(3));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('person[name]', name);
    formData.append('person[age]', parseInt(age));
    formData.append('person[gender]', gender.toUpperCase());
    formData.append('person[lonlat]', `POINT(${clickedLng} ${clickedLat})`);
    formData.append(
      'items',
      `Fiji Water:${fijiWater};Campbell Soup:${campbellSoup};First Aid Pouch:${firstAidPouch}; AK47:${ak}`
    );

    fetch(`${baseUrl}/people.json`, {
      headers: {
        Accept: 'application/json',
      },
      body: formData,
      method: 'post',
    }).then((res) => res.json());
  };

  return (
    <div className="Register">
      <Menu />

      <h1 className="Register__title">Registre um jogador</h1>

      <form
        id="form"
        className="Register__form"
        method="post"
        onSubmit={handleSubmit}
      >
        <input
          onChange={(e) => setName(e.target.value)}
          className="Register__form-name"
          type="text"
          id="name"
          name="name"
          placeholder="Nome"
          required
        />
        <input
          onChange={(e) => setAge(e.target.value)}
          className="Register__form-age"
          type="number"
          id="age"
          name="age"
          placeholder="Idade"
          required
        />
        <div
          className="Register__form-gender"
          onClick={(e) => setGender(e.target.value)}
        >
          <div>
            <input type="radio" name="gender" id="m" value="m" defaultChecked />
            <label htmlFor="m">Masculino</label>
          </div>
          <div>
            <input type="radio" name="gender" id="f" value="f" />
            <label htmlFor="f">Feminino</label>
          </div>
        </div>

        <div className="Register__form-map">
          <h3 className="Register__map-title">Seleciona a posição</h3>
          <p className="Register__map-subtitle">
            Latitude: {clickedLat} | Longitude: {clickedLng}
          </p>
          <Map zoom={center.zoom} center={center} onclick={handleClick}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[clickedLat, clickedLng]} />
          </Map>
        </div>
        <div className="Register__items-container">
          <h3>Slecione a quantidade de itens iniciais</h3>
          <div className="Register__item-container">
            <label htmlFor="Fiji Water">Fiji Water</label>
            <input
              onChange={(e) => setFijiWater(e.target.value)}
              className="Register__form-item"
              type="number"
              id="Fiji Water"
              name="Fiji Water"
              placeholder="0"
              required
            />
          </div>

          <div className="Register__item-container">
            <label htmlFor="Campbell Soup">Campbell Soup</label>
            <input
              onChange={(e) => setCampbellSoup(e.target.value)}
              className="Register__form-item"
              type="number"
              id="Campbell Soup"
              name="Campbell Soup"
              placeholder="0"
              required
            />
          </div>

          <div className="Register__item-container">
            <label htmlFor="First Aid Pouch">First Aid Pouch</label>
            <input
              onChange={(e) => setFirstAidPouch(e.target.value)}
              className="Register__form-item"
              type="number"
              id="First Aid Pouch"
              name="First Aid Pouch"
              placeholder="0"
              required
            />
          </div>
          <div className="Register__item-container">
            <label htmlFor="AK47">AK47</label>
            <input
              onChange={(e) => setAk(e.target.value)}
              className="Register__form-item"
              type="number"
              id="AK47"
              name="AK47"
              placeholder="0"
              required
            />
          </div>
        </div>

        <input className="Register__submit" type="submit" value="Cadastrar" />
      </form>
    </div>
  );
};

export default Register;
