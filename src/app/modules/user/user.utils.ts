import User from "./user.model";

// Admin ID
export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastAdmin = await User.findOne(
    { role: 'ADMIN' },
    { _id: 0, id: 1 } // Select only the `id` field
  )
    .sort({ createdAt: -1 }) // Sort by `createdAt` in descending order
    .exec();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async (): Promise<string> => {
  const currentId = (await findLastAdminId()) || '00000';

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `A-${incrementedId}`;

  return incrementedId;
};
