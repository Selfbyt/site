declare module '@mailchimp/mailchimp_marketing' {
  export interface MailchimpConfig {
    apiKey: string
    server: string
  }

  export interface AddListMemberRequest {
    email_address: string
    status: 'subscribed' | 'unsubscribed' | 'cleaned' | 'pending'
    merge_fields?: {
      FNAME?: string
      LNAME?: string
      [key: string]: any
    }
  }

  export interface AddListMemberResponse {
    id: string
    email_address: string
    status: string
  }

  export interface MailchimpError {
    status: number
    title: string
    detail: string
  }

  const mailchimp: {
    setConfig: (config: MailchimpConfig) => void
    lists: {
      addListMember: (listId: string, body: AddListMemberRequest) => Promise<AddListMemberResponse>
    }
  }

  export default mailchimp
}
