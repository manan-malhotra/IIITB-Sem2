import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import GoalForm from '../components/GoalForm'
import { getGoals, reset } from '../features/goals/goalSlice'
import Spinner from '../components/Spinner'
import GoalItem from '../components/GoalItem'
function Dashboard() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const {user} = useSelector((state)=>state.auth)
	const {goals, isError, isLoading, message} = useSelector((state)=>state.goal)
  	
	useEffect(() => {
    if (isError) {
    	console.log(message)
		navigate('/login')
    }
    if (!user) {
      navigate('/login')
    }


    dispatch(getGoals())

    return () => {
      dispatch(reset())
    }
  }, [user])


	

	if(isLoading) {return (<Spinner/>)}
  	return (
    	<>
			<section className='heading'>
			<h1>
				Welcome {user && user.name.toUpperCase()[0] + user.name.substr(1)}
			</h1>
			<p>Goals Dashboard</p>
			</section>
			<GoalForm/>
			<section className="content">
				{goals.length>0?(<>
					<div className="goals">
					{goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
					</div>
				</>):(<>
					<h3>You do not have any goals yet</h3>
				</>)}
			</section>
		</>
  	)
}

export default Dashboard