import AWS from "aws-sdk";

const ses = new AWS.SES({ region: "us-east-1" });

function sesTest() {
  const emailParams = {
    Destination: {
      ToAddresses: ["proios.michael@gmail.com"],
    },
    Message: {
      Body: {
        Text: { Data: "From Contact Form: " },
      },

      Subject: { Data: "From: " },
    },
    Source: "",
  };

  return ses.sendEmail(emailParams).promise();
}

export { sesTest };
