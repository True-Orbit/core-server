import { MODELS as BASE_MODELS } from '@/resources/base';

export interface TableRow extends BASE_MODELS.Resource {
  name: string;
  api_key: string;
}

export interface Service extends BASE_MODELS.Resource {
  name: string;
  apiKey: string;
}
