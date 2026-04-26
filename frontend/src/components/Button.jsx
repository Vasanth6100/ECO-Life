import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick,
  style: customStyle,
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all duration-300';

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseStyles} ${className}`}
      style={{
        backgroundColor: variant === 'primary' ? 'var(--primary-green)' : 
                         variant === 'outline' ? 'transparent' : 
                         variant === 'secondary' ? 'var(--card-beige)' : 'transparent',
        color: variant === 'primary' ? 'white' : 
               variant === 'outline' ? 'var(--primary-green)' : 
               variant === 'secondary' ? 'var(--primary-green)' : 'var(--secondary-text)',
        border: variant === 'outline' ? '2px solid var(--primary-green)' : 'none',
        borderRadius: size === 'lg' ? 'var(--radius-lg)' : 
                      size === 'md' ? 'var(--radius-md)' : 'var(--radius-sm)',
        padding: size === 'lg' ? '1rem 2.5rem' : 
                 size === 'md' ? '0.75rem 2rem' : '0.5rem 1.5rem',
        fontSize: size === 'lg' ? '1.125rem' : 
                  size === 'md' ? '1rem' : '0.875rem',
        boxShadow: variant === 'secondary' ? 'var(--shadow-soft)' : 'none',
        cursor: props.disabled ? 'not-allowed' : 'pointer',
        opacity: props.disabled ? 0.7 : 1,
        ...customStyle
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
