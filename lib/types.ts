// data models
export interface Organization {
  id: string;
  name: string;
}

export interface User {
  id: string;
  organization_id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'member'
}

export interface Drill {
  id: string;
  organization_id: string;
  title: string;
  description: string;
  date_created: string;
  last_updated: string;
}

export interface DrillSession {
  id: string;
  drill_id: string;
  date_started: string;
  date_completed: string | null;
  duration: number | null;
  user_id: string;
}

export interface DrillObjection {
  id: string;
  drill_id: string;
  position: number;
  objection: string;
  ideal_response: string;
}

export interface DrillObjectionAnswer {
  id: string;
  drill_session_id: string;
  drill_objection_id: string;
  answer: string;
}
