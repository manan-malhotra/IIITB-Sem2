import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Dashboard() {
	const navigate = useNavigate()
	const {user} = useSelector((state)=>state.auth)

  	useEffect(()=>{
    	if(!user){
			navigate("/login")		
    	}
  	},
  	[user,navigate]
  	)

  	return (
    	<>
			<section className='heading'>
			<h1>
				Welcome {user && user.name.toUpperCase()[0] + user.name.substr(1)}
			</h1>
			<p>Goals Dashboard</p>
			</section>
		</>
  	)
}

export default Dashboard