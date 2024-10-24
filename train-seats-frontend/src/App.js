import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Ensure you have styles for seat colors

const App = () => {
    const totalSeats = 80; // Total number of seats in the coach
    const seatsPerRow = 7; // 11 rows with 7 seats, and the last row with 3 seats

    const [seats, setSeats] = useState([]); // State to store seat data
    const [loading, setLoading] = useState(true);
    const [numSeats, setNumSeats] = useState(''); // Input for seat reservation

    // Fetch seat data from the backend when the component mounts
    useEffect(() => {
        fetchSeats();
    }, []);

    const fetchSeats = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/seats');
            console.log(response.data); // Log the response to check its structure
            setSeats(response.data); // Store the nested object directly
            setLoading(false);
        } catch (error) {
            console.error('Error fetching seats:', error);
            setLoading(false);
        }
    };

    // Handle seat booking request
    const handleBookSeats = async () => {
        const seatsToBook = parseInt(numSeats, 10);
    
        if (isNaN(seatsToBook) || seatsToBook <= 0 || seatsToBook > 7) {
            alert('Please enter a valid number of seats (1 to 7).');
            return;
        }
    
        try {
            const response = await axios.post(
                'http://localhost:8000/api/seats/book',
                { numSeats: seatsToBook }, // Still sending an object
                {
                    headers: {
                        'Content-Type': 'application/json', // Ensure JSON format
                    },
                }
            );
           // alert(`Seats booked: ${response.data.join(', ')}`);
           alert("Seats Booked");
            fetchSeats(); // Refresh seat data after booking
        } catch (error) {
            console.error('Error booking seats:', error);
            alert('Error booking seats. Please try again.');
        }
    };
    
  

    // Render individual seat with its status (available or booked)
    const renderSeat = (seat) => {
        const isBooked = seat.is_booked === 1; // Check if the seat is booked

        return (
            <div
                key={`seat-${seat.id}`}
                className={`seat ${isBooked ? 'booked' : 'available'}`}
            >
                {`R${seat.row_number}S${seat.seat_number}`} {/* Display row and seat number */}
            </div>
        );
    };

    // Render all seats in the appropriate layout
    const renderSeats = () => {
        const rows = [];

        // Iterate over the nested object and render seats
        for (const row in seats) {
            if (seats.hasOwnProperty(row)) {
                rows.push(
                    <div key={`row-${row}`} className="seat-row">
                        {seats[row].map((seat) => renderSeat(seat))}
                    </div>
                );
            }
        }

        return rows;
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="App">
            <h1>Train Seat Reservation System</h1>

            <div className="reservation-form">
                <input className="seats-input"
                    type="number"
                    placeholder="Enter number of seats (1 to 7)"
                    value={numSeats}
                    onChange={(e) => setNumSeats(e.target.value)}
                />
                <button onClick={handleBookSeats}  className="book-button" >Book Seats</button>
            </div>

            <div className="seats-container">{renderSeats()}</div>
        </div>
    );
};

export default App;
