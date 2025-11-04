
export interface Company {
  id: string;
  name: string;
  domain: string;
  description: string;
  industry: string;
  funding_stage: string;
  hiring_signals: { roles: string[] } | null;
  logo_url: string | null;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
