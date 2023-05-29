import { useUser } from '../context/UserContext/UserContext';

export const Home = () => {
  const {user} = useUser();
  return (
    <>
      <div className='flex flex-col items-center m-5 text-xl font-bold'>
        <p>HELLO</p>
        <p>ID:{user?.id}</p>
        <p>Full name: {user?.fullName}</p>
        <p>Username: {user?.userName}</p>
      </div>
    </>
  );
};
