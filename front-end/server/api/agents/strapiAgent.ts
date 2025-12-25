export default class StrapiAgent {
  private static instance: StrapiAgent;

  private url: string;
  private token: string;

  private constructor({
    url,
    token,
  }: {
    url: string;
    token: string;
  }) {
    if (!url || !token) {
      throw new Error('StrapiAgent: url and token are required');
    }
    this.url = url;
    this.token = token;
  }

  static getInstance(): StrapiAgent {
    if (!StrapiAgent.instance) {
      const config = useRuntimeConfig();
      const url = config.strapi.url;
      const token = config.strapi.token;
      if (!url || !token) {
        throw new Error('StrapiAgent: url and token must be set in runtime config');
      }
      StrapiAgent.instance = new StrapiAgent({ url, token });
    }
    return StrapiAgent.instance;
  }


   private async request(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: any
  ): Promise<any> {
    const res = await fetch(`${this.url}/api/${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        `Strapi API error: ${res.status} ${res.statusText} - ${JSON.stringify(
          errorData
        )}`
      );
    }

    return res.json();
  }

  async create(
    endpoint: string,
    data: any
  ): Promise<any> {
    return this.request(endpoint, 'POST', { data });
  }

  async find(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<any> {
    let url = endpoint;
    if (params) {
      const query = new URLSearchParams(params as Record<string, string>).toString();
      url += `?${query}`;
    }
    return this.request(url, 'GET');
  }
}