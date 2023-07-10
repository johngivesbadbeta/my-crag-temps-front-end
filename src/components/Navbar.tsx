import { useState } from "react";
import { Link } from 'react-router-dom';
import Button from "./Button";
import { useAuth0 } from '@auth0/auth0-react';

function Navbar() {

  const [ isVisible, setIsVisible ] = useState(false);
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const signOutOnClick = () => {
    logout();
  };

  const signInOnClick = () => {
    loginWithRedirect();
  };

  const dropDown = () => {
    setIsVisible(!isVisible)
  };

  const clicked = () => {
    setIsVisible(false)
  };

  return (
    <nav className='flex items-center justify-between flex-wrap bg-blue-500 p-6'>
        <div className='flex items-center flex-shrink-0 text-wuite mr-6'>
            <Link to='/' className='font-semibold ml-2 text-yellow-400 text-xl tracking-tight'><img src="/images/logo.png" className='ml-2' alt="" /></Link>
        </div>
        <div className='block'>
            <button onClick={dropDown} className='flex items-center px-3 py-2 text-blue-200 border rounded border-blue-400 hover:text-white hover:border-white'>
                <i className='fa-solid fa-bars'></i>
            </button>
        </div>
        { isVisible ? (
            <div className='w-full block flex-grow items-center'>
                <div className='text-sm lg:flex-grow'>
                    <Button className='p-3 m-5 bg-blue-400 rounded justify-center'>
                        <div>
                            <Link to='/' onClick={ clicked } className='flex place-items-center mt-4 lg:inline-block lg:mt-0
                            text-blue-200 hover:text-white mr-4'>
                                Home
                            </Link>
                        </div>
                    </Button>
                    <Button className='p-3 m-5 bg-blue-400 rounded justify-center'>
                        <div>
                            <Link to='/contact' onClick={ clicked } className='flex place-items-center mt-4 lg:inline-block lg:mt-0
                            text-blue-200 hover:text-white mr-4'>
                                Contact
                            </Link>
                        </div>
                    </Button>
                    <Button className='p-3 m-5 bg-blue-400 rounded justify-center'>
                        <div>
                            <Link to='/dashboard' onClick={ clicked } className='flex place-items-center mt-4 lg:inline-block lg:mt-0
                            text-blue-200 hover:text-white mr-4'>
                                Dashboard
                            </Link>
                        </div>
                    </Button>
                    {
                        !isAuthenticated ?
                        <Button className='p-3 m-5 bg-blue-400 rounded justify-center'>
                            <div>
                                <Link to='/' onClick={ signInOnClick } className='flex place-items-center mt-4 lg:inline-block lg:mt-0
                                text-blue-200 hover:text-white mr-4'>
                                    Login
                                </Link>
                            </div>
                        </Button>
                        :
                        <Button className='p-3 m-5 bg-blue-400 rounded justify-center'>
                            <div>
                                <Link to='/' onClick={ signOutOnClick } className='flex place-items-center mt-4 lg:inline-block lg:mt-0
                                text-blue-200 hover:text-white mr-4'>
                                    Logout
                                </Link>
                            </div>
                        </Button>
                    }
                </div>
            </div>
        ) : (
        <></>
        )}
    </nav>
  )
}

export default Navbar