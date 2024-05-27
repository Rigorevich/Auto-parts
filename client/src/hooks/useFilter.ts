import { useReducer } from 'react';

export enum FilterType {
  BRAND = 'brand',
  MODEL = 'model',
  GENERATION = 'generation',
  ENGINE = 'engine',
  BODY_TYPE = 'bodyType',
  MODIFICATION = 'modification',
  RESET = 'reset',
}

export type OptionType<T> = {
  value: string | null;
  option: T;
};

export interface AttributesState<T> {
  [key: string]: OptionType<T> | null;
}

const initialState = {
  brand: null,
  model: null,
  generation: null,
  engine: null,
  bodyType: null,
  modification: null,
};

const attributesReducer = <T>(
  state: AttributesState<T>,
  action: {
    type: FilterType;
    payload: OptionType<T> | null;
  }
) => {
  switch (action.type) {
    case FilterType.BRAND:
      return {
        brand: action.payload,
        model: null,
        generation: null,
        engine: null,
        bodyType: null,
        modification: null,
      };
    case FilterType.MODEL:
      return { ...state, model: action.payload, generation: null, engine: null, bodyType: null, modification: null };
    case FilterType.GENERATION:
      return { ...state, generation: action.payload, engine: null, bodyType: null, modification: null };
    case FilterType.ENGINE:
      return { ...state, engine: action.payload, modification: null };
    case FilterType.BODY_TYPE:
      return { ...state, bodyType: action.payload, modification: null };
    case FilterType.MODIFICATION:
      return { ...state, modification: action.payload };
    case FilterType.RESET:
      return initialState;
    default:
      return state;
  }
};

export const useFilter = () => {
  const [attributes, dispatch] = useReducer(attributesReducer, initialState);

  return { attributes, dispatch };
};
