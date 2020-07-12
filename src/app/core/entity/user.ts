export interface User {
  uid: number;
  username: string;
  email: string;
  auth: UserAuth;
  regDate: Date;
}

interface UserAuth {
  systemAdmin: boolean;
  sectionAdmin: boolean;
  sections: number[];
  user: boolean;
  blocked: boolean;
}
