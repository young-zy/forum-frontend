import { Thread } from './thread';

export interface Section {
  sid: number;
  sectionName: string;
  threads?: Thread[];
  currentPage: number;
  totalPage: number;
}
