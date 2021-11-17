import React, { useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Header, Issues, RepoInfo } from './styled';
import logo from '../../assets/logo.svg';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { api } from '../../services/api';
import { GithubRepository } from '../../Interfaces/githubRepository';
interface RepositoryParams {
  repository: string;
}
interface RepositoryDados extends GithubRepository {
  subscribers_count: number;
  network_count: number;
  forks_count: number;
  stargazes_count: number;
  open_issues_count: number;
}
interface RepositoryIssues {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
    avatar_url: string;
  };
}

const Repo: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();
  const [dados, setDados] = React.useState<RepositoryDados | null>(null);
  const [issues, setIssues] = React.useState<RepositoryIssues[]>([]);

  useEffect(() => {
    api
      .get(`repos/${params?.repository}`)
      .then(result => setDados(result.data))
      .catch(e => console.log(e));

    api
      .get(`repos/${params?.repository}/issues`)
      .then(result => setIssues(result.data))
      .catch(e => console.log(e));
  }, []);

  return (
    <>
      <Header>
        <img src={logo} alt="GitCollection" />
        <Link to="/">
          <MdChevronLeft /> Voltar
        </Link>
      </Header>
      {dados && (
        <RepoInfo>
          <Header>
            <img src={dados?.owner.avatar_url} alt="GitCollection" />
            <div>
              <strong>{dados?.full_name}</strong>
              <p>{dados?.description}</p>
            </div>
          </Header>
          <ul>
            <li>
              <strong>{dados?.subscribers_count}</strong>
              <span>Star</span>
            </li>
            <li>
              <strong>{dados?.forks_count}</strong>
              <span>Forks </span>
            </li>
            <li>
              <strong>{dados?.open_issues_count}</strong>
              <span>Issues Abertas </span>
            </li>
          </ul>
        </RepoInfo>
      )}

      <Issues>
        {issues.map(issue => (
          <a href={`${issue.html_url}`} key={issue.id}>
            <div>
              <strong>{issue?.title}</strong>
              <p>{issue?.user?.login}</p>
              <p>{issue?.user?.avatar_url}</p>
            </div>
            <MdChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};
export default Repo;
