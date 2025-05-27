import { Link } from 'react-router-dom';
import { Button } from 'primereact/button'; 
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Ripple } from 'primereact/ripple';
import { motion } from 'framer-motion';
import { FaUsers, FaBoxOpen } from 'react-icons/fa';

const HomeView = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      <Card 
        title="Bienvenido a mi Fantabuloso Trabajo 🎉"
        subTitle="CRUD Usuarios y Productos"
        style={{ width: '400px', textAlign: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.1)', borderRadius: '20px' }}
      >
        <Divider />
        <div className="p-d-flex p-flex-column p-ai-center" style={{ gap: '1rem' }}>
          <Link to="/usuarios">
            <Button 
              label="Ir a Usuarios" 
              icon={<FaUsers />} 
              className="p-button-raised p-button-info" 
              style={{ width: '100%' }} 
            />
          </Link>

          <Link to="/productos">
            <Button 
              label="Ir a Productos" 
              icon={<FaBoxOpen />} 
              className="p-button-raised p-button-success" 
              style={{ width: '100%' }} 
            />
          </Link>
        </div>
        <Ripple />
      </Card>
    </motion.div>
  );
};

export default HomeView;
