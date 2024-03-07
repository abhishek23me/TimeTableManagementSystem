import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';

function FacultySearch() {
    const [facultyData, setFacultyData] = useState([]);

    useEffect(() => {
        fetchFacultyData();
    }, []);

    useEffect(() => {
        if (facultyData.length > 0) {
            $('#example').DataTable();
        }
        
        return () => {
            $('#example').DataTable().destroy();
        };
    }, [facultyData]);

    const fetchFacultyData = async () => {
        try {
            const response = await fetch('/api/auth/all');
            const data = await response.json();
            setFacultyData(data.users);
        } catch (error) {
            console.error('Error fetching faculty data:', error);
        }
    };

    const body = {
        width: "94%",
        margin: "25px",
        marginRight: "3px",
        borderRadius: "5px ",
        paddingLeft: "15px",
        paddingBottom: "5px",
        paddingRight: "15px",
        fontSize: "15px",
        backgroundColor: "white",
    };

    const thro1 = {
        backgroundColor: "rgb(49 98 176)",
        color: "white",
        fontSize: "20px"
    };

    const icons = {
        width: '47px',
        height: '100%',
        color: '#fff',
        fontSize: '20px',
        margin: "2px",
        background: '#127faa',
        border: '1px solid #1ba2b4',
        borderRadius: '4px',
    };

    const updateIcon = <i className="fas fa-pencil-alt"></i>;
    const deleteIcon = <i className="fas fa-trash-alt"></i>;

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/auth/users/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                // Remove the deleted user from the state
                setFacultyData(facultyData.filter(user => user._id !== id));
                
                // Fetch the updated data after deletion
                fetchFacultyData();
    
                // Optionally, you can also show a success message or toast
                console.log('User deleted successfully');
    
                // Refresh the page
                window.location.reload();
            } else {
                console.error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
    

    const handleUpdate = (id) => {
        // Add logic for updating user
        console.log(`Update user with ID: ${id}`);
    };

    return (
        <div style={body}>
            <table id='example' className='display'>
                <thead>
                    <tr style={thro1}>
                        <th>User Name</th>
                        <th>Password</th>
                        <th>Name of Faculty</th>
                        <th>Designation</th>
                        <th>Name of Department</th>
                        <th>School/Center Name</th>
                        <th>Email ID</th>
                        <th>Cabin Number</th>
                        <th>Photo</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {facultyData.map((user) => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>{user.name}</td>
                            <td>{user.designation}</td>
                            <td>{user.departmentName}</td>
                            <td>{user.schoolCenterName}</td>
                            <td>{user.email}</td>
                            <td>{user.cabinNo}</td>
                            <td>{user.photo}</td>
                            <td>
                                <button style={icons} onClick={() => handleUpdate(user._id)}>
                                    {updateIcon}
                                </button>
                                <button style={icons} onClick={() => handleDelete(user._id)}>
                                    {deleteIcon}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FacultySearch;
