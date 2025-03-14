// Fields that can be searched in the 'Booking' collection (used in queries)
export const BookingSearchableFields = [
  'cat_name_bn',
  'cat_name_en',
  'cat_icon',
  'no_of_dua',
  'no_of_subcat',
];

// Relational fields, if you are using references between collections
export const BookingRelationalFields = [
  // e.g., 'userId', 'categoryId', etc.
  // These can be ObjectId references in Mongoose to other collections
];

// This could be used to map internal model keys to more user-friendly keys or API response fields
export const BookingRelationalFieldsMapper: { [key: string]: string } = {
  // Example: 'category_id': 'categoryName'
  // These mappings could be used in your API to return human-readable field names
};

// Fields that can be filtered in the 'Booking' collection
export const BookingFilterableFields = [
  'name',
  // other fields for filtering can be added here
];
