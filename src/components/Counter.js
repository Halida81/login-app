import { useReducer } from 'react'
const PLUS = 'PLUS'
const MINUS = 'MINUS'
const reducerCounter = (prevState, action) => {
	if (action.type === PLUS) {
		return prevState + 1
	}
	if (action.type === MINUS) {
		return prevState - 1
	}
	return prevState
}
const Counter = () => {
	const [counter, dispatchCounter] = useReducer(reducerCounter, 0)
//const [counter, dispatchCount] = useReducer(reducerCount, 0);
	const plusHandler = () => {
		dispatchCounter({ type: PLUS })
	}

	const minusHandler = () => {
		dispatchCounter({ type: MINUS })
	}

	return (
		<div>
			<h1>{counter}</h1>
			<button onClick={plusHandler}>+</button>
			<button onClick={minusHandler}>-</button>
		</div>
	)
}
export default Counter
