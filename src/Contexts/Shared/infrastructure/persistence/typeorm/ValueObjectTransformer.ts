import { NewableClass } from '../../../domain/NewableClass';
import { ValueObject } from '../../../domain/value-object/ValueObject';

export const ValueObjectTransformer = (valueObject: NewableClass<ValueObject<any>>) => ({
  to: (value: ValueObject<any>): any => value.value,
  from: (value: any): ValueObject<any> => new valueObject(value)
});
