'use server';

import { resend } from '@/lib/resend';
import { OwnerContactEmail } from '@/components/emails/OwnerContactEmail';

export async function sendOwnerEmail(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;
  const formType = (formData.get('formType') as string) || 'General Contact';

  // The user specified to send it to the owner's google mail.
  const ownerEmail = process.env.OWNER_EMAIL || 'aaron@example.com';

  try {
    const { data, error } = await resend.emails.send({
      from: 'Daycare Website <onboarding@resend.dev>', // Valid email format required
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
      console.error('Resend Error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error('Email Action Error:', err);
    return { success: false, error: err.message };
  }
}
