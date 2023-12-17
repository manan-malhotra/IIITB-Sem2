import { useEffect, useState } from "react"
import { FaSignInAlt} from 'react-icons/fa'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login, reset } from "../features/auth/authSlice"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
function Login() {
  const [formData, setFormData] = useState({
    email:'',
    password:'',
  })
  const { email, password } = formData
  const onChange = (e)=>{
    e.preventDefault()
    setFormData((prevData)=>({
      ...prevData,
      [e.target.name]:e.target.value
    }))
  }
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user, isError, isLoading , isSuccess ,message} = useSelector((state)=>state.auth)
  useEffect(
  ()=>{
    if(isError){
      toast.error(message)
    }
    if(isSuccess || user){
      navigate('/')
    }
    dispatch(reset())
  },
  [user,isError,isSuccess,message,navigate,dispatch]
  )
  const onSubmit = (e)=>{
    e.preventDefault()
    const user = {email,password}
    dispatch(login(user))
  }
  if(isLoading) return (<Spinner/>)
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt/> Login
        </h1>
        <p>Please login</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login