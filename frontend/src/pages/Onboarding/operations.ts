import { gql } from '../../__generated__/gql';

export const createUserMutation = gql(`mutation CreateUser($fullName: String!,$userName: String!) { 
  createUser (
    createUserInput: {fullName:$fullName, userName:$userName}
  ) 
  {
    id,
    fullName,
    userName
  }
}`)