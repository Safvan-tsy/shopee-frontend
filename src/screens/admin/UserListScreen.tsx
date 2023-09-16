import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import Message from '../../components/ui/Message';
import Loader from '../../components/ui/Loader';
import { useGetAllUsersQuery, useDeleteUserMutation } from '../../slices/usersApiSlice';
import { RootState } from '../../store';

const UserListScreen = () => {
    const token = useSelector((state:RootState) => state.auth.token);
    const { data: res, refetch, isLoading, error } = useGetAllUsersQuery(token)
    const [deleteUser, {isLoading:loadingDelete}] = useDeleteUserMutation()

    const deleteHandler = async(userId:string) => {
        if(window.confirm('Are you sure')){
            try {
                await deleteUser({userId,token})
                toast.success('Deleted');
                refetch();
            } catch (error) {
                toast.error('error?.data?.message || error.error')
            }
        }
    }

    return <>
        <h1>Orders</h1>
        {loadingDelete && <Loader />}
        {isLoading ? (
            <Loader />
        ) : error ? (
            <Message variant='danger'>{error}</Message>
        ) : (
            <Table striped hover responsive className='table-sm' >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {res.users.map((user) => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td><a href={`mailto:${user.email}`}>{user.email}</a> </td>
                            <td>
                                {user.isAdmin ? (
                                    <FaCheck style={{ color: 'green' }} />
                                ) : (
                                    <FaTimes style={{ color: 'red' }} />
                                )}
                            </td>
                            <td>
                                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                    <Button className='btn-sm'><FaEdit /></Button>
                                </LinkContainer>
                                <Button variant='danger' className='btn-sm'
                                    onClick={() => deleteHandler(user._id)}>
                                    <FaTrash style={{ color: 'white' }} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
    </>
}

export default UserListScreen;