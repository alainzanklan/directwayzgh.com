// 3. API CRÉATION RÉSERVATION - pages/api/bookings/create.js
import connectDB from '@/config/database';
import Booking from '../../../../models/Booking';

export async function POST (req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();
    
    const { proId, date, time, client, amount, currency = 'GHS' } = req.body;

    // Vérifier les données requises
    if (!proId || !date || !time || !client || !amount) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required booking data' 
      });
    }

    // Vérifier la disponibilité
    const existingBooking = await Booking.findOne({
      proId,
      'appointment.date': date,
      'appointment.time': time,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingBooking) {
      return res.status(409).json({ 
        success: false, 
        message: 'This time slot is no longer available' 
      });
    }

    // Créer la réservation
    const booking = new Booking({
      proId,
      client: {
        name: client.name,
        email: client.email,
        phone: client.phone
      },
      appointment: {
        date,
        time,
        service: client.service,
        notes: client.notes
      },
      payment: {
        amount: parseFloat(amount),
        currency,
        status: 'pending'
      }
    });

    await booking.save();

    // Initialiser Paystack
    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: client.email,
        amount: amount * 100, // Paystack utilise les centimes
        currency,
        reference: booking._id.toString(),
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/booking/success`,
        metadata: {
          booking_id: booking._id.toString(),
          customer_name: client.name,
          appointment_date: date,
          appointment_time: time
        }
      })
    });

    const paystackData = await paystackResponse.json();

    if (paystackData.status) {
      // Mettre à jour avec la référence Paystack
      booking.payment.paystack_reference = paystackData.data.reference;
      await booking.save();

      res.status(200).json({
        success: true,
        booking_id: booking._id,
        payment_url: paystackData.data.authorization_url
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment initialization failed'
      });
    }

  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error occurred' 
    });
  }
}