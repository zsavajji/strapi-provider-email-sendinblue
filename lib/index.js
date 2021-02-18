"use strict";

const SibApiV3Sdk = require("sib-api-v3-sdk");
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const { removeUndefined } = require("strapi-utils");

module.exports = {
  init: (providerOptions = {}, settings = {}) => {
    const apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = providerOptions.apiKey;

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    return {
      addContact: (options) => {
        return new Promise((resolve, reject) => {
          const contactApi = new SibApiV3Sdk.ContactsApi();
          const createContact = new SibApiV3Sdk.CreateContact();
          createContact.email = options.email;
          createContact.attributes = options.attributes;
          createContact.updateEnabled = true;
          contactApi.createContact(createContact).then(
            (data) => {
              resolve(data);
            },
            (error) => {
              reject(error);
            }
          );
        });
      },
      send: (options) => {
        return new Promise((resolve, reject) => {
          sendSmtpEmail.sender = {
            email: options.from || settings.from,
            name: options.fromName || settings.fromName,
          };
          sendSmtpEmail.replyTo = {
            email: options.replyTo || settings.replyTo,
          };
          sendSmtpEmail.to = [{ email: options.to }];
          sendSmtpEmail.subject = options.subject;
          sendSmtpEmail.htmlContent = options.html;
          sendSmtpEmail.textContent = options.text;

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
