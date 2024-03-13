import React, { useState, useEffect } from 'react';

const SubjectSelect = () => {
  const [subject, setSubject] = useState('');
  const [subjectsData, setSubjectsData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [allSlots, setAllSlots] = useState([]);
  const [dropdowns, setDropdowns] = useState([]);
  const [okButtonDisabled, setOkButtonDisabled] = useState(false);

  const handleSubjectChange = (event) => {
    const selectedSubject = event.target.value;
    setSubject(selectedSubject);
    const credit = subjectsData.find((subj) => subj.coursetitle === selectedSubject)?.credit || 0;
    setSelectedSlots(new Array(credit - 1).fill(''));
    setDropdowns(new Array(credit - 1).fill(true));
  };

  const handleSlotChange = (index, event) => {
    const selectedSlot = allSlots.find(slot => slot.slotname === event.target.value);
    if (selectedSlot) {
      const updatedSelectedSlots = [...selectedSlots];
      updatedSelectedSlots[index] = {
        slotname: selectedSlot.slotname,
        slotday: selectedSlot.slotday,
        slottime: selectedSlot.slottime,
        slottype: selectedSlot.slottype // Add this line if needed
      };
      setSelectedSlots(updatedSelectedSlots);
    }
  };

  const handleOK = async (index) => {
    const selectedSlot = selectedSlots[index];
    if (selectedSlot && subject) {
      try {
        console.log("Selected Slot Name:", selectedSlot.slotname);
        console.log("Selected Slot Day:", selectedSlot.slotday);
        console.log("Selected Slot Time:", selectedSlot.slottime);

        // Find the subject by title
        const selectedSubject = subjectsData.find((subj) => subj.coursetitle === subject);
        if (!selectedSubject) {
          throw new Error('Selected subject not found');
        }

        // Create the updated subject object with the selected slot data
        let updatedSubject = { ...selectedSubject }; // Get the existing subject data

        if (index === 0) { // Update the first slot data
          updatedSubject.Fslotname = selectedSlot.slotname;
          updatedSubject.Fslotday = selectedSlot.slotday;
          updatedSubject.Fslottime = selectedSlot.slottime;
        } else if (index === 1) { // Update the second slot data
          updatedSubject.Sslotname = selectedSlot.slotname;
          updatedSubject.Sslotday = selectedSlot.slotday;
          updatedSubject.Sslottime = selectedSlot.slottime;
        } else if (index === 2) { // Update the third slot data
          updatedSubject.Tslotname = selectedSlot.slotname;
          updatedSubject.Tslotday = selectedSlot.slotday;
          updatedSubject.Tslottime = selectedSlot.slottime;
        }

        // Make the PUT request to update the subject in the database
        const response = await fetch(`/api/subject/updateslots/${selectedSubject._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedSubject),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to update subject data');
        }

        // Show an alert for successful update
        alert(`Slot ${selectedSlot.slotname} selected and updated in the database.`);

        // Update the dropdowns to disable the current and enable the next
        setDropdowns((prevDropdowns) => {
          const updatedDropdowns = [...prevDropdowns];
          updatedDropdowns[index] = false;
          updatedDropdowns[index + 1] = true;
          return updatedDropdowns;
        });

        // Disable the OK button in the last dropdown
        if (index === selectedSlots.length - 1) {
          setOkButtonDisabled(true);
        }

      } catch (error) {
        console.error('Error updating slot:', error);
        setError('Error updating slot. Please try again later.');
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Find the subject by title
      const selectedSubject = subjectsData.find((subj) => subj.coursetitle === subject);
      if (!selectedSubject) {
        throw new Error('Selected subject not found');
      }

      // Create the updated subject object with all the selected slot data
      let updatedSubject = { ...selectedSubject }; // Get the existing subject data
      updatedSubject.Fslotname = selectedSlots[0]?.slotname || 'empty';
      updatedSubject.Fslotday = selectedSlots[0]?.slotday || 'empty';
      updatedSubject.Fslottime = selectedSlots[0]?.slottime || 'empty';
      updatedSubject.Sslotname = selectedSlots[1]?.slotname || 'empty';
      updatedSubject.Sslotday = selectedSlots[1]?.slotday || 'empty';
      updatedSubject.Sslottime = selectedSlots[1]?.slottime || 'empty';
      updatedSubject.Tslotname = selectedSlots[2]?.slotname || 'empty';
      updatedSubject.Tslotday = selectedSlots[2]?.slotday || 'empty';
      updatedSubject.Tslottime = selectedSlots[2]?.slottime || 'empty';

      // Make the PUT request to update the subject in the database
      const subjectResponse = await fetch(`/api/subject/updateslots/${selectedSubject._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSubject),
      });

      const subjectData = await subjectResponse.json();

      if (!subjectResponse.ok) {
        throw new Error(subjectData.message || 'Failed to update subject data');
      }

      // Show an alert for successful subject update
      alert(`Slots selected and updated for the subject.`);

      setSelectedSlots([]);
      setSubject('');
      setDropdowns([]);
      setOkButtonDisabled(false);
      // document.location.reload(); 

      // Now, update the user with the selected subject ID
      const selectedSubjectId = selectedSubject._id;

      // Get the userId from localStorage
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found in localStorage');
      }

      // Fetch the user by ID to get current subject fields
      const userResponse = await fetch(`/api/auth/userbyid/${userId}`);
      const userData = await userResponse.json();

      if (!userResponse.ok) {
        throw new Error(userData.message || 'Failed to fetch user');
      }

      const currentUser = userData.user;

      // Update the subject fields based on availability
      if (!currentUser.subject1) {
        currentUser.subject1 = selectedSubjectId;
      } else if (!currentUser.subject2) {
        currentUser.subject2 = selectedSubjectId;
      } else if (!currentUser.subject3) {
        currentUser.subject3 = selectedSubjectId;
      } else {
        alert('User has already selected 3 subjects');
      }

      // Make a PUT request to update the User document with the new subject ID
      const userUpdateResponse = await fetch(`/api/auth/${userId}/subjects`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentUser),
      });

      const userUpdateData = await userUpdateResponse.json();

      if (!userUpdateResponse.ok) {
        throw new Error(userUpdateData.message || 'Failed to update user');
      }

      // Show an alert for successful user update
      alert(`Subject updated successfully for the user!`);

    } catch (error) {
      console.error('Error updating slots and user subject:', error);
      setError('Error updating slots and user subject. Please try again later.');
    }
  };

  useEffect(() => {
    const fetchSubjectsData = async () => {
      try {
        const response = await fetch('/api/subject/allSubjects');
        if (!response.ok) {
          throw new Error('Failed to fetch subjects');
        }
        const data = await response.json();
        setSubjectsData(data.subjects);
      } catch (error) {
        console.error('Error fetching subjects data:', error);
        setError('Error fetching subjects data. Please try again later.');
      }
    };

    fetchSubjectsData();
  }, []);

  useEffect(() => {
    const fetchAllSlots = async () => {
      try {
        const response = await fetch('/api/slot/allSlots');
        if (!response.ok) {
          throw new Error('Failed to fetch slots');
        }
        const data = await response.json();
        setAllSlots(data.slots);
      } catch (error) {
        console.error('Error fetching slots data:', error);
        setError('Error fetching slots data. Please try again later.');
      }
    };

    fetchAllSlots();
  }, []);

  return (
    <div
      style={{
        background: '#f0f0f0',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        padding: '20px',
        marginTop: '24px',
        width: '700px',
        margin: '0 auto',
      }}
    >
      <div style={styles.title}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Time Table</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <i style={styles.icons} className="fa-solid fa-book"></i>
          <select
            value={subject}
            onChange={handleSubjectChange}
            style={styles.input}
          >
            <option value="">Select Subject</option>
            {subjectsData.map((subject) => (
              <option
                key={subject._id}
                value={subject.coursetitle}
              >{`${subject.coursetitle} - Course Code: ${subject.coursecode} - Credits: ${subject.credit}`}</option>
            ))}
          </select>
        </div>

        {selectedSlots.map((slot, index) => (
          <div key={index} style={{ marginTop: '20px' }}>
            <i style={styles.icons} className="fa-solid fa-calendar-days"></i>
            <select
              value={slot.slotname || ''}
              onChange={(event) => handleSlotChange(index, event)}
              style={styles.input}
              disabled={!dropdowns[index]}
            >
              <option value="" disabled={!dropdowns[index]}>Select Slot ,Day & Time</option>
              {allSlots.map((slot) => (
                <option key={slot._id} value={slot.slotname}>{`${slot.slotname} - Day: ${slot.slotday} - Time: ${slot.slottime}`}</option>
              ))}
            </select>
            {index !== selectedSlots.length - 1 && (
              <button type="button" onClick={() => handleOK(index)} style={styles.okButton}>
                OK
              </button>
            )}
            {index === selectedSlots.length - 1 && (
              <button type="button" onClick={() => handleOK(index)} style={styles.okButton} disabled={okButtonDisabled}>
                OK
              </button>
            )}
          </div>
        ))}

        <button type="submit" style={styles.sub}>
          Submit
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

const styles = {
  title: {
    height: '80px',
    background: '#127faa',
    borderRadius: '5px 5px 0 0',
    color: '#fff',
    fontSize: '35px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icons: {
    position: 'absolute',
    width: '47px',
    height: '6%',
    color: '#fff',
    marginTop: '40px',
    fontSize: '24px',
    background: '#127faa',
    border: '1px solid #1ba2b4',
    borderRadius: '5px 0 0 5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: '43px',
    width: '100%',
    outline: 'none',
    paddingLeft: '60px',
    borderRadius: '5px',
    border: '1px solid lightgrey',
    fontSize: '20px',
    marginTop: '10px',
    transition: 'all 0.3s ease',
    color: 'black',
  },
  okButton: {
    height: '43px',
    marginTop: '10px',
    background: '#127faa',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  sub: {
    background: '#127faa',
    borderRadius: '5px',
    marginLeft: '260px',
    marginTop: '40px',
    color: 'white',
    width: '150px',
    fontSize: '19px',
    border: '3px solid #1ba2b4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default SubjectSelect;
