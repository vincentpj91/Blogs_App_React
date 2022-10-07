export const getEnvValue = (name) => {
  const value = process.env[`REACT_APP_${name}`];
  return value || "";
};
