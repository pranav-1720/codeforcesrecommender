import { pgTable, serial, text, integer, json } from 'drizzle-orm/pg-core';

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

export type InsertProblem = typeof problemsTable.$inferInsert
export type SelectProblem = typeof problemsTable.$inferSelect