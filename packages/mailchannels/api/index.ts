interface MailChannelsContact {
  email: string;
  name?: string;
}

export interface MailChannelsPersonalizations {
  to: [MailChannelsContact, ...MailChannelsContact[]];
  cc?: MailChannelsContact[];
  bcc?: MailChannelsContact[];
}

export interface MailChannelsContent {
  type: string;
  value: string;
}

export interface MailChannelsOptions {
  personalizations: [
    MailChannelsPersonalizations,
    ...MailChannelsPersonalizations[]
  ];
  from: MailChannelsContact;
  subject: string;
  content: [MailChannelsContent, ...MailChannelsContent[]];
}

interface Success {
  success: true;
}

interface Failure {
  success: false;
  errors: string[];
}

export const sendEmail = async (
  payload: MailChannelsOptions
): Promise<Success | Failure> => {
  const response = await fetch("https://api.mailchannels.net/tx/v1/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.status === 202) return { success: true };

  try {
    const { errors } = await response.clone().json();
    return { success: false, errors };
  } catch {
    return { success: false, errors: [response.statusText] };
  }
};
