import React, { useEffect, useState } from 'react';
import { handleDeleteApi, handleGetApi } from '../Utilities/Utils';

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const response = handleGetApi('http://localhost:4000/api/getlist');
      response.then(function (result) {
        if (result) {
          setFavorites(result.data)
        }
      });
    };

    fetchFavorites();
  }, []);
  const handleRemove = async (id) => {
    const response = handleDeleteApi(`http://localhost:4000/api/delfav/${id}`);
    response.then(function (result) {
      if (result) {
        console.log(result.data);
        setFavorites(favorites.filter(fav => fav.id !== id));
      }
    })
  };


  return (
    <div>
      <h1>Favorite Universities</h1>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>State/Province</th>
            <th>Web Page</th>
          </tr>
        </thead>
        <tbody>
          {favorites.map((university, index) => (
            <tr key={index}>
              <td>{university.name}</td>
              <td>{university.state_province}</td>
              <td>
                <a href={university.web_page} target="_blank" rel="noopener noreferrer">
                  {university.web_page}
                </a>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => handleRemove(university.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FavoritesPage;