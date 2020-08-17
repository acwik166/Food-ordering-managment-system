export const login = async (email, password) => {
  const response = await fetch('api/v1/users/login/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password})
  })
  return response.json();
}