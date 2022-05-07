import { useEffect, useReducer, useState } from 'react'
import classes from './Login.module.css'
import Button from '../UI/Button'
import Card from '../UI/Card'

function Login(props) {
	const dataReducer = (prevState, action) => {
		if (action.type === 'EMAIL_INPUT') {
			return {
				emailValue: action.emailValue.value,
				emailIsValid: action.emailValue.includes('@'),
			}
		}

		if (action.type === 'PASSWORD_INPUT') {
			console.log(action)
			return {
				passwordValue: action.passwordValue.value,
				passwordIsValid: action.passwordValue.trim().length > 2,
			}
		}

		if (action.type === 'INPUT_BLUR') {
			return {
				emailValue: prevState.value,
				emailIsValid: undefined,
				passwordValue: prevState.value,
				passwordIsValid: undefined,
			}
		}
		return {
			emailValue: prevState.value,
			emailIsValid: undefined,
			passwordValue: prevState.value,
			passwordIsValid: undefined,
		}
	}

	const [formIsValid, setFormIsValid] = useState(false)
	const [userData, dispatchUserData] = useReducer(dataReducer, {
		emailValue: '',
		emailIsValid: false,
		passwordValue: '',
		passwordIsValid: false,
	})

	useEffect(() => {
		const timer = setTimeout(() => {
			setFormIsValid(
				// userData.passwordValue.trim().length > 2 &&
				// // 	userData.emailValue.includes('@'),
				// userData.passwordValue.trim().length > 2 &&
				// 	userData.emailValue.includes('@'),
				userData.emailIsValid && userData.passwordIsValid,
			)
		}, 3000)
		return () => {
			clearTimeout(timer)
		}
	}, [userData.emailIsValid, userData.passwordIsValid])

	const emailChangeHandler = (e) => {
		dispatchUserData({ type: 'EMAIL_INPUT', emailValue: e.target.value })
	}

	const passwordChangeHandler = (e) => {
		dispatchUserData({
			type: 'PASSWORD_INPUT',
			passwordValue: e.target.value,
		})
	}

	const submitHandler = (e) => {
		e.preventDefault()
		props.onLogin(userData.emailValue, userData.passwordValue)
	}

	const validate = () => {
		dispatchUserData({ type: 'INPUT_BLUR' })
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
						type='email'
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
						type='password'
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
