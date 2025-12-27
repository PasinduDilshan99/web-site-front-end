"use client"
import React from 'react'

// Custom Components with Purple & Amber Theme
export const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-lg shadow-md border border-purple-200 ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`px-6 py-4 border-b border-purple-200 bg-gradient-to-r from-purple-50 to-amber-50 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-xl font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

export const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

export const Label = ({ children, htmlFor, className = '' }: { children: React.ReactNode; htmlFor?: string; className?: string }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-900 mb-1 ${className}`}>
    {children}
  </label>
);

export const Input = ({ 
  type = 'text', 
  id, 
  name, 
  value, 
  onChange, 
  placeholder, 
  className = '', 
  required = false,
  readOnly = false,
  min,
  step
}: any) => (
  <input
    type={type}
    id={id}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    readOnly={readOnly}
    min={min}
    step={step}
    className={`w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 ${className}`}
  />
);

export const Textarea = ({ 
  id, 
  name, 
  value, 
  onChange, 
  placeholder, 
  className = '', 
  rows = 3,
  required = false 
}: any) => (
  <textarea
    id={id}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    required={required}
    className={`w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 ${className}`}
  />
);

export const Select = ({ 
  id, 
  name, 
  value, 
  onChange, 
  children, 
  className = '', 
  disabled = false 
}: any) => (
  <select
    id={id}
    name={name}
    value={value}
    onChange={onChange}
    disabled={disabled}
    className={`w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 ${className}`}
  >
    {children}
  </select>
);

export const SelectItem = ({ value, children }: any) => (
  <option value={value} className="text-gray-900">{children}</option>
);

export const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  className = '',
  disabled = false 
}: any) => {
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:from-purple-700 hover:to-purple-900 focus:ring-purple-500',
    secondary: 'bg-gradient-to-r from-amber-600 to-amber-800 text-white hover:from-amber-700 hover:to-amber-900 focus:ring-amber-500',
    outline: 'border border-purple-300 text-gray-900 hover:bg-purple-50 focus:ring-purple-500',
    ghost: 'text-gray-900 hover:bg-purple-50 focus:ring-purple-500'
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export const Switch = ({ checked, onCheckedChange, id }: any) => (
  <button
    type="button"
    id={id}
    onClick={() => onCheckedChange(!checked)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${checked ? 'bg-purple-600' : 'bg-gray-300'}`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`}
    />
  </button>
);

export const Separator = ({ className = '' }: { className?: string }) => (
  <hr className={`border-t border-purple-200 ${className}`} />
);

export const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
  </div>
);

export const Toast = ({ message, type = 'error', onClose }: { message: string; type?: 'success' | 'error'; onClose: () => void }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  
  return (
    <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-md shadow-lg ${
      type === 'success' ? 'bg-green-100 text-green-900 border border-green-200' : 'bg-red-100 text-red-900 border border-red-200'
    }`}>
      <div className="flex justify-between items-center">
        <span className="font-medium">{message}</span>
        <button onClick={onClose} className="ml-4 text-lg">&times;</button>
      </div>
    </div>
  );
};