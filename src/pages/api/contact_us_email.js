let nodemailer = require("nodemailer");

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { message, email, subject, name } = req.body.formValue;
      let htmlTemplate = `
       <div style="float: left;width: 650px;margin-left:5%">
        <div style="float: left; width: 650px;">
            <div
                style="float: left;width: 650px;font-family:Arial, Helvetica,Verdana sans-serif !important ;color:#666;margin-top:5rem">
            </div>
            <!-- passenger details  startttt-->
            <div style="float: left;width: 650px;">
                <table width="650" border="1" cellpadding="0" cellspacing="0"
                    style="border-collapse:collapse;font-size: 12px;">
                    <tbody>
                        <tr style="width:100%;">
                            <th colspan="2" style="background-color:#2d59d4;font-size:20px;padding:5px;color:white">

                                Details
                            </th>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr style="width:100%;">
                            <td style="font-weight:bold;width: 200px !important;padding-left: 3px">Full Name
                            </td>
                            <td style="padding:2px;padding-left: 3px">${name}</td>
                        </tr>
                        <tr style="width:100%;">
                            <td style="font-weight:bold;width: 200px !important;padding-left: 3px">Email Address</td>
                            <td style="padding:2px;padding-left: 3px"><a href="">${email}</a>
                            </td>
                        </tr>
                        <tr style="width:100%;">
                            <td style="font-weight:bold;max-width: 200px !important;padding-left: 3px">Note
                            </td>
                            <td style="padding:2px;padding-left: 3px ;max-width: 445px;word-break: break-all;">
                                <a href="">${message}</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- fioooter-->
            <div
                style="float:left;width: 650px;font-family:Arial, Helvetica,Verdana sans-serif !important ;color:#666;">
                <span>
                    <br>Jolyon House,
                    <br>Office 202B,
                    <br>Amberly Way Hounslow,
                    <br>TW4 6BH,
                    <br>United Kingdom
                    <br>Tel: <span class="js-phone-number">+44 203 887 42 39</span>,
                    <br>Website:
                    <a href="https://www.churchilltransfers.com/"  target="_blank">https://www.churchilltransfers.com/</a>,
                    <br>Email enquiries:
                    <a  target="_blank" href="mailto:info@churchilltransfers.com">info@churchilltransfers.com</a>
                </span>
            </div>
        </div>
    </div>
      `;

      const transporter = nodemailer.createTransport({
        name: "smtp.gmail.com",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "info@churchilltransfers.com",
          pass: "esqoqvxolbsfxlhm",
        },
        tls: { rejectUnauthorized: false },
      });



      const mailData = {
        from: "info@churchilltransfers.com",
        to: "info@churchilltransfers.com",
        subject: subject,
        html: htmlTemplate,
      };
      await new Promise((resolve, reject) => {
        transporter.sendMail(mailData, function (err, info) {
          if (err) {
            console.log(err);

            reject(err);
          } else {
            resolve(info);
            console.log(info);

          }
        });
      });
      res.status(200).json({ status: "OK" });
    }
  } catch (error) {
    console.log(error);
  }
}


   // const transporter = nodemailer.createTransport({
      //   name: "info@churchilltransfers.com",
      //   host: "info@churchilltransfers.com",
      //   port: 25,
      //   secure: false,
      //   auth: {
      //     user: "info@churchilltransfers.com",
      //     pass: "esqoqvxolbsfxlhm",
      //   },
      //   tls: { rejectUnauthorized: false },
      // });

      // const mailData = {
      //   from: "info@churchilltransfers.com",
      //   to: "elgun.ezmemmedov@mail.ru",
      //   subject: subject,
      //   html: htmlTemplate,
      // };
      // const transporter = nodemailer.createTransport({
      //   name: "mail.plesk-secure.com",
      //   host: "mail.plesk-secure.com",
      //   port: 465,
      //   secure: true,
      //   auth: {
      //     user: "info@aplcars.com",
      //     pass: "Istanbul2021!-",
      //   },
      //   tls: { rejectUnauthorized: false },
      // });


      // const mailData = {
      //   from: "info@heathrow-gatwick-transfers.com",
      //   to: "elgun.ezmemmedov@mail.ru",
      //   subject: subject,
      //   html: htmlTemplate,
      // };