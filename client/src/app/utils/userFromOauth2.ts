export const setUserFromOauth2 = (response: any) => {
  return {
    id: response.id,
    email: response.email,
    firstName: response.name.split(' ')[0],
    lastName: response.name.split(' ')[1],
    imageURL: response.picture,
  };
};
