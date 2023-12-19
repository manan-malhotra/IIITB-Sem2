import React, {  useState } from 'react'
import { useDispatch,  } from 'react-redux';
import {createGoal, } from '../features/goals/goalSlice'

function GoalForm() {
    const [text,setText] = useState('')
    const dispatch = useDispatch()
    const onSubmit = e =>{
        e.preventDefault();
        dispatch(createGoal({text}))
        setText('')
    }
    return (
    <section className='form'>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input type="text" name="goal" id="goal" placeholder='Enter your goal' value={text } onChange={e=>setText(e.target.value)}/>
            </div>
            <div className="form-group">
                <button className="btn btn-block" type='submit'>Submit</button>
            </div>
        </form>
    </section>
  )
}

export default GoalForm