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
    const selectedSlot = event.target.value;
    const updatedSelectedSlots = [...selectedSlots];
    updatedSelectedSlots[index] = selectedSlot;
    setSelectedSlots(updatedSelectedSlots);
  };

  const handleOK = async (index) => {
    const selectedSlot = selectedSlots[index];
    if (selectedSlot) {
      try {
        // Make the selected slot unavailable in other dropdowns
        const updatedAllSlots = allSlots.filter((slot) => slot.slotname !== selectedSlot);
        setAllSlots(updatedAllSlots);

        // Set the selected slot's selection status to 'YES'
        const updatedSelectedSlots = [...selectedSlots];
        updatedSelectedSlots[index] = 'YES';
        setSelectedSlots(updatedSelectedSlots);

        // Disable the current dropdown
        setDropdowns((prevDropdowns) => {
          const updatedDropdowns = [...prevDropdowns];
          updatedDropdowns[index] = false;
          return updatedDropdowns;
        });

        // Update the slotselection to 'YES' in the schema
        await fetch(`/api/slot/selectSlot/${selectedSlot}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slotselection: 'YES' }),
        });

        // Show an alert for slot selected
        alert(`Slot ${selectedSlot} selected`);

        // Make the next dropdown visible
        setDropdowns((prevDropdowns) => {
          const updatedDropdowns = [...prevDropdowns];
          updatedDropdowns[index + 1] = true;
          return updatedDropdowns;
        });

        // Disable the OK button in the last dropdown
        if (index === selectedSlots.length - 1) {
          setOkButtonDisabled(true);
        }
      } catch (error) {
        console.error('Error selecting slot:', error);
        setError('Error selecting slot. Please try again later.');
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted:', { subject, selectedSlots });
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
          <div key={index} style={{ display: dropdowns[index] ? 'block' : 'none', marginTop: '20px' }}>
            <i style={styles.icons} className="fa-solid fa-calendar-days"></i>
            <select
              value={slot}
              onChange={(event) => handleSlotChange(index, event)}
              style={styles.input}
              disabled={!dropdowns[index]}
            >
              <option value="">Select Slot ,Day & Time</option>
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
