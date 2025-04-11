import { Client } from '@microsoft/microsoft-graph-client';
import { getSession } from 'next-auth/react';

export async function sendMailHandler({ data: mail }) {
  const session = await getSession();

  if (session) {
    const accessToken = session.accessToken;

    const client = Client.init({
      authProvider: (done) => done(null, accessToken),
    });

    const sendMail = {
      message: {
        subject: mail.subject,
        body: { contentType: 'HTML', content: mail.body },
        toRecipients: [
          { emailAddress: { address: 'raigor.deng@vesync.com' } },
        ],
      },
    };

    await client.api('/me/sendMail').post(sendMail);
    console.log(`Email sent successfully for: ${mail.subject}`);
  }
}
