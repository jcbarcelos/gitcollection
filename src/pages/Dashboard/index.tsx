import React from 'react';
import { Title, FormComponent, Repos, Error } from './styled';
import logo from '../../assets/logo.svg';
import { MdChevronRight } from 'react-icons/md';
import { api } from '../../services/api';
import { Link } from 'react-router-dom';
import { GithubRepository } from '../../Interfaces/githubRepository';

const Dashboard: React.FC = () => {
  const [repos, setRepos] = React.useState<GithubRepository[]>(() => {
    const storageRepos = localStorage.getItem('@GitCollection.repositories');
    if (storageRepos) {
      return JSON.parse(storageRepos);
    }
    return [];
  });
  const [newRepo, setNewRepo] = React.useState('');
  const [inputError, setInputError] = React.useState('');
  const formEl = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    localStorage.setItem('@GitCollection.repositories', JSON.stringify(repos));
  }, [repos]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setNewRepo(event.target.value);
  }

  async function handleAddRepo(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    if (!newRepo) {
      setInputError('Informe o usuario/repositorio');
      return;
    }
    try {
      const respose = await api.get<GithubRepository>(`repos/${newRepo}`);
      const repository = respose.data;
      setRepos([...repos, repository]);
      formEl.current?.reset();
      formEl.current?.focus();
      setNewRepo('');
      setInputError('');
    } catch (error) {
      setInputError('Repositorio não encontrado no Github');
    }
  }

  return (
    <>
      <img src={logo} alt="GitCollection" />
      <Title>Cátalogo de repositorio do GitHub</Title>
      <FormComponent
        ref={formEl}
        hasError={Boolean(inputError)}
        onSubmit={handleAddRepo}
      >
        <input
          placeholder="username/repository_name"
          onChange={handleInputChange}
        />
        <button type="submit">Buscar</button>
      </FormComponent>

      {inputError && <Error>{inputError}</Error>}

      <Repos>
        {repos.map((re, index) => (
          <Link to={`/repositories/${re.full_name}`} key={index}>
            <img src={re.owner.avatar_url} alt="Repositorio" />
            <div>
              <strong>{re.full_name}</strong>
              <p>{re.description}</p>
            </div>

            <MdChevronRight size={20} />
          </Link>
        ))}
      </Repos>
    </>
  );
};
export default Dashboard;
