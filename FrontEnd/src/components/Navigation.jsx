import React from 'react';
import { NavLink } from 'react-router-dom';
import react from '../assets/react.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faChartLine,faQuestionCircle,faMessage} from '@fortawesome/free-solid-svg-icons';

const Navigation = () => {
    return (
        <div className='h-screen flex flex-col  w-64'>

            <div className='flex m-5 gap-2'>
                <img src={react} alt="react-logo" className="w-8  h-8" />
                <h1 className='text-xl font-bold'>QuarkBytes</h1>
            </div>

            <div className=' p-6'>
                <h1 className='text-3xl font-bold font-sans mb-6'>Hello Admin!</h1>
                <nav>
                    <ul>
                        <li className='mb-2'>
                            <NavLink
                                to='/admin'
                                className={({ isActive }) =>
                                    isActive ? 'block p-3 bg-green-100 text-green-500 rounded-md font-bold' : 'block p-3 rounded-md font-semibold hover:bg-gray-100 hover:font-semibold'}
                            >
                               <FontAwesomeIcon icon={faChartLine} className="mr-2 text-black" />
                                Dashboard
                            </NavLink>
                        </li>
                        <li className='mb-2'>
                            <NavLink to='/'
                                className={({ isActive }) =>
                                    isActive ? 'block p-3 bg-green-100 text-green-500 rounded-md font-bold' : 'block p-3 rounded-md font-semibold hover:bg-gray-100 hover:font-semibold'}
                            >
                                <FontAwesomeIcon icon={faQuestionCircle} className="mr-2 text-black" />
                                Questions
                            </NavLink>
                        </li>
                        <li className='mb-2'>
                            <NavLink to='/'
                                className={({ isActive }) =>
                                    isActive ? 'block p-3 bg-green-100 text-green-500 rounded-md font-bold' : 'block p-3 rounded-md font-semibold hover:bg-gray-100 hover:font-semibold'}
                            >
                                <FontAwesomeIcon icon={faMessage} className="mr-2 text-black"/>
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

