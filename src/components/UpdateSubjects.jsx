import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateSubjects() {
    const [subjectDetails, setSubjectDetails] = useState({
        category: '',
        coursetitle: '',
        coursecode: '',
        ntr: '',
        version: '',
        lecture: '',
        practical: '',
        tutorial: '',
        project: '',
        credit: '',
        coursevenue: '',
        coursetype: '',
        courseoption: '',
    });

    const [inputFocus, setInputFocus] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchSubjectData();
    }, []);

    const fetchSubjectData = async () => {
        try {
            const response = await fetch(`/api/subject/subjects/${id}`);
            const data = await response.json();
            if (response.ok) {
                setSubjectDetails({
                    category: data.subject.category,
                    coursetitle: data.subject.coursetitle,
                    coursecode: data.subject.coursecode,
                    ntr: data.subject.ntr,
                    version: data.subject.version,
                    lecture: data.subject.lecture,
                    practical: data.subject.practical,
                    tutorial: data.subject.tutorial,
                    project: data.subject.project,
                    credit: data.subject.credit,
                    coursevenue: data.subject.coursevenue,
                    coursetype: data.subject.coursetype,
                    courseoption: data.subject.courseoption,
                });
            } else {
                console.error('Error fetching subject data:', data.error);
            }
        } catch (error) {
            console.error('Error fetching subject data:', error);
        }
    };

    const onChange = (e) => {
        setSubjectDetails({ ...subjectDetails, [e.target.name]: e.target.value });
    };

    const handleCourseVenueChange = (e) => {
        const { value } = e.target;
        setSubjectDetails({
            ...subjectDetails,
            coursevenue: value.toUpperCase(), // Convert to uppercase
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/subject/updatesubject/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(subjectDetails),
            });

            const json = await response.json();
            console.log(json);

            if (response.ok) {
                // Redirect to subjects search page if subject update is successful
                navigate('/subjectssearch');
            } else {
                console.error(json.error);
                // Handle error scenarios here, such as displaying an error message to the user
            }
        } catch (error) {
            console.error('Error updating subject:', error);
            // Handle network errors or other exceptions here
        }
    };

    const container = {
        maxWidth: '600px',
        padding: '0 20px',
        margin: '40px auto',
    };

    const wrapper = {
        width: '100%',
        background: '#fff',
        borderRadius: '5px',
        boxShadow: '0px 4px 10px 1px rgba(0, 0, 0, 1)',
    };

    const title = {
        height: '90px',
        background: '#127faa',
        borderRadius: '5px 5px 0 0',
        color: '#fff',
        fontSize: '35px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const forms = {
        padding: '35px 85px 35px 35px',
    };

    const row = {
        height: '45px',
        marginBottom: '15px',
        position: 'relative',
    };

    const input = {
        height: '100%',
        width: '100%',
        outline: 'none',
        paddingLeft: '60px',
        borderRadius: '5px',
        border: '1px solid lightgrey',
        fontSize: '20px',
        transition: 'all 0.3s ease',
        borderColor: inputFocus ? '#21b6ca' : 'lightgrey',
        boxShadow: inputFocus ? 'inset 0px 0px 2px 2px rgba(26, 188, 156, 0.25)' : 'none',
        '::placeholder': {
            color: '#999',
        },
    };

    const icons = {
        position: 'absolute',
        width: '47px',
        height: '100%',
        color: '#fff',
        fontSize: '18px',
        background: '#127faa',
        border: '1px solid #1ba2b4',
        borderRadius: '5px 0 0 5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const button = {
        color: '#fff',
        fontWeight: '600',
        paddingLeft: '0px',
        background: '#16a085',
        border: '1px solid green',
        cursor: 'pointer',
        textAlign: 'center',
        width: '439px',
        fontSize: '25px',
        height: '49px',
        borderRadius: '2px',
        boxShadow: '1px 1px 3px 3px rgb(0 0 0/15%)',
    };

    return (
        <div style={container}>
            <div style={wrapper}>
                <div style={title}>
                    <span>Edit Subject</span>
                </div>
                <form style={forms} onSubmit={handleSubmit}>
                    <div style={row}>
                        <i className="fa-solid fa-list" style={icons}></i>
                        <input
                            type="text"
                            placeholder="Category Name"
                            name="category"
                            required
                            style={input}
                            value={subjectDetails.category}
                            onChange={onChange}
                            onFocus={() => setInputFocus(true)}
                            onBlur={() => setInputFocus(false)}
                        />
                    </div>
                    <div style={row}>
                        <i className="fas fa-graduation-cap" style={icons}></i>
                        <input
                            type="text"
                            placeholder="Course Title"
                            name="coursetitle"
                            required
                            style={input}
                            value={subjectDetails.coursetitle}
                            onChange={onChange}
                            onFocus={() => setInputFocus(true)}
                            onBlur={() => setInputFocus(false)}
                        />
                    </div>
                    <div style={row}>
                        <i className="fas fa-id-badge" style={icons}></i>
                        <input
                            type="text"
                            placeholder="Course Code"
                            name="coursecode"
                            required
                            style={input}
                            value={subjectDetails.coursecode}
                            onChange={onChange}
                            onFocus={() => setInputFocus(true)}
                            onBlur={() => setInputFocus(false)}
                        />
                    </div>
                    <div style={row}>
                        <i className="fas fa-hourglass-half" style={icons}></i>
                        <input
                            type="text"
                            placeholder="NTR"
                            name="ntr"
                            required
                            style={input}
                            value={subjectDetails.ntr}
                            onChange={onChange}
                            onFocus={() => setInputFocus(true)}
                            onBlur={() => setInputFocus(false)}
                        />
                    </div>
                    <div style={row}>
                        <i className="fas fa-code-branch" style={icons}></i>
                        <input
                            type="text"
                            placeholder="Version"
                            name="version"
                            required
                            style={input}
                            value={subjectDetails.version}
                            onChange={onChange}
                            onFocus={() => setInputFocus(true)}
                            onBlur={() => setInputFocus(false)}
                        />
                    </div>
                    <div style={row}>
                        <i className="fas fa-book-reader" style={icons}></i>
                        <input
                            type="text"
                            placeholder="Lecture"
                            name="lecture"
                            required
                            style={input}
                            value={subjectDetails.lecture}
                            onChange={onChange}
                            onFocus={() => setInputFocus(true)}
                            onBlur={() => setInputFocus(false)}
                        />
                    </div>
                    <div style={row}>
                        <i className="fas fa-flask" style={icons}></i>
                        <input
                            type="text"
                            placeholder="Practical"
                            name="practical"
                            required
                            style={input}
                            value={subjectDetails.practical}
                            onChange={onChange}
                            onFocus={() => setInputFocus(true)}
                            onBlur={() => setInputFocus(false)}
                        />
                    </div>
                    <div style={row}>
                        <i className="fas fa-clipboard-list" style={icons}></i>
                        <input
                            type="text"
                            placeholder="Tutorial"
                            name="tutorial"
                            required
                            style={input}
                            value={subjectDetails.tutorial}
                            onChange={onChange}
                            onFocus={() => setInputFocus(true)}
                            onBlur={() => setInputFocus(false)}
                        />
                    </div>
                    <div style={row}>
                        <i className="fas fa-tasks" style={icons}></i>
                        <input
                            type="text"
                            placeholder="Project"
                            name="project"
                            required
                            style={input}
                            value={subjectDetails.project}
                            onChange={onChange}
                            onFocus={() => setInputFocus(true)}
                            onBlur={() => setInputFocus(false)}
                        />
                    </div>
                    <div style={row}>
                        <i className="fas fa-award" style={icons}></i>
                        <input
                            type="text"
                            placeholder="Credit"
                            name="credit"
                            required
                            style={input}
                            value={subjectDetails.credit}
                            onChange={onChange}
                            onFocus={() => setInputFocus(true)}
                            onBlur={() => setInputFocus(false)}
                        />
                    </div>
                    <div style={row}>
                        <i className="fas fa-award" style={icons}></i>
                        <input
                            type="text"
                            placeholder="Course Venue"
                            name="coursevenue"
                            required
                            style={input}
                            value={subjectDetails.coursevenue}
                            onChange={handleCourseVenueChange} // Handle change for Course Venue
                            onFocus={() => setInputFocus(true)}
                            onBlur={() => setInputFocus(false)}
                        />
                    </div>
                    <div style={row}>
                        <i className="fas fa-chalkboard-teacher" style={icons}></i>
                        <select
                            name="coursetype"
                            required
                            style={input}
                            value={subjectDetails.coursetype}
                            onChange={onChange}
                            onFocus={() => setInputFocus(true)}
                            onBlur={() => setInputFocus(false)}
                        >
                            <option value="">Course Type</option>
                            <option value="Lecture & Tutorial, practical hour only">Lecture & Tutorial, practical hour only</option>
                            <option value="Lecture & Practical hour only">Lecture & Practical hour only</option>
                            <option value="Lecture & Tutorial hour only">Lecture & Tutorial hour only</option>
                            <option value="Project only">Project only</option>
                        </select>
                    </div>
                    <div style={row}>
                        <i className="fas fa-handshake" style={icons}></i>
                        <select
                            name="courseoption"
                            required
                            style={input}
                            value={subjectDetails.courseoption}
                            onChange={onChange}
                            onFocus={() => setInputFocus(true)}
                            onBlur={() => setInputFocus(false)}
                        >
                            <option value="">Course Option</option>
                            <option value="Regular">Regular</option>
                            <option value="Not Regular">Not Regular</option>
                        </select>
                    </div>
                    <input type="submit" value="Update" style={button} />
                </form>
            </div>
        </div>
    );
}

export default UpdateSubjects;
