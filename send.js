const amqp = require('amqplib');

amqp.connect('amqp://localhost', { credentials: amqp.credentials.plain('study', 'study') })
  .then(function (conn) {
    return conn.createChannel()
      .then(function (ch) {
        const queueName = 'bank_slip';
        const msg = {
          id: '2be18dd0-9a0b-4bd0-9028-a0532bf8a453',
          bank: 'Banco do Brasil',
          user: 'José Rojas',
          value: 400,
          expire: new Date()
        };

        const ok = ch.assertQueue(queueName, { durable: false });

        return ok.then(function (_qok) {
          // NB: `sentToQueue` and `publish` both return a boolean
          // indicating whether it's OK to send again straight away, or
          // (when `false`) that you should wait for the event `'drain'`
          // to fire before writing again. We're just doing the one write,
          // so we'll ignore it.
          ch.sendToQueue(queueName, Buffer.from(JSON.stringify(msg)));
          console.log(" [x] Sent '%s'", msg);
          return ch.close();
        });
      }).finally(function () { conn.close(); });
  }).catch(err => {
    console.log(err)
  });