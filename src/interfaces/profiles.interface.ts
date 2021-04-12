import { Document } from 'mongoose';

export interface IProfile {
  age: number,
  description: string,
  lastName: string,
  linkedinUrl: string,
  name: string,
  title: string,
}

export interface Profile extends IProfile, Document {}
