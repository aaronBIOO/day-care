'use server';

import { resend } from '@/lib/resend';
import { OwnerContactEmail } from '@/components/emails/OwnerContactEmail';

export async function sendOwnerEmail(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;
  const formType = (formData.get('formType') as string) || 'General Contact';

  const ownerEmail = process.env.OWNER_EMAIL;

  if (!ownerEmail) {
    console.error('OWNER_EMAIL environment variable is missing');
    return { success: false, error: 'Server configuration error: OWNER_EMAIL is missing' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Daycare Website',
      to: [ownerEmail],
      subject: `[${formType}] New Message from ${name}`,
      react: (
        <OwnerContactEmail
          name={name}
          email={email}
          message={message}
          formType={formType}
        />
      ),
    });

    if (error) {
      console.error('Resend API Error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error('Server Action Error:', err);
    return { success: false, error: `Internal Server Error: ${err.message}` };
  }
}
