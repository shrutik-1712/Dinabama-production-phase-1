import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Instagram, Youtube, Send, Phone } from 'lucide-react';
import whatsapp from '../assets/QR/Picture1.jpg'
import instagram from '../assets/QR/Picture2.jpg'

const Contact = () => (
  <div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
    <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">Contact Us</h2>
    <p className="mb-2 sm:mb-4 text-sm sm:text-base">Get in touch with us for any inquiries or feedback.</p>
   
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
      <Card className="w-full">
        <CardContent className="pt-4 sm:pt-6">
          <form className="space-y-3 sm:space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1 text-sm sm:text-base">Name</label>
              <input type="text" id="name" className="w-full p-2 border rounded text-sm sm:text-base" />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 text-sm sm:text-base">Email</label>
              <input type="email" id="email" className="w-full p-2 border rounded text-sm sm:text-base" />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1 text-sm sm:text-base">Message</label>
              <textarea id="message" rows={4} className="w-full p-2 border rounded text-sm sm:text-base"></textarea>
            </div>
            <Button type="submit" className="w-full sm:w-auto bg-[#1B1464]">Send Message</Button>
          </form>
        </CardContent>
      </Card>
     
      <Card className="w-full">
        <CardContent className="pt-4 sm:pt-6">
          <div className="mt-2 sm:mt-4 w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.438972949641!2d72.9376728!3d19.1437404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b95d7fe50807%3A0x145dd9f3c17659cb!2sDina%20Bama%20Patil%20Library%20%26%20Study%20Room!5e1!3m2!1sen!2sin!4v1731688308580!5m2!1sen!2sin"
              className="w-full h-[200px] sm:h-[275px] lg:h-[350px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <p className="text-sm sm:text-base text-gray-600 my-2 sm:my-4">
            Dina Patil Estate, Station Road, Bhandup (W) , Mumbai 400078
          </p>
         
          <div className="flex flex-wrap gap-2 sm:gap-4 mb-2 sm:mb-4">
            <a href="https://www.instagram.com/dina_bama_patil_library?utm_source=qr&igsh=d3ZoOHRiZDcxaTU5" 
               className="flex items-center gap-1 sm:gap-2 text-blue-600 hover:text-blue-800 text-sm sm:text-base">
              <Instagram size={20} className="sm:w-6 sm:h-6" />
              <span>Instagram</span>
            </a>
            <a href="https://www.youtube.com/channel/UC7UfKIVmVr3RU6KaNu7tcGQ#:~:text=Share%20your%20videos%20with%20friends,%20family,%20and%20the" 
               className="flex items-center gap-1 sm:gap-2 text-red-600 hover:text-red-800 text-sm sm:text-base">
              <Youtube size={20} className="sm:w-6 sm:h-6" />
              <span>YouTube</span>
            </a>
            <a href="https://t.me/dinabamapatillibraryofficial" 
               className="flex items-center gap-1 sm:gap-2 text-blue-500 hover:text-blue-700 text-sm sm:text-base">
              <Send size={20} className="sm:w-6 sm:h-6" />
              <span>Telegram</span>
            </a>
            <a href="https://wa.me/message/WTVLGDI34HX5H1" 
               className="flex items-center gap-1 sm:gap-2 text-green-600 hover:text-green-800 text-sm sm:text-base">
              <Phone size={20} className="sm:w-6 sm:h-6" />
              <span>WhatsApp</span>
            </a>
          </div>
         
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            <div>
              <p className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">Instagram QR</p>
              <img src={whatsapp} alt="Instagram QR Code" className="w-full h-auto max-h-[200px] sm:max-h-[240px] lg:max-h-[240px] object-contain" />
            </div>
            <div>
              <p className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">WhatsApp QR</p>
              <img src={instagram} alt="WhatsApp QR Code" className="w-full h-auto max-h-[200px] sm:max-h-[240px] lg:max-h-[240px] object-contain" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default Contact;