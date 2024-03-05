import React, { useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net'; // Import DataTables CSS and JS

function FacultySearch() {
    useEffect(() => {
        // Initialize DataTables when the component mounts
        $('#example').DataTable();

        // Destroy DataTables when the component unmounts
        return () => {
            $('#example').DataTable().destroy();
        };
    }, []); // Empty dependency array ensures useEffect runs only once


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


    }

    const thro1 = {
        backgroundColor: "rgb(49 98 176)",
        color: "white",
        fontSize: "20px"

    }

    const icons = {

        width: '47px',
        height: '100%',
        color: '#fff',
        fontSize: '20px',
        margin: "2px",
        background: '#127faa',
        border: '1px solid #1ba2b4',
        borderRadius: '4px',

    }


    const updateIcon = <i className="fas fa-pencil-alt"></i>;
    const deleteIcon = <i className="fas fa-trash-alt"></i>;

    return (
        <div style={body}>
            <table id='example' className='display' >
                <thead>
                    <tr style={thro1} >
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


                    <tr>
                        <td>User 1</td>
                        <td></td>
                        <td>Faculty 1</td>
                        <td>Teacher</td>
                        <td>Department A</td>
                        <td>School X</td>
                        <td>user1@example.com</td>
                        <td>Cabin 101</td>
                        <td>Photo 1</td>
                        <td>
                            <button style={icons}>{updateIcon}</button>
                            <button style={icons}>{deleteIcon}</button>
                        </td>
                    </tr>


                    <tr>
                        <td>User 1</td>
                        <td></td>
                        <td>Faculty 1</td>
                        <td>Teacher</td>
                        <td>Department A</td>
                        <td>School X</td>
                        <td>user1@example.com</td>
                        <td>Cabin 101</td>
                        <td>Photo 1</td>
                        <td>
                            <button style={icons}>{updateIcon}</button>
                            <button style={icons}>{deleteIcon}</button>
                        </td>
                    </tr>
                    <tr>
                        <td>User 1</td>
                        <td></td>
                        <td>Faculty 1</td>
                        <td>Teacher</td>
                        <td>Department A</td>
                        <td>School X</td>
                        <td>user1@example.com</td>
                        <td>Cabin 101</td>
                        <td>Photo 1</td>
                        <td>
                            <button style={icons}>{updateIcon}</button>
                            <button style={icons}>{deleteIcon}</button>
                        </td>
                    </tr>
                    <tr>
                        <td>User 1</td>
                        <td></td>
                        <td>Faculty 1</td>
                        <td>Teacher</td>
                        <td>Department A</td>
                        <td>School X</td>
                        <td>user1@example.com</td>
                        <td>Cabin 101</td>
                        <td>Photo 1</td>
                        <td>
                            <button style={icons}>{updateIcon}</button>
                            <button style={icons}>{deleteIcon}</button>
                        </td>
                    </tr>
                    <tr>
                        <td>aaaUser 1</td>
                        <td></td>
                        <td>Faculty 1</td>
                        <td>Teacher</td>
                        <td>Department A</td>
                        <td>School X</td>
                        <td>user1@example.com</td>
                        <td>Cabin 101</td>
                        <td>Photo 1</td>
                        <td>
                            <button style={icons}>{updateIcon}</button>
                            <button style={icons}>{deleteIcon}</button>
                        </td>
                    </tr>
                    <tr>
                        <td>aaaUser 1</td>
                        <td></td>
                        <td>Faculty 1</td>
                        <td>Teacher</td>
                        <td>Department A</td>
                        <td>School X</td>
                        <td>user1@example.com</td>
                        <td>Cabin 101</td>
                        <td>Photo 1</td>
                        <td>
                            <button style={icons}>{updateIcon}</button>
                            <button style={icons}>{deleteIcon}</button>
                        </td>
                    </tr>
                    <tr>
                        <td>aaaUser 7</td>
                        <td></td>
                        <td>Faculty 1</td>
                        <td>Teacher</td>
                        <td>Department A</td>
                        <td>School X</td>
                        <td>user1@example.com</td>
                        <td>Cabin 101</td>
                        <td>Photo 1</td>
                        <td>
                            <button style={icons}>{updateIcon}</button>
                            <button style={icons}>{deleteIcon}</button>
                        </td>
                    </tr>
                    <tr>
                        <td>User 6</td>
                        <td></td>
                        <td>Faculty 1</td>
                        <td>Teacher</td>
                        <td>Department A</td>
                        <td>School X</td>
                        <td>user1@example.com</td>
                        <td>Cabin 101</td>
                        <td>Photo 1</td>
                        <td>
                            <button style={icons}>{updateIcon}</button>
                            <button style={icons}>{deleteIcon}</button>
                        </td>
                    </tr>
                    <tr>
                        <td>User 5</td>
                        <td></td>
                        <td>Faculty 1</td>
                        <td>Teacher</td>
                        <td>Department A</td>
                        <td>School X</td>
                        <td>user1@example.com</td>
                        <td>Cabin 101</td>
                        <td>Photo 1</td>
                        <td>
                            <button style={icons}>{updateIcon}</button>
                            <button style={icons}>{deleteIcon}</button>
                        </td>
                    </tr>
                    <tr>
                        <td>User 3</td>
                        <td></td>
                        <td>Faculty 1</td>
                        <td>Teacher</td>
                        <td>Department A</td>
                        <td>School X</td>
                        <td>user1@example.com</td>
                        <td>Cabin 101</td>
                        <td>Photo 1</td>
                        <td>
                            <button style={icons}>{updateIcon}</button>
                            <button style={icons}>{deleteIcon}</button>
                        </td>
                    </tr>
                    <tr>
                        <td>User 3</td>
                        <td></td>
                        <td>Faculty 1</td>
                        <td>Teacher</td>
                        <td>Department A</td>
                        <td>School X</td>
                        <td>user1@example.com</td>
                        <td>Cabin 101</td>
                        <td>Photo 1</td>
                        <td>
                            <button style={icons}>{updateIcon}</button>
                            <button style={icons}>{deleteIcon}</button>
                        </td>
                    </tr>


                    {/* Add more rows as needed */}
                </tbody>
            </table>
        </div>
    );
}

export default FacultySearch;