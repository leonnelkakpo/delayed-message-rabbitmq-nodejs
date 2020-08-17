var amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    var exchange = "jobs";
    var msg = process.argv.slice(2).join(" ") || "Hello World!";
    let delay = 40000;

    channel.assertExchange(exchange, "x-delayed-message", {
      autoDelete: false,
      durable: true,
      passive: true,
      arguments: {
        "x-delayed-type": "direct",
      },
    });
    channel.publish(exchange, "", Buffer.from(`msg delay: ${delay}`), {
      headers: {
        "x-delay": delay,
      },
    });
    console.log(" [x] Sent %s", msg);
  });

  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
});
