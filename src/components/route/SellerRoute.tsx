import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export const AdminRoute = () => {
    const {userInfo} = useSelector((state: RootState) => state.auth);

    return userInfo && userInfo.isAdmin ? (<Outlet />): (<Navigate to='/login' />)
}
