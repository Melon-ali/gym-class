// Trainee-related constants
export const TraineeSearchableFields = [];

export const TraineeRelationalFields = ['managementDepartmentId'];

export const TraineeRelationalFieldsMapper: { [key: string]: string } = {
  managementDepartment: 'managementDepartmentId',
};

export const TraineeFilterableFields = ['searchTerm', 'gender', 'contactNo'];

// User-related constants
export const userSearchableFields: Array<string> = ['role'];
export const userFilterableFields: Array<string> = ['searchTerm', 'id', 'role'];

// Gender options
export const gender = ['male', 'female'];

// Blood group options
export const bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
