
import React from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, HeartPulse, Award, Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-soft-gray relative">
      {/* Navigation - Top Left */}
      <div className="absolute top-6 left-6 z-10 flex items-center space-x-4">
        <Link 
          to="/" 
          className="p-3 bg-white text-matt-black rounded-xl shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
          title="Back to Home"
        >
          <Home size={20} />
        </Link>
        <div className="hidden md:flex items-center space-x-2">
          <div className="w-8 h-8 bg-light-orange rounded flex items-center justify-center text-matt-black font-bold">Q</div>
          <span className="font-bold text-white drop-shadow-md">Q-Master Info</span>
        </div>
      </div>

      {/* Header section */}
      <div className="bg-matt-black text-white py-24 px-6 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-light-orange rounded-3xl mb-6 text-matt-black font-bold text-4xl shadow-2xl">
          Q
        </div>
        <h1 className="text-5xl font-black mb-4">Q-Master Medical Center</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Providing world-class healthcare with cutting-edge technology and compassionate care since 1998.
        </p>
      </div>

      <div className="max-w-6xl mx-auto -mt-10 px-6 pb-20 space-y-12">
        {/* Quick Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center text-center">
             <div className="p-4 bg-orange-50 text-light-orange rounded-2xl mb-4">
               <HeartPulse size={32} />
             </div>
             <h3 className="text-xl font-bold mb-2">Patient First</h3>
             <p className="text-gray-500">Dedicated to providing personalized attention to every visitor.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center text-center">
             <div className="p-4 bg-orange-50 text-light-orange rounded-2xl mb-4">
               <ShieldCheck size={32} />
             </div>
             <h3 className="text-xl font-bold mb-2">Safety Certified</h3>
             <p className="text-gray-500">Strict adherence to international hygiene and medical standards.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center text-center">
             <div className="p-4 bg-orange-50 text-light-orange rounded-2xl mb-4">
               <Award size={32} />
             </div>
             <h3 className="text-xl font-bold mb-2">Award Winning</h3>
             <p className="text-gray-500">Recognized as the most efficient digital hospital in the region.</p>
          </div>
        </div>

        {/* Detailed Info */}
        <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/2 p-12 space-y-6">
            <h2 className="text-3xl font-black text-matt-black">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              At Q-Master Medical Center, we believe that time is life. Our innovative Queue Management System ensures that patients experience the shortest possible wait times while receiving high-quality medical attention. 
            </p>
            <p className="text-gray-600 leading-relaxed">
              We leverage real-time data to optimize department performance and provide our visitors with up-to-the-minute information about their status.
            </p>
            <div className="pt-6 border-t border-gray-100 space-y-4">
              <div className="flex items-start space-x-4 text-matt-black">
                <MapPin className="text-light-orange flex-shrink-0 mt-1" />
                <span className="font-semibold leading-snug">Rathi Complex 3rd Floor Salisbury Park Swargate 411001</span>
              </div>
              <div className="flex items-center space-x-4 text-matt-black">
                <Phone className="text-light-orange flex-shrink-0" />
                <span className="font-semibold">+91 8989898089</span>
              </div>
              <div className="flex items-center space-x-4 text-matt-black">
                <Mail className="text-light-orange flex-shrink-0" />
                <span className="font-semibold">queuemanagement@sibar.com</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 bg-matt-black p-12 flex flex-col justify-center text-white">
            <h3 className="text-2xl font-bold mb-8 flex items-center space-x-3">
              <Clock className="text-light-orange" />
              <span>Visiting Hours</span>
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Monday - Friday</span>
                <span className="font-bold text-light-orange">08:00 AM - 08:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Saturday</span>
                <span className="font-bold text-light-orange">09:00 AM - 05:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Sunday</span>
                <span className="font-bold text-light-orange">Emergency Only</span>
              </div>
            </div>
            <div className="mt-12 text-center">
              <Link to="/get-token" className="inline-block w-full py-4 bg-light-orange text-matt-black font-black rounded-2xl hover:bg-white transition-all">
                BOOK YOUR VISIT NOW
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center pt-8">
           <Link to="/login" className="text-gray-400 hover:text-light-orange font-medium transition-colors">
              Staff Portal Login
           </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
