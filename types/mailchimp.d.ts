declare module '@mailchimp/mailchimp_marketing' {
  interface MailchimpClient {
    setConfig: (config: { apiKey: string; server: string }) => void;
    lists: {
      addListMember: (audienceId: string, data: { email_address: string; status: string }) => Promise<any>;
    };
  }

  const mailchimp: MailchimpClient;
  export default mailchimp;
} 