import { Filter } from './components/Filter/Filter';
import { useForm } from 'react-hook-form';
import { Badge, Heading, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { User, UserFactory } from './factories/UserFactory';
import { useEffect, useRef, useState } from 'react';
import { useFilters } from './hooks/useFilters';
import { uniqueStrings } from './utils/uniqueStrings';
const users = UserFactory.buildMany(10);

function App() {
  const uniqueCareers = uniqueStrings(users.map((user) => user.careers).flat());
  const { control, filteredData } = useFilters(
    uniqueCareers,
    (selectedFilterableValues: string[]) => (user: User) =>
      user.careers.some((career) => selectedFilterableValues.includes(career)),
    users
  );
  return (
    <div className="p-8">
      <Heading>Form</Heading>
      <Filter control={control} filterableValues={uniqueCareers} />
      <Table>
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Name</Th>
            <Th>Career</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredData.map((user) => (
            <Tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>{user.name}</Td>
              <Td className="flex space-x-4">
                {user.careers.map((career) => (
                  <Badge key={career} color="#222222">
                    {career}
                  </Badge>
                ))}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}

export default App;
