import { useState } from 'react';
import  ReactDOM  from 'react-dom';
import './Form.css';

export default function Form({addUser, error}) {
    const [user, setUser] = useState('');


    const handleForm = (e) => {
        e.preventDefault();
        const data = {
            user: user
        };
        console.log(user)
        addUser(data)
        resetForm();
    }
    const handleChange = (e) => {
        setUser(e.target.value);
    }
    const resetForm = () => {
        setUser('')
    }




  return ReactDOM.createPortal((
    <div className='Form'>
      <form onSubmit={handleForm}>
      <label>
      <input 
      type="text" 
      name='username' 
      placeholder='enter user name'
      onChange={handleChange}
      value={user}
      />
      </label>
      <p className={error ? 'error' : 'none'}>username should contain 5 letters</p>
      <button>submit</button>
      </form>
    </div>
  ), document.body)
}
