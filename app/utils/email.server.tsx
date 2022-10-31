import AWS from "aws-sdk";

const ses = new AWS.SES({ region: "us-east-1" });

function sesSendEmail(
  fullName: any,
  emailAddress: any,
  subject: any,
  body: any
) {
  const emailParams = {
    Destination: {
      ToAddresses: ["mproios@eucrona.com"],
    },
    Message: {
      Body: {
        Text: { Data: body },
      },

      Subject: { Data: `New inqury ${fullName} - ${subject}` },
    },
    Source: "inquries@eucrona.com",
  };

  return ses.sendEmail(emailParams).promise();
}

export { sesSendEmail };
