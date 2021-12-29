const amqp = require('amqplib');

amqp.connect('amqp://localhost', { credentials: amqp.credentials.plain('study', 'study') })
  .then(function (conn) {
    process.once('SIGINT', function () { conn.close(); });
    return conn.createChannel()
      .then(function (ch) {

        let ok = ch.assertQueue('bank_slip', { durable: false });

        ok = ok.then(function (_qok) {
          return ch.consume('bank_slip', function (msg) {
            console.log(" [x] Received '%s'", msg.content.toString());
          }, { noAck: true });
        });

        return ok.then(function (_consumeOk) {
          console.log(' [*] Waiting for messages. To exit press CTRL+C');
        });
      });
  }).catch(err => {
    console.log(err)
  });