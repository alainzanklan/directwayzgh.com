// 2. API VÉRIFICATION DISPONIBILITÉ - pages/api/bookings/availability.js
import connectDB from '@/config/database';
import Booking from '../../../../models/Booking';

export async function POST(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();
    
    const { proId, date } = req.body;
    
    if (!proId || !date) {
      return res.status(400).json({ message: 'ProId and date are required' });
    }

    // Récupérer les réservations existantes pour cette date
    const existingBookings = await Booking.find({
      proId,
      'appointment.date': date,
      status: { $in: ['pending', 'confirmed'] },
      'payment.status': { $in: ['paid', 'pending'] }
    }).select('appointment.time');

    // Créneaux par défaut
    const allSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
    
    // Retirer les créneaux déjà réservés
    const bookedTimes = existingBookings.map(booking => booking.appointment.time);
    const availableSlots = allSlots.filter(slot => !bookedTimes.includes(slot));

    res.status(200).json({ availableSlots });
    
  } catch (error) {
    console.error('Availability check error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

