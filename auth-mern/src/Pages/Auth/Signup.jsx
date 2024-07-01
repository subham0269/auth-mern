import { useReducer } from "react";
import { Link } from "react-router-dom";
import { userSignup } from "../../utils/Authentication";

const initialState = {
   email: '',
   password: '',
   username: ''
};


const reducer = (state, action) => {
   switch (action.type) {
      case 'u_name':
         return { ...state, username: action.payload };
      case 'u_email':
         return { ...state, email: action.payload };
      case 'u_pass':
         return { ...state, password: action.payload };
      default:
         return state;
   }
}

const Signup = () => {
   const [state, dispatch] = useReducer(reducer, initialState);

   const handleSubmit = async (e) => {
      e.preventDefault();
      const user = await userSignup(state);
      console.log('user', user);
   }

   return (
      <>
         <div className="bg-white dark:bg-gray-900">
            <div className="flex justify-center h-screen">
               <div className="hidden bg-cover lg:block lg:w-2/3 bg-[url('https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')]">
                  <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                     <div>
                        <h2 className="text-2xl font-bold text-white sm:text-3xl">Meraki UI</h2>

                        <p className="max-w-xl mt-3 text-gray-300">
                           Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                           autem ipsa, nulla laboriosam dolores, repellendus perferendis libero suscipit nam temporibus
                           molestiae
                        </p>
                     </div>
                  </div>
               </div>

               <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                  <div className="flex-1">
                     <div className="text-center">
                        <div className="flex justify-center mx-auto">
                           <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />
                        </div>

                        <p className="mt-3 text-gray-500 dark:text-gray-300">Sign up to create your account</p>
                     </div>

                     <div className="mt-8">
                        <form onSubmit={handleSubmit}>
                           <div>
                              <label htmlFor="username" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Username</label>
                              <input type="text" name="username" id="text" autoComplete="true" value={state.username} onChange={(e) => dispatch({ type: 'u_name', payload: e.target.value })} placeholder="your username" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                           </div>

                           <div className="mt-6">
                              <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                              <input type="email" name="email" id="email-field" autoComplete="true" value={state.email} onChange={(e) => dispatch({ type: 'u_email', payload: e.target.value })} placeholder="example@example.com" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                           </div>

                           <div className="mt-6">
                              <div className="flex justify-between mb-2">
                                 <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">Password</label>
                                 <a href="#" className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot password?</a>
                              </div>

                              <input type="password" name="password" id="password-field" value={state.password} onChange={(e) => dispatch({ type: 'u_pass', payload: e.target.value })} placeholder="Your Password" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                           </div>

                           <div className="mt-6">
                              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                 Create Account
                              </button>
                           </div>

                        </form>

                        <p className="mt-6 text-sm text-center text-gray-400">Already have an account? <Link to="/login" className="text-blue-500 focus:outline-none focus:underline hover:underline">Login</Link>.</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default Signup;