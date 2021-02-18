"use strict";

const SibApiV3Sdk = require("sib-api-v3-sdk");
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const { removeUndefined } = require("strapi-utils");

module.exports = {
  init: (providerOptions = {}, settings = {}) => {
    const apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = providerOptions.apiKey;

    return {
      // addContact: (options) => {
      //   return new Promise((resolve, reject) => {
      //     const contactApi = new SibApiV3Sdk.ContactsApi();
      //     const createContact = new SibApiV3Sdk.CreateContact();
      //     createContact.email = options.email;
      //     createContact.attributes = options.attributes;
      //     createContact.updateEnabled = true;
      //     contactApi.createContact(createContact).then(
      //       (data) => {
      //         resolve(data);
      //       },
      //       (error) => {
      //         reject(error);
      //       }
      //     );
      //   });
      // },
      send: (options) => {
        return new Promise((resolve, reject) => {
          const apiInstance = new SibApiV3Sdk.SMTPApi();
          const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

          sendSmtpEmail.sender = {
            email: options.from || settings.defaultFrom,
            name: options.fromName || settings.defaultFromName,
          };
          sendSmtpEmail.replyTo = {
            email: options.replyTo || settings.defaultReplyTo,
          };
          sendSmtpEmail.to = [{ email: options.to }];
          sendSmtpEmail.subject = options.subject;
          sendSmtpEmail.htmlContent = options.html;
          sendSmtpEmail.textContent = options.text;

          if (!!options.tags) sendSmtpEmail.tags = [...options.tags];

          apiInstance.sendTransacEmail(sendSmtpEmail).then(
            (data) => {
              resolve(data);
            },
            (error) => {
              reject(error);
            }
          );
        });
      },
    };
  },
};
