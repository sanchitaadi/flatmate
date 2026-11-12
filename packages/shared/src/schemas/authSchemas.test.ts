import test from 'node:test';
import assert from 'node:assert/strict';
import { signupSchema, loginSchema, userRoleSchema } from './index';

test('Auth Schema: Validates strong password requirement', () => {
  // Password without uppercase
  const invalid1 = signupSchema.safeParse({
    email: 'user@example.com',
    password: 'password123',
    full_name: 'Aarav Sharma',
    active_role: 'flatmate_seeker',
    city: 'Bangalore',
    state: 'Karnataka',
  });
  assert.equal(invalid1.success, false);

  // Password with uppercase and number
  const valid = signupSchema.safeParse({
    email: 'user@example.com',
    password: 'Password123!',
    full_name: 'Aarav Sharma',
    active_role: 'flatmate_seeker',
    city: 'Bangalore',
    state: 'Karnataka',
  });
  assert.equal(valid.success, true);
});

test('Auth Schema: Rejects invalid email formats', () => {
  const result = loginSchema.safeParse({
    email: 'not-an-email',
    password: 'password123',
  });
  assert.equal(result.success, false);
});

test('User Role Schema: Rejects unknown roles', () => {
  const validRole = userRoleSchema.safeParse('property_owner');
  assert.equal(validRole.success, true);

  const invalidRole = userRoleSchema.safeParse('super_broker');
  assert.equal(invalidRole.success, false);
});
