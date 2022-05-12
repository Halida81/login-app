import { useContext } from 'react'
import AuthContext from '../AutContext'
import './ToggleSwitch.css'

function ToggleSwitch({ label }) {
	const data = useContext(AuthContext)
	return (
		<div className='container'>
			
			<div className='toggle-switch'>
				<input
					onClick={() => data.setBgColorChange((prev) => !prev)}
					type='checkbox'
					className='checkbox'
					name={label}
					id={label}
				/>
				<label className='label' htmlFor='label'></label>
				<span className='inner' />
				<span className='switch' />
			</div>
		</div>
	)
}
export default ToggleSwitch
