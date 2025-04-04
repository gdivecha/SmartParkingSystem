import pika
import json

# Run RabbitMQ: docker run --name mqserver -p 5672:5672 rabbitmq

def get_user_input():
    """Get the RabbitMQ server number (1 or 2)"""
    isValidInput = False
    server_num = -1
    while not isValidInput:
        server_input = input("Please enter a RabbitMQ server number (1 or 2): ")
        try:
            server_num = int(server_input)
            if server_num == 1 or server_num == 2:
                isValidInput = True
            else:
                print("Please enter either 1 or 2")
        except:
            print("Invalid Input. Please try again.")
    return server_num

def process_message(channel, method, properties, body):
    received_message = json.loads(body.decode())
    print(f"Received message from Request-Queue: {received_message}")
    message_to_publish = {"id": 1}
    channel.basic_publish(exchange='', routing_key='Response-Queue', body=json.dumps(message_to_publish),
                          properties=pika.BasicProperties(content_type='application/json'))
    print(f"Published message to Response-Queue: {message_to_publish}")

server_num = get_user_input()
print(f"Starting RabbitMQ Service #{server_num}")

# Setup RabbitMQ connection
connection_params = pika.ConnectionParameters(host='localhost')
connection = pika.BlockingConnection(connection_params)

# Create channel for subscribing (Request-Queue)
subscribe_channel = connection.channel()
subscribe_channel.queue_declare(queue='Request-Queue')

# Create channel for publishing (Response-Queue)
publish_channel = connection.channel()
publish_channel.queue_declare(queue='Response-Queue')

# Consume demining tasks sent by client
subscribe_channel.basic_consume(queue='Request-Queue', on_message_callback=process_message, auto_ack=True)
print('Waiting for messages. To exit press CTRL+C')
subscribe_channel.start_consuming()
