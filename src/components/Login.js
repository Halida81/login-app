import { useEffect, useReducer, useState } from 'react'
import classes from './Login.module.css'
import Button from '../UI/Button'
import Card from '../UI/Card'

const dataReducer = (prevState, action) => {
	if (action.type === 'PASSWORD') {
		return {
			...prevState,
			passwordValue: action.passwordValue,
			passwordIsValid: action.passwordValue.trim().length > 2,
		}
	}
	if (action.type === 'EMAIL') {
		return {
			...prevState,
			emailValue: action.emailValue,
			emailIsValid: action.emailValue.includes('@'),
		}
	}
	if (action.type === 'ON_BLUR') {
		return {
			emailValue: prevState.emailValue,
			emailIsValid: prevState.emailValue.includes('@'),
			passwordValue: prevState.passwordValue,
			passwordIsValid: prevState.passwordValue.trim().length > 2,
		}
	} else {
		return {
			emailValue: '',
			emailIsValid: null,
			passwordValue: '',
			passwordIsValid: null,
		}
	}
}

function Login(props) {
	const [formIsValid, setFormIsValid] = useState(false)

	const [userData, dispatchUserData] = useReducer(dataReducer, {
		emailValue: '',
		emailIsValid: null,
		passwordValue: '',
		passwordIsValid: null,
	})

	useEffect(() => {
		const timer = setTimeout(() => {
			setFormIsValid(
				userData.passwordValue.length > 2 &&
					userData.emailValue.includes('@'),
			)
		}, 300)
		return () => clearTimeout(timer)
	}, [userData.emailValue, userData.passwordValue])

	const emailChangeHandler = (e) => {
		dispatchUserData({ type: 'EMAIL', emailValue: e.target.value })
	}

	const passwordChangeHandler = (e) => {
		dispatchUserData({
			type: 'PASSWORD',
			passwordValue: e.target.value,
		})
	}

	const submitHandler = (e) => {
		e.preventDefault()
		props.onLogin(userData.emailValue, userData.passwordValue)
	}

	const validate = () => {
		dispatchUserData({ type: 'ON_BLUR' })
	}

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div
					className={`${classes.control} ${
						userData.emailIsValid === false ? classes.invalid : ''
					} `}
				>
					<label htmlFor='email'>E-Mail</label>
					<input
						type='text'
						id='email'
						onChange={emailChangeHandler}
						value={userData.emailValue}
						onBlur={validate}
					/>
				</div>
				<div
					className={`${classes.control}   ${
						userData.passwordIsValid === false
							? classes.invalid
							: ''
					}`}
				>
					<label htmlFor='password'>Password</label>
					<input
						type='text'
						id='password'
						onChange={passwordChangeHandler}
						value={userData.passwordValue}
						onBlur={validate}
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
