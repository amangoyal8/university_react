import React, { useEffect, useState } from 'react';
import { handleGetApi } from '../Utilities/Utils';

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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FavoritesPage;