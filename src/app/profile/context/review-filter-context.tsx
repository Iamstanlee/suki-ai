import { createContext, ReactNode, useContext, useState } from 'react';

type FilterState_Review = {
  city?: string | 'all';
  update?: (key: keyof Pick<FilterState_Review, 'city'>, value: any) => void;
  reset?: () => void;
};

const initialState: FilterState_Review = {
  city: 'all',
};

export const FilterContext_Review =
  createContext<Partial<FilterState_Review>>(initialState);

export const FilterConsumer_Review = FilterContext_Review.Consumer;

export const FilterProvider_Review = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, setState] = useState<Partial<FilterState_Review>>(initialState);

  const update = (key: keyof FilterState_Review, value: any) => {
    setState({ ...state, [key]: value });
  };

  const reset = () => setState(initialState);

  return (
    <FilterContext_Review.Provider value={{ ...state, update, reset }}>
      {children}
    </FilterContext_Review.Provider>
  );
};

export const useFilter_Review = () => {
  const context = useContext(FilterContext_Review);

  if (!context) {
    throw new Error(
      'useFilter_Review must be used within a FilterProvider_Review',
    );
  }

  return context;
};
