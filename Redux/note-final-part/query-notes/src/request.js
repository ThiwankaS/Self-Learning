import axios from 'axios'

export const getData = () => axios.get('http://localhost:3001/notes').then(res => res.data) 