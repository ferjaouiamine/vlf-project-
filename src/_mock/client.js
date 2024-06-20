import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const clients = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.findName(),
  company: faker.address.streetAddress(),
  phone: faker.phone.number(),
  email: faker.internet.email(),
  status: sample(['active', 'banned']),
  //   role: sample([
  //     'Leader',
  //     'Hr Manager',
  //     'UI Designer',
  //     'UX Designer',
  //     'UI/UX Designer',
  //     'Project Manager',
  //     'Backend Developer',
  //     'Full Stack Designer',
  //     'Front End Developer',
  //     'Full Stack Developer',
  //   ]),
}));

export default clients;
