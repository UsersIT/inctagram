export function gitHubAuth() {
  const REDIRECT_URL = `http://localhost:3000/auth/github`

  const url = `https://inctagram.work/api/v1/auth/github/login?redirect_uri=${REDIRECT_URL}`

  window.location.assign(url)
}
