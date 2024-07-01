import axios from 'axios';

export async function userSignup(props) {
   const {username, email, password} = props;
   try {
      const response = await axios.post('http://localhost:8002/auth/signup', {
         username: username,
         email: email,
         password: password
      })
      return response.data;
   } catch (error) {
      console.log('signup api error', error.response);
   }
}


export async function userLogin(props) {
   const {email, password} = props;
   try {
      const response = await axios.post('http://localhost:8002/auth/login', {
         identifier: email,
         password: password
      })
      return response.data;
   } catch (error) {
      console.log('login api error', error.response);
   }
}