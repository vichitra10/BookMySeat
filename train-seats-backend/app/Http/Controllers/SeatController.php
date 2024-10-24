<?php

namespace App\Http\Controllers;

use App\Models\Seat;
use Illuminate\Http\Request;

class SeatController extends Controller
{
    public function index()
    {
        return Seat::all()->groupBy('row_number');
    }

    public function bookSeats(Request $request)
    {

        // $numSeats = $request->input('num_seats');
        $numSeats = $request->json('numSeats');

        
       
        
        if ($numSeats < 1 || $numSeats > 7) {
            return response()->json(['error' => 'You can only book 1 to 7 seats.'], 400);
        }

        $availableRows = Seat::where('is_booked', false)->get()->groupBy('row_number');
        $bookedSeats = [];

        // Priority 1: Try to book seats in one row
        foreach ($availableRows as $row) {
            if ($row->count() >= $numSeats) {
                $bookedSeats = $row->take($numSeats);
                $this->markSeatsAsBooked($bookedSeats);
                return response()->json($bookedSeats);
            }
        }

        // Priority 2: Book across multiple rows if needed
        $allAvailableSeats = Seat::where('is_booked', false)->take($numSeats)->get();

        if ($allAvailableSeats->count() < $numSeats) {
            return response()->json(['error' => 'Not enough seats available.'], 400);
        }

        $this->markSeatsAsBooked($allAvailableSeats);
        return response()->json($allAvailableSeats);
    }

    private function markSeatsAsBooked($seats)
    {
        foreach ($seats as $seat) {
            $seat->update(['is_booked' => true]);
        }
    }
}

