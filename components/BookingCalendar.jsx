'use client '
import { useState, useEffect } from 'react';
import { Clock, User, Mail, Phone } from 'lucide-react';

const BookingCalendar = ({ pro }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  // Créneaux par défaut
  const timeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ];

  // Générer les 30 prochains jours
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

  // Vérifier les disponibilités
  const checkAvailability = async (date) => {
    try {
      const response = await fetch(`${apiDomain}/bookings/availability`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          proId: pro?._id || 'demo', 
          date: date.toISOString().split('T')[0] 
        })
      });
      
      // Vérifier si c'est une erreur 405 (Method Not Allowed)
      if (response.status === 405) {
        throw new Error('API endpoint exists but POST method not implemented yet');
      }
      
      // Vérifier si la réponse est du JSON valide
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('API endpoint not returning JSON');
      }
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      setAvailableSlots(data.availableSlots || timeSlots);
    } catch (error) {
      console.error('Error checking availability:', error);
      // Utiliser tous les créneaux par défaut si l'API échoue
      setAvailableSlots(timeSlots);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      checkAvailability(selectedDate);
    }
  }, [selectedDate]);

  // Traitement de la réservation
  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proId: pro?._id || 'demo',
          date: selectedDate.toISOString().split('T')[0],
          time: selectedTime,
          client: bookingForm,
          amount: pro?.price || 150,
          currency: 'GHS'
        })
      });

      // Vérifier si c'est une erreur 405 (Method Not Allowed)
      if (response.status === 405) {
        throw new Error('API endpoint exists but POST method not implemented yet');
      }

      // Vérifier si la réponse est du JSON valide
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('API endpoint not returning JSON');
      }

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        // Rediriger vers Paystack
        window.location.href = result.payment_url;
      } else {
        alert('Booking failed: ' + result.message);
      }
    } catch (error) {
      console.error('Booking error:', error);
      if (error.message.includes('POST method not implemented')) {
        alert('Backend API endpoints need to be created. Please implement the POST handlers for /api/bookings/availability and /api/bookings/create');
      } else {
        alert('Booking system temporarily unavailable. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Sélection de Date */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Select Date</h4>
        <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
          {dates.map((date, index) => {
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
            
            return (
              <button
                key={index}
                onClick={() => setSelectedDate(date)}
                disabled={isWeekend}
                className={`p-2 text-sm rounded-lg border transition-colors ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : isWeekend
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300'
                }`}
              >
                <div className="font-medium">{date.getDate()}</div>
                <div className="text-xs">
                  {date.toLocaleDateString('en', { month: 'short' })}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sélection d'Heure */}
      {selectedDate && (
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Select Time</h4>
          <div className="grid grid-cols-3 gap-2">
            {availableSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`p-2 text-sm rounded-lg border transition-colors ${
                  selectedTime === time
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300'
                }`}
              >
                <Clock className="inline w-3 h-3 mr-1" />
                {time}
              </button>
            ))}
          </div>
          {availableSlots.length === 0 && (
            <p className="text-gray-500 text-sm mt-2">No available slots for this date.</p>
          )}
        </div>
      )}

      {/* Formulaire de Réservation */}
      {selectedDate && selectedTime && (
        <form onSubmit={handleBooking} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <User className="inline w-4 h-4 mr-2" />
              Full Name
            </label>
            <input
              type="text"
              required
              value={bookingForm.name}
              onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Mail className="inline w-4 h-4 mr-2" />
              Email
            </label>
            <input
              type="email"
              required
              value={bookingForm.email}
              onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Phone className="inline w-4 h-4 mr-2" />
              Phone
            </label>
            <input
              type="tel"
              required
              value={bookingForm.phone}
              onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="+233 XX XXX XXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Type
            </label>
            <select
              required
              value={bookingForm.service}
              onChange={(e) => setBookingForm({...bookingForm, service: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Select a service</option>
              <option value="consultation">Consultation</option>
              <option value="repair">Repair Service</option>
              <option value="maintenance">Maintenance</option>
              <option value="installation">Installation</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (Optional)
            </label>
            <textarea
              rows={3}
              value={bookingForm.notes}
              onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Any special requirements or additional information?"
            />
          </div>

          {/* Résumé et Paiement */}
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h5 className="font-medium text-gray-900 mb-2">Booking Summary</h5>
            <div className="text-sm text-gray-600 space-y-1">
              <p><span className="font-medium">Date:</span> {selectedDate.toLocaleDateString()}</p>
              <p><span className="font-medium">Time:</span> {selectedTime}</p>
              <p><span className="font-medium">Service:</span> {bookingForm.service || 'Not selected'}</p>
              <p><span className="font-medium">Professional:</span> {pro?.company_info?.name || 'Demo Pro'}</p>
              <div className="border-t pt-2 mt-2">
                <p className="font-semibold text-gray-900 text-base">
                  Total Amount: {pro?.price || 150}₵
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Processing...
              </>
            ) : (
              `Book & Pay ${pro?.price || 150}₵`
            )}
          </button>

          <p className="text-xs text-gray-500 text-center">
            Secure payment powered by Paystack
          </p>
        </form>
      )}
    </div>
  );
};


export default BookingCalendar;