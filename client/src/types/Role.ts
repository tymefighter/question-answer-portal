type Role = "STUDENT" | "SETTER" | "EVALUATOR";

const roleList = [
  'STUDENT', 'SETTER', 'EVALUATOR'
];

export const isRole = (role: any): role is Role => {
  return (
    typeof role === 'string'
    && roleList.includes(role)
  );
}

export default Role;