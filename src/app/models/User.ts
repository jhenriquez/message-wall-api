/*
 * Contains relevant information about an application user.
 */

export class User {
  id: String;
  email: String;
  emailHash: String;
  name: String;
  createdAt: Date;
  updatedAt: Date;
}