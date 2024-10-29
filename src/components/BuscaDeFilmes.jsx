import React, { useState } from 'react';
import './BuscaDeFilmes.css'

function BuscaDeFilmes() {
  const [query, setQuery] = useState('');8
  const [filmes, setFilmes] = useState([]);
  const [erro, setErro] = useState('');

  const buscarFilmes = async () => {
    try {
      const response = await fetch(`https://www.omdbapi.com/apikey.aspx?VERIFYKEY=bd1a66d0-6cda-45f3-9cac-18fcc6a91e11`);
      const data = await response.json();
      if (data.Response === 'True') {
        setFilmes(data.Search);
        setErro('');
      } else {
        setFilmes([]);
        setErro(data.Error);
      }
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
      setErro('Erro ao buscar filmes. Por favor, tente novamente mais tarde.');
    }
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    buscarFilmes();
  };

  return (
    <div>
      <h2>Busca de Filmes</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Digite o nome do filme"
        />
        <button type="submit">Buscar</button>
      </form>
      {erro && <p>{erro}</p>}
      <div>
        {filmes.map((filme) => (
          <div key={filme.imdbID}>
            <h3>{filme.Title}</h3>
            <img src={filme.Poster} alt={filme.Title} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BuscaDeFilmes;