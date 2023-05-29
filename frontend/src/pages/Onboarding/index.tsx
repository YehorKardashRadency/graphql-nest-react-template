import { useApolloClient } from '@apollo/client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { FormInput } from '../../components/FormInput';
import { useUser } from '../../context/UserContext/UserContext';
import { createUserMutation } from './operations';

interface RegistrationInputs {
  firstName: string;
  lastName: string;
  userName: string;
}

const Onboarding = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<RegistrationInputs>();
  const client = useApolloClient();
  const onSubmit: SubmitHandler<RegistrationInputs> = async (data) => {
    const response = await client.mutate({
      mutation: createUserMutation,
      variables: {
        fullName: `${data.firstName} ${data.lastName}`,
        userName: data.userName
      }
    });
    setUser!(response.data!.createUser);
    navigate('/');
  };
  return (
    <div>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Create an account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <FormInput
                  label="First name"
                  register={register('firstName', {
                    required: true,
                    maxLength: 20
                  })}
                />
                <FormInput
                  label="Last name"
                  register={register('lastName', {
                    required: true,
                    maxLength: 20
                  })}
                />
                <FormInput
                  label="Username"
                  register={register('userName', {
                    required: true,
                    maxLength: 20
                  })}
                />
                <button
                  type="submit"
                  className="w-full text-white bg-teal-500 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                >
                  Create an account
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Onboarding;
