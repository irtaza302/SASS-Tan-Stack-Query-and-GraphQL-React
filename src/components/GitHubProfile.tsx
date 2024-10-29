import { useGitHubUser } from '../hooks/useGitHubUser';
import './GitHubProfile.scss';

export function GitHubProfile() {
  const { data: user, isLoading, error } = useGitHubUser('irtaza302');

  if (isLoading) {
    return (
      <div className="github-profile-wrapper">
        <div className="animate-pulse bg-gray-200 rounded-lg p-8 @apply text-primary;">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="github-profile-wrapper">
        <div className="bg-red-50 text-red-500 rounded-lg p-8">
          {error instanceof Error ? error.message : 'Error loading profile'}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="github-profile-wrapper">
        <div className="bg-yellow-50 text-yellow-600 rounded-lg p-8">
          No user data available
        </div>
      </div>
    );
  }

  return (
    <div className="github-profile-wrapper">
      <div className="profile-card">
        <div className="profile-header">
          <img src={user.avatar_url} alt={user.login} className="avatar" />
          <div className="profile-info">
            <h2 className="@apply text-primary;">{user.name || user.login}</h2>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="username">
              @{user.login}
            </a>
          </div>
        </div>
        
        {user.bio && <p className="bio">{user.bio}</p>}
        
        <div className="stats">
          <div className="stat-item">
            <span className="stat-value">{user.public_repos}</span>
            <span className="stat-label">Repositories</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{user.followers}</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{user.following}</span>
            <span className="stat-label">Following</span>
          </div>
        </div>
      </div>
    </div>
  );
}
