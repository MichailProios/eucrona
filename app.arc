@app
eucrona

@http
/*
  method any
  src server

@aws
profile default
region us-east-1
runtime nodejs16.x
storage 5120
memory 2048
policies
  architect-default-policies
  AmazonSESFullAccess
  AmazonDynamoDBFullAccess


