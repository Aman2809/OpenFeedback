import React from 'react';
import { NavLink } from 'react-router-dom';
import react from '../assets/react.svg'

const Navigation = () => {
    return (
        <div className='h-screen flex flex-col bg-blue-50 w-64'>

            <div className='flex m-5 gap-2'>
                <img src={react} alt="react-logo" className="w-8  h-8" />
                <h1 className='text-xl font-bold'>QuarkBytes</h1>
            </div>

            <div className=' p-6'>
                <h1 className='text-3xl font-bold font-sans mb-6'>Hello Admin !</h1>
                <nav>
                    <ul>
                        <li className='mb-2'>
                            <NavLink
                                to='/admin'
                                className={({ isActive }) =>
                                    isActive ? 'block p-3 bg-gray-700 rounded-md' : 'block p-3 rounded-md hover:bg-gray-700'}
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        <li className='mb-2'>
                            <NavLink to='/admin'
                                className={({ isActive }) =>
                                    isActive ? 'block p-3 bg-gray-700 rounded-md' : 'block p-3 rounded-md hover:bg-gray-700'}
                            >
                                Questions
                            </NavLink>
                        </li>
                        <li className='mb-2'>
                            <NavLink to='/admin'
                                className={({ isActive }) =>
                                    isActive ? 'block p-3 bg-gray-700 rounded-md' : 'block p-3 rounded-md hover:bg-gray-700'}
                            >
                                Feedbacks
                            </NavLink>
                        </li>

                    </ul>
                </nav>
            </div>

            <div></div>

        </div>
    );
};

export default Navigation;

