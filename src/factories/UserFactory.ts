import faker from 'faker';
export type User = {
  id: string;
  name: string;
  careers: string[];
};
const careers = [
  faker.company.companyName(),
  faker.company.companyName(),
  faker.company.companyName(),
  faker.company.companyName(),
  faker.company.companyName(),
];
export class UserFactory {
  public static build = (): User => ({
    id: faker.random.alphaNumeric(20),
    name: faker.internet.userName(),
    careers: Array.from(
      new Set([
        careers[faker.datatype.number({ min: 0, max: 4 })],
        careers[faker.datatype.number({ min: 0, max: 4 })],
      ])
    ),
  });
  public static buildMany = (quantity: number): User[] => {
    const users: User[] = [];
    for (let i = 0; i <= quantity; i += 1) users.push(this.build());
    return users;
  };
}
