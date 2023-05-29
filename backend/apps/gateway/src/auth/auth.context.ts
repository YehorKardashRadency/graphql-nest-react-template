export const authContext = ({ req }) => {
  return { user: req.auth };
};
