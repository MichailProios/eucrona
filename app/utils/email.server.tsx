import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

import type {
  SendEmailCommandOutput,
  SendEmailCommandInput,
} from "@aws-sdk/client-ses";

const sesClient = new SESClient({ region: "us-east-1" });

// function sesSendEmail(
//   fullName: any,
//   emailAddress: any,
//   subject: any,
//   body: any
// ) {
//   const emailParams = {
//     Destination: {
//       ToAddresses: ["mproios@eucrona.com"],
//     },
//     Message: {
//       Body: {
//         Text: { Data: body },
//       },

//       Subject: { Data: `New inqury ${fullName} - ${subject}` },
//     },
//     Source: "inquries@eucrona.com",
//   };

//   const command = new SendEmailCommand(emailParams);

//   return ses.send(command);
// }

const ses = {
  sendEmail: async function (params: SendEmailCommandInput) {
    let data: SendEmailCommandOutput | undefined;
    try {
      data = await sesClient.send(new SendEmailCommand(params));
    } catch (error) {
      console.error(error);
    }

    return data;
  },
};

export { ses };
