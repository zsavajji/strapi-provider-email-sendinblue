const SibApiV3Sdk = require("sib-api-v3-sdk")
const defaultClient = SibApiV3Sdk.ApiClient.instance

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
          const contactApi = new SibApiV3Sdk.ContactsApi()
          const createContact = new SibApiV3Sdk.CreateContact()

          createContact.email = contact.email
          createContact.attributes = contact.attributes
          createContact.updateEnabled = true

          await contactApi.createContact(createContact)
        }

        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()

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
