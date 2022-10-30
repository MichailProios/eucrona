import AWS from "aws-sdk";

AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";

const ses = new AWS.SES();

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

sesTest();

export { sesTest };
