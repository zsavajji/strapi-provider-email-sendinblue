const Brevo = require("@getbrevo/brevo")
const defaultClient = Brevo.ApiClient.instance

module.exports = {
  init: (providerOptions = {}, settings = {}) => {
    const apiKey = defaultClient.authentications["api-key"]
    apiKey.apiKey = providerOptions.apiKey

    return {
      send: async options => {
        const {
          contact,
          from,
          fromName,
          replyTo,
          to,
          subject,
          tags,
          templateId,
          params,
          html,
          text,
        } = options

        // create contact if not present
        if (!!contact) {
          const contactApi = new Brevo.ContactsApi()
          const createContact = new Brevo.CreateContact()

          createContact.email = contact.email
          createContact.attributes = contact.attributes
          createContact.updateEnabled = true

          await contactApi.createContact(createContact)
        }

        const apiInstance = new Brevo.TransactionalEmailsApi()
        const sendSmtpEmail = new Brevo.SendSmtpEmail()

        sendSmtpEmail.sender = {
          email: from || settings.defaultFrom,
          name: fromName || settings.defaultFromName,
        }

        sendSmtpEmail.replyTo = {
          email: replyTo || settings.defaultReplyTo,
        }

        sendSmtpEmail.to = [ { email: to } ]
        sendSmtpEmail.subject = subject

        if (!!tags) sendSmtpEmail.tags = [...tags]

        if (!!templateId) {
          if (!!params) sendSmtpEmail.params = params

          const template = await apiInstance.getSmtpTemplate(templateId)
          sendSmtpEmail.htmlContent = template.htmlContent
        } else {
          sendSmtpEmail.htmlContent = html
          sendSmtpEmail.textContent = text
        }
        return apiInstance.sendTransacEmail(sendSmtpEmail)
      }
    }
  }
}
