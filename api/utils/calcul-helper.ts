export function sum(obj: any, property: string) {
  let sum = 0;
  obj.forEach((element) => {
    sum += element[property];
  });
  return sum;
}