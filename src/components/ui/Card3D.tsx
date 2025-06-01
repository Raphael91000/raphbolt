import React from 'react';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { Brain, Code, ShoppingCart, LineChart, Lightbulb, Settings } from 'lucide-react';

interface Card3DProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  index: number;
}

const Card3D: React.FC<Card3DProps> = ({ title, description, icon, color, index }) => {
  const getIcon = () => {
    switch (icon) {
      case 'brain':
        return <Brain size={48} color={color} />;
      case 'code':
        return <Code size={48} color={color} />;
      case 'shopping-cart':
        return <ShoppingCart size={48} color={color} />;
      case 'line-chart':
        return <LineChart size={48} color={color} />;
      case 'lightbulb':
        return <Lightbulb size={48} color={color} />;
      case 'settings':
        return <Settings size={48} color={color} />;
      default:
        return <Code size={48} color={color} />;
    }
  };

  return (
    <Tilt
      options={{
        max: 15,
        scale: 1.05,
        speed: 300,
      }}
    >
      <motion.div 
        className="card w-full max-w-[350px] h-[300px] bg-background-light rounded-xl p-6 shadow-xl border border-gray-800"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: index * 0.1,
        }}
        style={{ 
          boxShadow: `0 10px 30px -15px ${color}33`
        }}
      >
        <div className="flex flex-col h-full">
          <div className="mb-4">{getIcon()}</div>
          <h3 className="text-xl font-bold mb-2" style={{ color }}>{title}</h3>
          <p className="text-gray-300">{description}</p>
        </div>
      </motion.div>
    </Tilt>
  );
};

export default Card3D;