import React, { useState } from 'react'
import { handleGetApi, handlePostApi } from '../Utilities/Utils';
import { Link } from 'react-router-dom';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    const response = handleGetApi(`http://universities.hipolabs.com/search?name=${query}&country=India`);
    response.then(function (result) {
      if (result) {
        setResults(result.data);
      }
    })
  };
  console.log(results, "results")
  const handleFavorite = async (university) => {
    const data = {
      name: university.name,
      state_province: university['state-province'],
      web_page: university.web_pages[0]
    }
    const response = handlePostApi('http://localhost:4000/api/setfav', data);
    response.then(function (result) {
      if (result) {
        console.log(result.data)
      }
    })
  };
  return (
    <>
      <div className='heaad' style={{ display: "flex" }}>
        <h1>Search for Universities in India</h1>
        <button><Link to='/favorites'>Your Favourites</Link></button>
      </div>
      <form onSubmit={handleSearch}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="University Name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>State/Province</th>
            <th>Web Page</th>
            <th>Favorite</th>
          </tr>
        </thead>
        <tbody>
          {results.map((university, index) => (
            <tr key={index}>
              <td>{university.name}</td>
              <td>{university['state-province']}</td>
              <td>
                <a href={university.web_pages[0]} target="_blank" rel="noopener noreferrer">
                  {university.web_pages[0]}
                </a>
              </td>
              <td>
                <button className="btn btn-secondary" onClick={() => handleFavorite(university)}>Favorite</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default SearchPage
