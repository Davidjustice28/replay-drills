import { Organization, User } from "../types";

export const dummyOrganization: Organization = {
  id: "org_1",
  name: "Replay Inc.",
}

export const dummyUsers: User[] = [
  {
    id: "user_1",
    organization_id: "org_1",
    name: "Alice Johnson",
    role: 'admin',
    email: 'ajohnson@email.com',
    password: 'Testpassword123!'
  },
  {
    id: "user_2",
    organization_id: "org_1",
    name: "Michael Lee",
    role: 'member',
    email: 'mlee@email.com',
    password: 'Testpassword123!'
  },
]

