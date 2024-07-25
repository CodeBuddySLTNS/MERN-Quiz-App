import axios from 'axios';

const baseUrl = 'https://quizapp-server-1lru.onrender.com';

export const APIs = {
  baseUrl: baseUrl,
  quizDifficulty: {
    easy: axios.get(`${baseUrl}/api/fetchUrl?difficulty=easy`).then(res => res.data.url),
    medium: axios.get(`${baseUrl}/api/fetchUrl?difficulty=medium`).then(res => res.data.url),
    hard: axios.get(`${baseUrl}/api/fetchUrl?difficulty=hard`).then(res => res.data.url),
    random: axios.get(`${baseUrl}/api/fetchUrl?difficulty=random`).then(res => res.data.url),
    dev: "http://localhost:4500/"
  }
}
