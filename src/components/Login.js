import { useEffect, useReducer, useState } from 'react'
import classes from './Login.module.css'
import Button from '../UI/Button'
import Card from '../UI/Card'

function Login(props) {


	const emailReduser = (prevState, action) => {
		if (action.type === 'USER_INPUT') {
			return {
				value: action.emailValue,
				isValid: action.emailValue.includes('@'),
			};
		}
		if( action.type === 'INPUT_BLUR'){
			return {
				value: prevState.value,
				isValid: undefined,
			}
		}
		return{
			value: '',
			isValid: false,
		}
	}
	const [emailState, dispatchEmail] = useReducer(emailReduser, {
		value: '',
		isValid: false,
	})


	const passwordReduser= (prevState, action) =>{
if(action.type === 'USER_PASSWORD'){
	return{
		value:action.passwordValue,
		isValid:action.passwordValue.length > 2,
	}
}
if(action.type=== 'INPUT_BLUR'){
	return{
		value:prevState.value,
		isValid:undefined,
	}
}
	}
 	const [password, dispatchPassword] = useReducer(passwordReduser, {
		value:'',
		isValid: false,
	})
	// const [email, setEmail] = useState('')
	// const [emailIsValid, setE mailIsValid] = useState()
	// const [password, setPassword] = useState('')
	// const [passwordIsValid, setPasswordIsValid] = useState()
	const [formIsValid, setFormIsValid] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			setFormIsValid(
				password.value.trim().length > 2 && emailState.value.includes('@'),
			)
		}, 3000)
		return () => {
			clearTimeout(timer)
		}
	}, [emailState.value, password.value])

	const emailChangeHandler = (e) => {
		// setEmail(e.target.value)
		dispatchEmail({ type: 'USER_INPUT', emailValue: e.target.value })
	}

	const passwordChangeHandler = (e) => {
		// setPassword(e.target.value)
		dispatchPassword({type:'USER_PASSWORD', passwordValue:e.target.value})
	}

	const submitHandler = (e) => {
		e.preventDefault()
		props.onLogin(emailState.value, password.value)
	}

	const validateEmail = () => {
		// setEmailIsValid(email.includes('@'))
		dispatchEmail({ type: 'INPUT_BLUR' })
	}

	const validatePassword = () => {
		// setPasswordIsValid(password.trim().length > 2)
		dispatchPassword({type: 'INPUT_BLUR'})
	}
	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div
					className={`${classes.control} ${
						emailState.isValid === false ? classes.invalid : ''
					}`}
				>
					<label htmlFor='email'>E-Mail</label>
					<input
						type='email'
						id='email'
						onChange={emailChangeHandler}
						value={emailState.value}
						onBlur={validateEmail}
					/>
				</div>
				<div
					className={`${classes.control} ${
						password.isValid === false ? classes.invalid : ''
					}`}
				>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						onChange={passwordChangeHandler}
						value={password.value}
						onBlur={validatePassword}
					/>
				</div>
				<div className={classes.actions}>
					<Button
						type='submit'
						className={classes.btn}
						disabled={!formIsValid}
					>
						Login
					</Button>
				</div>
			</form>
		</Card>
	)
}

export default Login
