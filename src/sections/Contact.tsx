import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ContactForm from '../components/ui/ContactForm';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 px-4 md:px-10 bg-black"
      // Pour une variante plus subtile :
      // style={{ background: "linear-gradient(to bottom, #16161f, #222235)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: '80px' } : { width: 0 }}
            transition={{ duration: 0.8 }}
            className="h-1 bg-primary mx-auto mb-6"
          />
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('contactSection.title')}
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('contactSection.subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-black/40 p-3 rounded-lg">
                  <Mail size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1 text-white">Email</h3>
                  <p className="text-gray-300">contact@raphtech.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-black/40 p-3 rounded-lg">
                  <Phone size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1 text-white">Phone</h3>
                  <p className="text-gray-300">+33 6 12 34 56 78</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-black/40 p-3 rounded-lg">
                  <MapPin size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1 text-white">Location</h3>
                  <p className="text-gray-300">Paris, France</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;