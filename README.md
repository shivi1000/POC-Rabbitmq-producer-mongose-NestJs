# POC - Rabbit mq Microservice BoilerPlate Using Nest js with Mongoose ODM

This project encompasses a Proof of Concept (POC) leveraging RabbitMQ as a message broker, a MongoDB database powered by Mongoose, and NestJS as the backend framework. It showcases the utilization of RabbitMQ for message queuing, Mongoose for interactions with MongoDB, and NestJS for constructing scalable and modular server-side applications.

The POC-Rabbitmq-consumer-mongoOse-NestJs serves as a proof of concept, illustrating the integration of NestJS, RabbitMQ, and MongoDB. It highlights NestJS for developing modern Node.js applications, RabbitMQ for dependable asynchronous communication, and MongoDB for adaptable and scalable data storage. The project includes the RabbitMQ Consumer component, tasked with handling API requests or initiating events.


## Installation

1. Clone the repository:


```bash
git clone https://github.com/shivi1000/POC-Rabbitmq-producer-mongose-NestJs.git

git clone https://github.com/shivi1000/POC-Rabbitmq-consumer-mongose-NestJs.git

```

## 1.1 Project Structure

- **src:** Source code of the POC-Rabbit MQ-Producer-Mongoose-Nest js

- **src:** Source code of the POC-Rabbit MQ-Consumer-Mongoose-Nest js


## 1.2 API Documentation ( for Rabbit mq Producer Project )

- **_Rabbit mq Producer API:_** http://localhost:8008/swagger#/

- *Sample Request Body:*

```bash
{
  "notificationType": 1,
  "title": "Testing",
  "description": "Notification testing",
  "isSent": true,
  "receiverIds": ["64c35c5b62392e01a7a27bc2"]
}

```


## Branch Switch ( for both Projects )

1. Switch to dev branch:

```bash
git checkout dev

```
## Installation 

- Install dependencies:

```bash
npm install

```


## 1.2 Environment Setup

- Create bin folder in root directory

```bash
mkdir bin

```

- Create a file named

```bash
.env.dev

```

## Base configuration

```bash
PORT=8009           //replace with your NestJS port

```


## MONGO DB

```bash
URI=''              //add your mongodb database url

```

## RABBIT MQ

```bash
RABBIT_MQ_QUEUE=''         //add your rabbit mq queue
RABBIT_MQ_HOST=''          //add your rabbit mq host
RABBIT_MQ_PORT=5672

```


## 1.3 Start the Project

- Start the service:

```bash
npm run dev

```


