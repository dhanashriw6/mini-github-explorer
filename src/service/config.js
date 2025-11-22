export const apiEndpoints = {
    getUser: (username) => `https://api.github.com/users/${username}`,
    getUserRepos: (username) => `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,

}
