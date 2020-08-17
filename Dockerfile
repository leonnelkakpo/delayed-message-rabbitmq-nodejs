
FROM rabbitmq:3.8.2-management-alpine

RUN apk  add curl &&\
    curl -LJO https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases/download/v3.8.0/rabbitmq_delayed_message_exchange-3.8.0.ez && \
    mv rabbitmq_delayed_message_exchange-3.8.0.ez /plugins && \ 
    rabbitmq-plugins enable rabbitmq_delayed_message_exchange