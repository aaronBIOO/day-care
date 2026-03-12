import * as React from 'react';

interface OwnerContactEmailProps {
  name: string;
  email: string;
  message: string;
  formType: string;
}

export const OwnerContactEmail: React.FC<Readonly<OwnerContactEmailProps>> = ({
  name,
  email,
  message,
  formType,
}) => (
  <div style={{ fontFamily: 'Poppins, sans-serif', padding: '20px', color: '#333' }}>
    <h2 style={{ color: '#000', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
      New Form Submission: {formType}
    </h2>
    <div style={{ marginTop: '20px' }}>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Message:</strong></p>
      <blockquote style={{ 
        backgroundColor: '#f9f9f9', 
        padding: '15px', 
        borderLeft: '4px solid #ddd',
        margin: '10px 0'
      }}>
        {message}
      </blockquote>
    </div>
    <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '30px 0' }} />
    <p style={{ fontSize: '12px', color: '#666' }}>
      Sent from your Daycare Website Form.
    </p>
  </div>
);
