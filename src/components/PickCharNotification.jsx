import React from 'react';
import '../styles/PickChar.css'

export default function Notification({ message }) {
	return (
		<div className='mt-6 text-white px-4 py-2 rounded-md shadow-lg flex items-center bg-red-500 transition-opacity duration-300'>
			<img src='/images/symbol/alert.png' className='w-8 h-8 mr-2' />
            {message}
		</div>
	);
}
