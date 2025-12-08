import { GeneratedAudioFile } from "ai";

// data models
export interface OrganizationModel {
  id: string;
  name: string;
}

export interface UserModel {
  id: string;
  organization_id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'member'
}

export interface DrillModel {
  id: string;
  organization_id: string;
  title: string;
  description: string;
  date_created: Date;
  last_updated: Date;
}

export interface DrillSessionModel {
  id: string;
  drill_id: string;
  date_started: Date;
  date_completed: Date | null;
  duration: number | null;
  user_id: string;
  score: number;
}

export interface DrillObjectionModel {
  id: string;
  drill_id: string;
  position: number;
  objection: string;
  ideal_response: string;
}

export interface DrillObjectionAnswerModel {
  id: string;
  drill_session_id: string;
  drill_objection_id: string;
  answer: string;
  score: number;
  user_id: string;
}


export type ObjectionWithVoiceover = DrillObjectionModel & {
  user_response: string, 
  ai_audio: {base64: string, mediaType: string}
}

export interface DrillSessionResult {
  answers: {
    id: string;
    drill_session_id: string;
    user_id: string;
    score: number;
    drill_objection_id: string;
    answer: string;
    objection: DrillObjectionModel
  }[];
  total_score: number;
  duration: number;
}