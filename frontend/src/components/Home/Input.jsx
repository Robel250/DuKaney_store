// src/components/ui/input.jsx
import React from 'react';

const Input = ({ type = 'text', placeholder, value, onChange, className }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`p-2 border rounded-md w-full ${className}`}
        />
    );
};

export default Input;
