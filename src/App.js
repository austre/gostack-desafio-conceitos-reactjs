import React,{useState,useEffect} from 'react';
import api from './services/api';
import Header from './components/Header';

import "./styles.css";

function App() {
  const [repositories,setRepositories]=useState([]);

  useEffect(()=>{
    api.get("repositories").then(response=>{
      setRepositories(response.data);
    });
  },[]);

  async function handleAddRepository() {
    const response=await api.post('repositories',{
      title: `Novo Repositório ${Date.now()}`,
      url: "github.com/",
      techs:"ReactJS"
    });

    const repository=response.data;

    setRepositories([...repositories,repository]);
    //console.log(repository);
  }

  async function handleRemoveRepository(id) {
    const response=await api.delete(`repositories/${id}`);
    if(response.status===204){
      setRepositories(repositories.filter(repository=>repository.id!=id));
    }
  }

  return (
    <div>
      <Header title="Repositories" />
      <button onClick={handleAddRepository}>Adicionar</button>
      <ul data-testid="repository-list">
        {
        repositories.map(repository=>
        <li key={repository.id}>
          <span>{repository.title}</span>
          <span>{repository.url}</span>
          <span>{repository.techs}</span>
          <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
        </li>
        )
        }
      </ul>
    </div>
  );
}

export default App;
