import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://mustafasavul:cZDnnzQINhtOTeNF@cluster0.nmbnufu.mongodb.net/next-auth?retryWrites=true&w=majority'
  );

  return client;
}
