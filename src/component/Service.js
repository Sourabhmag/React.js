import axios from 'axios';
export function RegisterUser(user){
    return axios.post('http://localhost:8081/user/register',user,{
        headers:{
            'Content-Type':'application/json;charset=utf-8'
        }
    })
}