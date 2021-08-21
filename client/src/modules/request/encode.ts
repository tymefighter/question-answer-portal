export default function encode(username: string, password: string): string {
  const usernameAndPassword = username + ':' + password;
  const usernameAndPasswordBytes = Buffer.from(usernameAndPassword, 'utf-8');
  const encodedUsernameAndPassword = usernameAndPasswordBytes.toString('base64');
  return encodedUsernameAndPassword;
}