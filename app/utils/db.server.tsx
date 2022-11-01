import {
  DynamoDBClient,
  GetItemCommand,
  BatchGetItemCommand,
  ScanCommand,
  PutItemCommand,
  DeleteItemCommand,
} from "@aws-sdk/client-dynamodb";

//Inputs
import type {
  ScanCommandInput,
  BatchGetItemCommandInput,
  GetItemCommandInput,
  PutItemCommandInput,
  DeleteItemCommandInput,
} from "@aws-sdk/client-dynamodb";

//Outputs
import type {
  ScanCommandOutput,
  BatchGetItemCommandOutput,
  GetItemCommandOutput,
  PutItemCommandOutput,
  DeleteItemCommandOutput,
} from "@aws-sdk/client-dynamodb";

const ddbClient = new DynamoDBClient({ region: "us-east-1" });

const db = {
  findOne: async function (params: GetItemCommandInput) {
    let data: GetItemCommandOutput | undefined;
    try {
      data = await ddbClient.send(new GetItemCommand(params));
    } catch (error) {
      console.error(error);
    }

    return data;
  },

  findMany: async function (params: BatchGetItemCommandInput) {
    let data: BatchGetItemCommandOutput | undefined;
    try {
      data = await ddbClient.send(new BatchGetItemCommand(params));
    } catch (error) {
      console.error(error);
    }

    return data;
  },

  findAll: async function (params: ScanCommandInput) {
    let data: ScanCommandOutput | undefined;
    try {
      data = await ddbClient.send(new ScanCommand(params));
    } catch (error) {
      console.error(error);
    }

    return data;
  },

  createOne: async function (params: PutItemCommandInput) {
    let data: PutItemCommandOutput | undefined;
    try {
      data = await ddbClient.send(new PutItemCommand(params));
    } catch (error) {
      console.error(error);
    }

    return data;
  },

  deleteOne: async function (params: DeleteItemCommandInput) {
    let data: DeleteItemCommandOutput | undefined;
    try {
      data = await ddbClient.send(new DeleteItemCommand(params));
    } catch (error) {
      console.error(error);
    }

    return data;
  },
};

export { db };
