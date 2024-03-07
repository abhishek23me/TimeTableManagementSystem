import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net'; // Import DataTables CSS and JS

function FacultySearch() {
    const [facultyData, setFacultyData] = useState([]);

    useEffect(() => {
        fetchFacultyData();
    }, []);

    useEffect(() => {
        // Initialize DataTables when facultyData changes
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
                    {facultyData.map((users) => (
                        <tr key={users._id}>
                            <td>{users.username}</td>
                            <td>{users.password}</td>
                            <td>{users.name}</td>
                            <td>{users.designation}</td>
                            <td>{users.departmentName}</td>
                            <td>{users.schoolCenterName}</td>
                            <td>{users.email}</td>
                            <td>{users.cabinNo}</td>
                            <td>{users.photo}</td>
                            <td>
                                <button style={icons}>{updateIcon}</button>
                                <button style={icons}>{deleteIcon}</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FacultySearch;
