import { changeKeys } from '..';

const camelKeys = {
  firstName: 'testName',
  lastName: 'testLastName',
  age: '23',
};

const snakeKeys = {
  first_name: 'testName',
  last_name: 'testLastName',
  age: '23',
};

describe('change keys', () => {
  it('should change keys from camelCase to snake_case', () => {
    const result = changeKeys(camelKeys, 'snakeCase');
    expect(result).toEqual(snakeKeys);
  });

  it('should change keys from snake_case to camelCase', () => {
    const result = changeKeys(snakeKeys, 'camelCase');
    expect(result).toEqual(camelKeys);
  });
});
