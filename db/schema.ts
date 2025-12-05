import { pgTable, text, varchar, integer, timestamp, uuid, boolean } from "drizzle-orm/pg-core";


export const organizations = pgTable("organizations", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
});

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  organization_id: uuid("organization_id")
    .notNull()
    .references(() => organizations.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  role: varchar("role").notNull(),
});

export const drills = pgTable("drills", {
  id: uuid("id").primaryKey().defaultRandom(),
  organization_id: uuid("organization_id")
    .notNull()
    .references(() => organizations.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date_created: timestamp("date_created").notNull().defaultNow(),
  last_updated: timestamp("last_updated").notNull().defaultNow(),
  archived: boolean().default(false)
});

export const drillSessions = pgTable("drill_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  drill_id: uuid("drill_id").notNull().references(() => drills.id),
  date_started: timestamp("date_started").notNull().defaultNow(),
  date_completed: timestamp("date_completed"),
  duration: integer("duration"),
  user_id: uuid("user_id").notNull().references(() => users.id),
});

export const drillObjections = pgTable("drill_objections", {
  id: uuid("id").primaryKey().defaultRandom(),
  drill_id: uuid("drill_id").notNull().references(() => drills.id),
  position: integer("position").notNull(),
  objection: text("objection").notNull(),
  ideal_response: text("ideal_response").notNull(),
});

export const drillObjectionAnswers = pgTable("drill_objection_answers", {
  id: uuid("id").primaryKey().defaultRandom(),
  drill_session_id: uuid("drill_session_id")
    .notNull()
    .references(() => drillSessions.id),
  drill_objection_id: uuid("drill_objection_id")
    .notNull()
    .references(() => drillObjections.id),
  answer: uuid("answer").notNull(),
});
