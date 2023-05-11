

describe('scenario description', () => {
    test('test_1 description', () => {
      expect("result").toEqual("result");
    });
  
    test('test_2 description', () => {
      expect(5).toBeGreaterThan(2);
    });

    test('Unit Test Demo sample', () => {
      expect(4).toBe(4); // premitive value 
      expect("Pintu").toEqual("Pintu") // Object value
      expect(false).toBeFalsy();
      expect(6).toBeGreaterThan(5);
  } );
  });