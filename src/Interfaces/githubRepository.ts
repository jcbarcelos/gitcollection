export interface GithubRepository {
  node_id: string;
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}
