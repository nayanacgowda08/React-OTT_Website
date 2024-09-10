import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTY2NmVlNzliZGQxN2JiZmNhY2VmOTAzYTI3MzVkZCIsIm5iZiI6MTcyNTAyNTkyMS41MTUwNjUsInN1YiI6IjY2ZDFjZDc3ZWE1MzkwM2ViZDAxYjZmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rs8lrdmtu2rb3Npx9GFxTuyKDhRyhVURACvpjiOUPQ4'
      }
})

export default instance;