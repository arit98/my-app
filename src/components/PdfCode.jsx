import dateFormat from "dateformat";

function GetTime(date) {
  var hours = parseInt(dateFormat(date, "hh"));
  var minutes = parseInt(dateFormat(date, "MM"));
  var ampm = hours >= 12 ? "AM" : "PM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

const PdfCode = (
  name,
  address,
  phoneNumber,
  quantity,
  invoice,
  product,
  totalAmmount,
  receiveAmmount,
  paymentType,
  remainingBalance
) => `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body >
    <div style="min-height: auto;
    width: 100%;
    height : 97vh;
    border: solid 2px #000;"  >
    <div style="height: auto;
    width: 100%;
    display: flex;
    flex-direction: row;
    /* padding: 20px; */
    justify-content: space-between;
    align-items: center;">
    <div class="data-title">
        <div style="display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 2rem;  
        padding-left: 20px;">Invoice PDF<br></div>
    </div>
   
        <img style="
        height: 90px;
    width: 90px;
    margin-right:15px;
        " src="https://ik.imagekit.io/gleyvfl6b/images/_Pngtree_salon%20logo_6872052.png?updatedAt=1715146235511" />
    </div>
    <hr />
        <hr/>


        <div style="
        width: 100%;
        height: auto;
        padding: 15px;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        ">
            <div style="
            width: 50%;
            align-items: flex-start;
            ">
                <p class="invoice-user">
                    Bill To : <br/>
                    Name : ${name} <br/>
                    Address : ${address} <br/>
                    Phone No : +91 ${phoneNumber}
                </p>
            </div>
            <div style="align-items: flex-end;">
                <p>Invoice No : ${invoice}<br/>
                Date : ${dateFormat(Date.now(), "dd-mm-yyyy")}<br/>
                Time :${GetTime(new Date())}</p>
                <br/>
                <br/>
                <p>Mobile No :- <br/>
                Demo1<br/>
                </p>
            </div>
        </div>
        <hr/>
        <hr/>
        <div style="height: auto;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;">
            <table style="width:100%; border-collapse: collapse;">
                <tr style="background-color: #F1D36F; color: white;">
                  <th style="height: 30px;">Index</th>
                  <th style="height: 30px;">Product Name</th>
                  <th style="height: 30px;">Price(Per)</th>
                  <th style="height: 30px;">Bras</th>
                  <th style="height: 30px;">Total</th>
                </tr>
                <tr style="background-color: rgba(246, 221, 178, 0.8);">
                  <td style="text-align: center;height: 30px;">1</td>
                  <td style="text-align: center;height: 30px;">${product}</td>
                  <td style="text-align: center;height: 30px;">${parseFloat(
                    parseFloat(totalAmmount) / parseFloat(quantity)
                  ).toFixed(2)}</td>
                  <td style="text-align: center;height: 30px;">${quantity}</td>
                  <td style="text-align: center;height: 30px;">₹ ${totalAmmount}</td>
                </tr>
               
              </table>
              
                <!-- <div style="align-self: flex-end;margin-right: 10px;font-style: bold;">Received balance :  1</div>
          
              <hr/>
              <div style="align-self: flex-end;margin-right: 10px;font-style: bold;">Grand Total : 1</div>
              <hr/>
              <div style="align-self: flex-end;margin-right: 10px;font-style: bold;">Payment Mode : Cash</div>
              <hr/> -->
              <div style="width:100%;align-self: flex-end; display: flex; flex-direction: row;">
                <div style="width:40%"></div>
                  <table style="width: 50%; align-self: flex-end;">
                  <tr>
                  <th style="text-align: start;">Grand Total : </th>
                  <td style="text-align: center;height: 30px;">₹ ${totalAmmount}</td>
              </tr>
                        <tr style="border-bottom: solid ;">
                            <th style="text-align: start;">Received Balance : </th>
                            <td style="text-align: center;height: 30px;">₹ ${receiveAmmount}</td>
                        </tr>
                       
                        <tr style="border-bottom: solid ;">
                        <th style="text-align: start;">Remaining Balance : </th>
                        <td style="text-align: center;height: 30px;">₹ ${remainingBalance}</td>
                    </tr>
                        <tr>
                            <th style="text-align: start;">Payment Method: </th>
                            <td style="text-align: center;height: 30px;">${paymentType}</td>
                        </tr>
                  </table>
              </div>
        </div>
        <hr/>
        <hr/>
        <div style="height:auto; padding: 20px;">

            <p>Account Details - <br/>
            Bank Name: Demo1<br/>
            Bank Account no : Demo1<br/>
            Bank IFSC code : Demo1<br/>
            </p>

        </div>

    </div>
  </body>
</html>
`;

const style = `
    .container {
      margin : 15px;
      border : solid 2px #000
    }
`;

export { PdfCode };
