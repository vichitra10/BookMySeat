<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Seat;

class SeatsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Create 11 rows with 7 seats each (77 seats total)
        for ($row = 1; $row <= 11; $row++) {
            for ($seat = 1; $seat <= 7; $seat++) {
                Seat::create([
                    'row_number' => $row,
                    'seat_number' => $seat,
                ]);
            }
        }

        // Create the 12th row with 3 seats (to complete 80 seats)
        $lastRow = 12;
        for ($seat = 1; $seat <= 3; $seat++) {
            Seat::create([
                'row_number' => $lastRow,
                'seat_number' => $seat,
            ]);
        }
    }
}
