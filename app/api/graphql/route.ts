import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';
import typeDefs from "./schema";
import resolvers from "./resolvers";
import { gql } from 'graphql-tag';
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default';

//integrate apollo server with nextjs
//GraphQL schema functions for API

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      // Install a landing page plugin based on NODE_ENV
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault({
            graphRef: 'my-graph-id@my-graph-variant',
            footer: false,
          })
        : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
    ],
  });
  const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer);
  export async function GET(request: NextRequest) {
    return handler(request);
  }
  export async function POST(request: NextRequest) {
    return handler(request);
  }