export const TrainerSearchableFields = [];

export const TrainerRelationalFields = [`managementDepartmentId`];

export const TrainerRelationalFieldsMapper: { [key: string]: string } = {
    managementDepartment: `managementDepartmentId`,
};

export const TrainerFilterableFields = [`searchTerm`, `gender`, `contactNo`];

export const userSearchableFields: Array<string> = [`role`];
export const userFilterableFields: Array<string> = [`searchTerm`, `id`, `role`];

export const gender = ['male', 'female'];
export const bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
