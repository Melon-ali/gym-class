/* eslint-disable @typescript-eslint/no-explicit-any */

type ISearchFilterHelper = {
  filters: any;
  searchAbleFields: string[];
  relationalFields: string[];
  relationalFieldsMapper: { [key: string]: string };
};

const searchingFiltering = ({
  filters,
  searchAbleFields,
  relationalFields,
  relationalFieldsMapper,
}: ISearchFilterHelper) => {
  const { searchTerm, ...filterData } = filters;

  // Process `filterData` to handle data type conversions
  const filterDataTypes: any = Object.entries(filterData).reduce(
    (acc: any, [key, value]: [string, any]) => {
      if (typeof value === 'string' && !isNaN(Number(value))) {
        acc[key] = Number(value); // Convert to number if not NaN
      } else {
        acc[key] = value; // Keep as is otherwise
      }
      return acc;
    },
    {},
  );

  console.log(`Processed filter data:`, filterDataTypes);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: searchAbleFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterDataTypes).length > 0) {
    andConditions.push({
      AND: Object.keys(filterDataTypes).map(key => {
        if (relationalFields.includes(key)) {
          return {
            [relationalFieldsMapper[key]]: {
              id: filterDataTypes[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: filterDataTypes[key],
            },
          };
        }
      }),
    });
  }

  return andConditions;
};

export const SearchingFilteringHelper = {
  searchingFiltering,
};
