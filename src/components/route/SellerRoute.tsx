import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export const SellerRoute = () => {
    const { userInfo } = useSelector((state: RootState) => state.auth);

    return userInfo && userInfo.isSeller ? (<Outlet />) : (<Navigate to='/login' />)
}
