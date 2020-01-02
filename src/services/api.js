const API_ROOT = 'http://localhost:3001'
const token = localStorage.getItem('token')

const headers = {
  'Content-Type': 'application/json',
  Accepts: 'application/json',
  Authorization: `Bearer ${token}`
};

const getCurrentUser = () => {
  return fetch(`${API_ROOT}/current_user`, {
    headers
  }).then(res => res.json());
};

const getUserProfile = user => {
  return fetch(`${API_ROOT}/profiles`, {headers: headers})
  .then(res => res.json())
  .then(profiles => {
    return profiles.find(profile => profile.user.id === user.id)
  })
}

const getSchools = () => {
  return fetch(`${API_ROOT}/schools`, {headers: headers}).then(res => res.json())
}

const getEvents = school => {
  return fetch(`${API_ROOT}/events`, {headers: headers})
  .then(res => res.json())
  .then(events => {
    return events.filter(event => event.school.id === school.id)
  })
}

const getJoins = profile => {
  return fetch(`${API_ROOT}/event_profiles`, {headers: headers})
  .then(res => res.json())
  .then(joins => {
    return joins.filter(join => join.profile.id === profile.id )
  })

}

const getCategories = () => {
  return fetch(`${API_ROOT}/categories`, {headers: headers}).then(res => res.json())
  
}

const login = data => {
  return fetch(`${API_ROOT}/login`, {
    method: 'POST',
    headers,
    body: JSON.stringify({user: data})
  }).then(res => res.json());
};

const register = (user, profile) => {
  return fetch(`${API_ROOT}/register`, {
    method: 'POST',
    headers,
    body: JSON.stringify({user: user})
  }).then(res => res.json())
  .then(user => {
    if (!user.error) {
      createProfile(user, profile);
      return user;
    } else {
      return false
    }
  });
};

const createProfile = (user, profile) => {
  return fetch(`${API_ROOT}/profiles`, {
    method: 'POST',
    headers,
    body:JSON.stringify({
      name: profile.name,
      age: profile.age,
      bio: profile.bio,
      avatarURL: profile.avatarURL,
      user_id: user.user.id,
      school_id: profile.school_id
    })
  }).then(res => res.json());
};


export const api = {
  auth: {
    login,
    register,
    getCurrentUser
  },
  profile: {
    getUserProfile
  },
  events: {
    getEvents,
    getCategories,
    getJoins
  },
  schools: {
    getSchools
  }
};
