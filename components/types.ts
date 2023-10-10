export type Redact_Business_Data = {
  _id: string;
  title: string;
  description: string;
  applicants: [Redact_Business_Applications];
};

export type Redact_Business_Applications = {
  username: string;
  surname: string;
  status: string;
  avatar: string;
  identityNo: string
};
export type Redact_Reports = {
  reference: string;
  name: string;
  surname: string;
  avatar: string;
  status: string;
  companyName: string;
  identityNo: string;
  postId: string
};
