import { MODELS as BASE_MODELS } from '@/resources/base';

export interface TableRow extends BASE_MODELS.Resource {
  auth_id: string;
  first_name: string;
  last_name: string;
  handle: string;
  profile_url: string;
  avatar_url: string;
}

export interface User {
  firstName: string;
  lastName: string;
  handle: string;
  profileUrl: string;
  avatarUrl: string;
}
