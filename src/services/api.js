const API_ROOT = 'http://localhost:3001'
const token = localStorage.getItem('token')

const headers = {
  'Content-Type': 'application/json',
  Accepts: 'application/json',
  Authorization: token
};

const getCurrentUser = () => {
  return fetch(`${API_ROOT}/current_user`, {
    headers
  }).then(res => res.json());
};

const getUserProfile = () => {
  fetch(`${API_ROOT}/profiles`, {headers: headers})
  .then(res => res.json())
  .then(profiles => {
    profiles.find(profile => profile.user_id == getCurrentUser().id)
  })
}

const getSchools = () => {
  return fetch(URL + '/schools')
  .then(res => res.json())
}

const getEvents = () => {
  
}

const login = data => {
  return fetch(`${API_ROOT}/auth`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  }).then(res => res.json());
};


export const api = {
  auth: {
    login,
    getCurrentUser
  },
  profile: {
    getUserProfile
  }
};
