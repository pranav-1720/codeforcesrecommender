import { pgTable, serial, text, integer, json,boolean } from 'drizzle-orm/pg-core';

export const problemsTable = pgTable('problems', {
  id: serial('id').primaryKey(),
  contestId: integer('contest_id').notNull(),
  problemsetName: text('problemset_name'),
  index: text('index').notNull(),
  name: text('name').notNull(),
  type: text('type').notNull(),
  points: integer('points'),
  rating: integer('rating'),
  tags: json('tags').notNull(), // Use json type for arrays
  solvedCount: integer('solved_count').notNull(),
});

export const contestsTable = pgTable('contests', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  type: text('type').notNull(),
  phase: text('phase').notNull(),
  frozen: boolean('frozen').notNull(),
  durationSeconds: integer('duration_seconds').notNull(),
  startTimeSeconds: integer('start_time_seconds').notNull(),
  relativeTimeSeconds: integer('relative_time_seconds').notNull(),
  division: integer('division').notNull(),
});

export type InsertProblem = typeof problemsTable.$inferInsert
export type SelectProblem = typeof problemsTable.$inferSelect