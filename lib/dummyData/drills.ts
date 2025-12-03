import { Drill, DrillObjection } from "../types";

export const dummyDrills: Drill[] = [
  {
    id: "drill_1",
    organization_id: "org_1",
    title: "Cold Call Introduction",
    description: "Practice delivering a concise and confident intro.",
    date_created: "2025-01-01",
    last_updated: "2025-01-01",
  },
  {
    id: "drill_2",
    organization_id: "org_1",
    title: "Pricing Objection",
    description: "Handle common pricing concerns with confidence.",
    date_created: "2025-01-02",
    last_updated: "2025-01-03",
  },
  {
    id: "drill_3",
    organization_id: "org_1",
    title: "Competitor Comparison",
    description: "Address comparisons to competing products.",
    date_created: "2025-01-03",
    last_updated: "2025-01-03",
  },
  {
    id: "drill_4",
    organization_id: "org_1",
    title: "Closing Questions",
    description: "Work through questions meant to delay a close.",
    date_created: "2025-01-04",
    last_updated: "2025-01-04",
  },
]

export const dummyDrillObjections: DrillObjection[] = [
  // ===== Drill 1 =====
  {
    id: "obj_1_1",
    drill_id: "drill_1",
    position: 1,
    objection: "I'm not interested right now.",
    ideal_response: "Totally understand. May I ask what your top priority is this quarter?",
  },
  {
    id: "obj_1_2",
    drill_id: "drill_1",
    position: 2,
    objection: "How did you get my number?",
    ideal_response: "I only reach out to companies that might benefit. I can explain why I reached out.",
  },
  {
    id: "obj_1_3",
    drill_id: "drill_1",
    position: 3,
    objection: "I'm too busy.",
    ideal_response: "Absolutely. I can keep it to 20 seconds—sound good?",
  },
  {
    id: "obj_1_4",
    drill_id: "drill_1",
    position: 4,
    objection: "Send me an email.",
    ideal_response: "Happy to. Before I do, two quick questions to make it relevant?",
  },
  {
    id: "obj_1_5",
    drill_id: "drill_1",
    position: 5,
    objection: "We’re already working with someone.",
    ideal_response: "Makes total sense. What do you like most about your current solution?",
  },

  // ===== Drill 2 =====
  {
    id: "obj_2_1",
    drill_id: "drill_2",
    position: 1,
    objection: "Your price is too high.",
    ideal_response: "I hear that often at first. May I ask compared to what?",
  },
  {
    id: "obj_2_2",
    drill_id: "drill_2",
    position: 2,
    objection: "We don't have the budget.",
    ideal_response: "Understood. Many clients felt that until they saw the ROI breakdown.",
  },
  {
    id: "obj_2_3",
    drill_id: "drill_2",
    position: 3,
    objection: "We can build this ourselves.",
    ideal_response: "Some teams try. Usually timeline or upkeep becomes the challenge—how would you handle that?",
  },
  {
    id: "obj_2_4",
    drill_id: "drill_2",
    position: 4,
    objection: "It doesn't seem worth the cost.",
    ideal_response: "Fair. Can I walk you through the outcomes similar clients achieved?",
  },
  {
    id: "obj_2_5",
    drill_id: "drill_2",
    position: 5,
    objection: "Can you give us a discount?",
    ideal_response: "Possibly—depends on term length. What were you thinking?",
  },

  // ===== Drill 3 =====
  {
    id: "obj_3_1",
    drill_id: "drill_3",
    position: 1,
    objection: "Competitor X is cheaper.",
    ideal_response: "True, but price differences usually reflect support and long-term value. What matters most to you?",
  },
  {
    id: "obj_3_2",
    drill_id: "drill_3",
    position: 2,
    objection: "Why should I pick you over competitor Y?",
    ideal_response: "Good question. Most companies choose us for reliability and service—can I share examples?",
  },
  {
    id: "obj_3_3",
    drill_id: "drill_3",
    position: 3,
    objection: "Competitor Z said they can do the same thing.",
    ideal_response: "They might! Curious—did they show how they handle scaling or integrations?",
  },
  {
    id: "obj_3_4",
    drill_id: "drill_3",
    position: 4,
    objection: "We already use competitor tools.",
    ideal_response: "Makes sense. What would make you consider switching?",
  },
  {
    id: "obj_3_5",
    drill_id: "drill_3",
    position: 5,
    objection: "Competitor gives us special terms.",
    ideal_response: "Totally fair. If we could match the value, would you be open to a comparison?",
  },

  // ===== Drill 4 =====
  {
    id: "obj_4_1",
    drill_id: "drill_4",
    position: 1,
    objection: "I need to think about it.",
    ideal_response: "Of course. What specifically do you want to think through?",
  },
  {
    id: "obj_4_2",
    drill_id: "drill_4",
    position: 2,
    objection: "Let me talk with my team first.",
    ideal_response: "Great idea. What do you think they'll want to know before deciding?",
  },
  {
    id: "obj_4_3",
    drill_id: "drill_4",
    position: 3,
    objection: "Can you send more information?",
    ideal_response: "Yes—but to save time, what details matter most to you?",
  },
  {
    id: "obj_4_4",
    drill_id: "drill_4",
    position: 4,
    objection: "Now isn't the right time.",
    ideal_response: "I get it. When would be the right time and why?",
  },
  {
    id: "obj_4_5",
    drill_id: "drill_4",
    position: 5,
    objection: "We’re not ready to make a decision.",
    ideal_response: "No problem. What needs to happen before you're ready?",
  },
]
