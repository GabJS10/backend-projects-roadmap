import { defineDb, defineTable, column, NOW } from 'astro:db';


 const Articles = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    title: column.text({ unique: true }),
    content: column.text(),
    created_at: column.date({ default: NOW }),
    publishing_date: column.text(),
  }
});

export default defineDb({
  tables: {Articles}
});
