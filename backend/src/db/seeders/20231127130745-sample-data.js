const db = require('../models');
const Users = db.users;

const Appointments = db.appointments;

const Contacts = db.contacts;

const Documents = db.documents;

const Estimates = db.estimates;

const Invoices = db.invoices;

const Jobs = db.jobs;

const Reports = db.reports;

const Trades = db.trades;

const AppointmentsData = [
  {
    start_time: new Date('2023-08-11'),

    end_time: new Date('2023-05-08'),

    description:
      'The dark side clouds everything. Impossible to see the future is.',

    // type code here for "relation_many" field
  },

  {
    start_time: new Date('2023-11-04'),

    end_time: new Date('2023-04-30'),

    description: 'You will find only what you bring in.',

    // type code here for "relation_many" field
  },

  {
    start_time: new Date('2023-08-25'),

    end_time: new Date('2024-01-10'),

    description: 'Ow, ow, OW! On my ear you are!',

    // type code here for "relation_many" field
  },

  {
    start_time: new Date('2024-01-31'),

    end_time: new Date('2023-10-11'),

    description: 'Difficult to see. Always in motion is the future...',

    // type code here for "relation_many" field
  },

  {
    start_time: new Date('2023-11-08'),

    end_time: new Date('2024-01-15'),

    description: 'Your weapons, you will not need them.',

    // type code here for "relation_many" field
  },
];

const ContactsData = [
  {
    first_name: "Goin' hog huntin'",

    last_name: 'Let me tell ya',

    phone_number: 'That damn diabetes',

    email: 'dominica@hammes.biz',

    category: 'Client',

    interaction_history: 'Not if anything to say about it I have',

    project_notes: 'Good relations with the Wookiees, I have.',

    // type code here for "relation_many" field
  },

  {
    first_name: 'That damn gimble',

    last_name: "That Barbala couldn't fly his way out of a wet paper bag",

    phone_number: 'My boss gonna fire me',

    email: 'shane@spinka.info',

    category: 'Supplier',

    interaction_history: 'Already know you that which you need.',

    project_notes: 'Younglings, younglings gather ’round.',

    // type code here for "relation_many" field
  },

  {
    first_name: 'Got depression, Smith and Wessen',

    last_name: 'That damn gimble',

    phone_number: "C'mon Naomi",

    email: 'prince@harber.com',

    category: 'Subcontractor',

    interaction_history:
      'Soon will I rest, yes, forever sleep. Earned it I have. Twilight is upon me, soon night must fall.',

    project_notes: 'Good relations with the Wookiees, I have.',

    // type code here for "relation_many" field
  },

  {
    first_name: 'Yup',

    last_name: 'That damn diabetes',

    phone_number: 'Let me tell ya',

    email: 'reuben@hahn.com',

    category: 'Supplier',

    interaction_history: 'You will find only what you bring in.',

    project_notes:
      'Strong is Vader. Mind what you have learned. Save you it can.',

    // type code here for "relation_many" field
  },

  {
    first_name: "It's around here somewhere",

    last_name: 'Got depression, Smith and Wessen',

    phone_number: 'I got that scurvy',

    email: 'young.pouros@veum.org',

    category: 'Subcontractor',

    interaction_history:
      'Once you start down the dark path, forever will it dominate your destiny, consume you it will.',

    project_notes:
      'Size matters not. Look at me. Judge me by my size, do you? Hmm? Hmm. And well you should not. For my ally is the Force, and a powerful ally it is. Life creates it, makes it grow. Its energy surrounds us and binds us. Luminous beings are we, not this crude matter. You must feel the Force around you; here, between you, me, the tree, the rock, everywhere, yes. Even between the land and the ship.',

    // type code here for "relation_many" field
  },
];

const DocumentsData = [
  {
    title: 'Let me tell ya',

    // type code here for "files" field

    // type code here for "relation_one" field
  },

  {
    title: 'Contact the tower',

    // type code here for "files" field

    // type code here for "relation_one" field
  },

  {
    title: 'My boss gonna fire me',

    // type code here for "files" field

    // type code here for "relation_one" field
  },

  {
    title: 'Like a red-headed stepchild',

    // type code here for "files" field

    // type code here for "relation_one" field
  },

  {
    title: 'Contact the tower',

    // type code here for "files" field

    // type code here for "relation_one" field
  },
];

const EstimatesData = [
  {
    estimate_number: "I'm washing my hands of it",

    material_cost: 29.01,

    labor_cost: 34.99,

    total_cost: 13.86,

    profit_margin: 51.69,

    // type code here for "relation_one" field
  },

  {
    estimate_number: 'No one tells me shit',

    material_cost: 18.09,

    labor_cost: 98.37,

    total_cost: 15.11,

    profit_margin: 53.36,

    // type code here for "relation_one" field
  },

  {
    estimate_number: 'I want my damn cart back',

    material_cost: 42.41,

    labor_cost: 10.27,

    total_cost: 68.08,

    profit_margin: 80.66,

    // type code here for "relation_one" field
  },

  {
    estimate_number: "It's around here somewhere",

    material_cost: 28.64,

    labor_cost: 99.72,

    total_cost: 75.91,

    profit_margin: 72.22,

    // type code here for "relation_one" field
  },

  {
    estimate_number: 'Always the last one to the party',

    material_cost: 83.35,

    labor_cost: 92.32,

    total_cost: 59.81,

    profit_margin: 44.98,

    // type code here for "relation_one" field
  },
];

const InvoicesData = [
  {
    invoice_number: 'Yup',

    amount: 64.26,

    issue_date: new Date('2023-04-12'),

    status: 'Overdue',

    // type code here for "relation_one" field
  },

  {
    invoice_number: 'Got depression, Smith and Wessen',

    amount: 68.78,

    issue_date: new Date('2023-11-27'),

    status: 'Draft',

    // type code here for "relation_one" field
  },

  {
    invoice_number: 'That damn Bill Stull',

    amount: 71.97,

    issue_date: new Date('2023-09-18'),

    status: 'Paid',

    // type code here for "relation_one" field
  },

  {
    invoice_number: 'That damn diabetes',

    amount: 93.48,

    issue_date: new Date('2024-03-07'),

    status: 'Sent',

    // type code here for "relation_one" field
  },

  {
    invoice_number: 'Always the last one to the party',

    amount: 15.92,

    issue_date: new Date('2024-02-29'),

    status: 'Sent',

    // type code here for "relation_one" field
  },
];

const JobsData = [
  {
    title: 'I want my damn cart back',

    status: 'Initiation',

    task_assignments: 'Always pass on what you have learned.',

    progress_updates: 'Ow, ow, OW! On my ear you are!',

    communication_logs:
      'Like fire across the galaxy the Clone Wars spread. In league with the wicked Count Dooku, more and more planets slip. Against this threat, upon the Jedi Knights falls the duty to lead the newly formed army of the Republic. And as the heat of war grows, so, to, grows the prowess of one most gifted student of the Force.',

    // type code here for "relation_many" field
  },

  {
    title: 'Contact the tower',

    status: 'InProgress',

    task_assignments:
      'Size matters not. Look at me. Judge me by my size, do you? Hmm? Hmm. And well you should not. For my ally is the Force, and a powerful ally it is. Life creates it, makes it grow. Its energy surrounds us and binds us. Luminous beings are we, not this crude matter. You must feel the Force around you; here, between you, me, the tree, the rock, everywhere, yes. Even between the land and the ship.',

    progress_updates: 'Luminous beings are we - not this crude matter.',

    communication_logs: 'Already know you that which you need.',

    // type code here for "relation_many" field
  },

  {
    title: 'I want my damn cart back',

    status: 'Initiation',

    task_assignments:
      'Pain, suffering, death I feel. Something terrible has happened. Young Skywalker is in pain. Terrible pain',

    progress_updates: 'Around the survivors a perimeter create.',

    communication_logs: 'Luminous beings are we - not this crude matter.',

    // type code here for "relation_many" field
  },

  {
    title: 'I tell you what',

    status: 'Completed',

    task_assignments: 'Difficult to see. Always in motion is the future...',

    progress_updates:
      'The dark side clouds everything. Impossible to see the future is.',

    communication_logs:
      'Death is a natural part of life. Rejoice for those around you who transform into the Force. Mourn them do not. Miss them do not. Attachment leads to jealously. The shadow of greed, that is.',

    // type code here for "relation_many" field
  },

  {
    title: 'Always the last one to the party',

    status: 'InProgress',

    task_assignments:
      'Yes, a Jedi’s strength flows from the Force. But beware of the dark side. Anger, fear, aggression; the dark side of the Force are they. Easily they flow, quick to join you in a fight. If once you start down the dark path, forever will it dominate your destiny, consume you it will, as it did Obi-Wan’s apprentice.',

    progress_updates:
      'Size matters not. Look at me. Judge me by my size, do you? Hmm? Hmm. And well you should not. For my ally is the Force, and a powerful ally it is. Life creates it, makes it grow. Its energy surrounds us and binds us. Luminous beings are we, not this crude matter. You must feel the Force around you; here, between you, me, the tree, the rock, everywhere, yes. Even between the land and the ship.',

    communication_logs:
      'Much to learn you still have my old padawan. ... This is just the beginning!',

    // type code here for "relation_many" field
  },
];

const ReportsData = [
  {
    title: "It's around here somewhere",

    date_generated: new Date('2023-06-12'),

    // type code here for "files" field
  },

  {
    title: 'Always the last one to the party',

    date_generated: new Date('2024-03-28'),

    // type code here for "files" field
  },

  {
    title: "It's around here somewhere",

    date_generated: new Date('2023-06-12'),

    // type code here for "files" field
  },

  {
    title: 'That goddamn Datamate',

    date_generated: new Date('2024-03-26'),

    // type code here for "files" field
  },

  {
    title: 'I want my 5$ back',

    date_generated: new Date('2023-05-27'),

    // type code here for "files" field
  },
];

const TradesData = [
  {
    trade: "That's messed up",
  },

  {
    trade: 'Yup',
  },

  {
    trade: 'Always the last one to the party',
  },

  {
    trade: 'Texas!',
  },

  {
    trade: 'That damn gimble',
  },
];

// Similar logic for "relation_many"

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

  const relatedJob3 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Document3 = await Documents.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Document3?.setJob) {
    await Document3.setJob(relatedJob3);
  }

  const relatedJob4 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Document4 = await Documents.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Document4?.setJob) {
    await Document4.setJob(relatedJob4);
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

  const relatedJob3 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Estimate3 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Estimate3?.setJob) {
    await Estimate3.setJob(relatedJob3);
  }

  const relatedJob4 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Estimate4 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Estimate4?.setJob) {
    await Estimate4.setJob(relatedJob4);
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

  const relatedJob3 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Invoice3 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Invoice3?.setJob) {
    await Invoice3.setJob(relatedJob3);
  }

  const relatedJob4 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Invoice4 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Invoice4?.setJob) {
    await Invoice4.setJob(relatedJob4);
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

    await Trades.bulkCreate(TradesData);

    await Promise.all([
      // Similar logic for "relation_many"

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

    await queryInterface.bulkDelete('trades', null, {});
  },
};
