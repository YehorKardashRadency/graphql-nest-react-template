import { CodegenConfig } from '@graphql-codegen/cli';
import * as dotenv from 'dotenv'

dotenv.config()

const config: CodegenConfig = {
  schema: process.env.REACT_APP_GATEWAY_URL,
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
  ignoreNoDocuments: true,
};


export default config;