const db = require('../models');
const Users = db.users;

const Appointments = db.appointments;

const Contacts = db.contacts;

const Documents = db.documents;

const Estimates = db.estimates;

const Invoices = db.invoices;

const Jobs = db.jobs;

const Reports = db.reports;

const AppointmentsData = [
  {
    start_time: new Date('2023-05-28'),

    end_time: new Date('2024-01-28'),

    description:
      'Yes, a Jedi’s strength flows from the Force. But beware of the dark side. Anger, fear, aggression; the dark side of the Force are they. Easily they flow, quick to join you in a fight. If once you start down the dark path, forever will it dominate your destiny, consume you it will, as it did Obi-Wan’s apprentice.',

    // type code here for "relation_many" field
  },

  {
    start_time: new Date('2024-03-06'),

    end_time: new Date('2023-06-06'),

    description: 'Adventure. Excitement. A Jedi craves not these things.',

    // type code here for "relation_many" field
  },

  {
    start_time: new Date('2023-10-09'),

    end_time: new Date('2023-06-11'),

    description:
      'Soon will I rest, yes, forever sleep. Earned it I have. Twilight is upon me, soon night must fall.',

    // type code here for "relation_many" field
  },
];

const ContactsData = [
  {
    first_name: 'Yup',

    last_name: 'Texas!',

    phone_number: "Goin' hog huntin'",

    email: 'enrique.hilpert@oreilly.com',

    category: 'Client',

    interaction_history: 'Mudhole? Slimy? My home this is!',

    project_notes:
      'Pain, suffering, death I feel. Something terrible has happened. Young Skywalker is in pain. Terrible pain',
  },

  {
    first_name: 'Texas!',

    last_name: "C'mon Naomi",

    phone_number: 'Turd gone wrong',

    email: 'conrad_mayert@bechtelar-luettgen.biz',

    category: 'Supplier',

    interaction_history:
      'Pain, suffering, death I feel. Something terrible has happened. Young Skywalker is in pain. Terrible pain',

    project_notes: 'Luminous beings are we - not this crude matter.',
  },

  {
    first_name: 'Got depression, Smith and Wessen',

    last_name: "That Barbala couldn't fly his way out of a wet paper bag",

    phone_number: 'That damn gimble',

    email: 'janean@collier-zemlak.biz',

    category: 'Supplier',

    interaction_history: 'That is why you fail.',

    project_notes: 'To answer power with power, the Jedi way this is',
  },
];

const DocumentsData = [
  {
    title: "That Barbala couldn't fly his way out of a wet paper bag",

    // type code here for "files" field

    // type code here for "relation_one" field
  },

  {
    title: "That's messed up",

    // type code here for "files" field

    // type code here for "relation_one" field
  },

  {
    title: 'Let me tell ya',

    // type code here for "files" field

    // type code here for "relation_one" field
  },
];

const EstimatesData = [
  {
    estimate_number: 'Reminds me of my old girlfriend Olga Goodntight',

    material_cost: 52.91,

    labor_cost: 59.78,

    total_cost: 34.15,

    profit_margin: 43.14,

    // type code here for "relation_one" field
  },

  {
    estimate_number: 'That damn gimble',

    material_cost: 23.86,

    labor_cost: 42.93,

    total_cost: 47.87,

    profit_margin: 84.71,

    // type code here for "relation_one" field
  },

  {
    estimate_number: 'I got that scurvy',

    material_cost: 23.55,

    labor_cost: 94.02,

    total_cost: 92.45,

    profit_margin: 66.28,

    // type code here for "relation_one" field
  },
];

const InvoicesData = [
  {
    invoice_number: 'Let me tell ya',

    amount: 81.09,

    issue_date: new Date('2023-08-11'),

    status: 'Paid',

    // type code here for "relation_one" field
  },

  {
    invoice_number: 'That goddamn Datamate',

    amount: 67.72,

    issue_date: new Date('2023-06-18'),

    status: 'Overdue',

    // type code here for "relation_one" field
  },

  {
    invoice_number: "That's messed up",

    amount: 33.45,

    issue_date: new Date('2023-09-01'),

    status: 'Overdue',

    // type code here for "relation_one" field
  },
];

const JobsData = [
  {
    title: 'Always the last one to the party',

    status: 'Initiation',

    task_assignments:
      'Pain, suffering, death I feel. Something terrible has happened. Young Skywalker is in pain. Terrible pain',

    progress_updates:
      'Much to learn you still have my old padawan. ... This is just the beginning!',

    communication_logs: 'Good relations with the Wookiees, I have.',

    // type code here for "relation_many" field
  },

  {
    title: 'I want my damn cart back',

    status: 'Completed',

    task_assignments: 'Your weapons, you will not need them.',

    progress_updates: 'To answer power with power, the Jedi way this is',

    communication_logs:
      'Through the Force, things you will see. Other places. The future - the past. Old friends long gone.',

    // type code here for "relation_many" field
  },

  {
    title: "That Barbala couldn't fly his way out of a wet paper bag",

    status: 'Initiation',

    task_assignments: 'Ow, ow, OW! On my ear you are!',

    progress_updates: 'Your weapons, you will not need them.',

    communication_logs:
      'Through the Force, things you will see. Other places. The future - the past. Old friends long gone.',

    // type code here for "relation_many" field
  },
];

const ReportsData = [
  {
    title: 'No one tells me shit',

    date_generated: new Date('2023-10-24'),

    // type code here for "files" field
  },

  {
    title: "It's around here somewhere",

    date_generated: new Date('2023-06-09'),

    // type code here for "files" field
  },

  {
    title: "How 'bout them Cowboys",

    date_generated: new Date('2024-02-13'),

    // type code here for "files" field
  },
];

// Similar logic for "relation_many"

// Similar logic for "relation_many"

async function associateDocumentWithJob() {
  const relatedJob0 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Document0 = await Documents.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Document0?.setJob) {
    await Document0.setJob(relatedJob0);
  }

  const relatedJob1 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Document1 = await Documents.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Document1?.setJob) {
    await Document1.setJob(relatedJob1);
  }

  const relatedJob2 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Document2 = await Documents.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Document2?.setJob) {
    await Document2.setJob(relatedJob2);
  }
}

async function associateEstimateWithJob() {
  const relatedJob0 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Estimate0 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Estimate0?.setJob) {
    await Estimate0.setJob(relatedJob0);
  }

  const relatedJob1 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Estimate1 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Estimate1?.setJob) {
    await Estimate1.setJob(relatedJob1);
  }

  const relatedJob2 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Estimate2 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Estimate2?.setJob) {
    await Estimate2.setJob(relatedJob2);
  }
}

async function associateInvoiceWithJob() {
  const relatedJob0 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Invoice0 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Invoice0?.setJob) {
    await Invoice0.setJob(relatedJob0);
  }

  const relatedJob1 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Invoice1 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Invoice1?.setJob) {
    await Invoice1.setJob(relatedJob1);
  }

  const relatedJob2 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Invoice2 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Invoice2?.setJob) {
    await Invoice2.setJob(relatedJob2);
  }
}

// Similar logic for "relation_many"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Appointments.bulkCreate(AppointmentsData);

    await Contacts.bulkCreate(ContactsData);

    await Documents.bulkCreate(DocumentsData);

    await Estimates.bulkCreate(EstimatesData);

    await Invoices.bulkCreate(InvoicesData);

    await Jobs.bulkCreate(JobsData);

    await Reports.bulkCreate(ReportsData);

    await Promise.all([
      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      await associateDocumentWithJob(),

      await associateEstimateWithJob(),

      await associateInvoiceWithJob(),

      // Similar logic for "relation_many"
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('appointments', null, {});

    await queryInterface.bulkDelete('contacts', null, {});

    await queryInterface.bulkDelete('documents', null, {});

    await queryInterface.bulkDelete('estimates', null, {});

    await queryInterface.bulkDelete('invoices', null, {});

    await queryInterface.bulkDelete('jobs', null, {});

    await queryInterface.bulkDelete('reports', null, {});
  },
};
