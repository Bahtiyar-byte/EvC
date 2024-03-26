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
    start_time: new Date('2023-12-01'),

    end_time: new Date('2023-08-16'),

    description:
      'Death is a natural part of life. Rejoice for those around you who transform into the Force. Mourn them do not. Miss them do not. Attachment leads to jealously. The shadow of greed, that is.',

    // type code here for "relation_many" field
  },

  {
    start_time: new Date('2024-01-07'),

    end_time: new Date('2023-11-27'),

    description:
      'Much to learn you still have my old padawan. ... This is just the beginning!',

    // type code here for "relation_many" field
  },

  {
    start_time: new Date('2024-01-29'),

    end_time: new Date('2023-06-21'),

    description: 'Truly wonderful, the mind of a child is.',

    // type code here for "relation_many" field
  },

  {
    start_time: new Date('2023-10-10'),

    end_time: new Date('2024-01-27'),

    description:
      'Once you start down the dark path, forever will it dominate your destiny, consume you it will.',

    // type code here for "relation_many" field
  },
];

const ContactsData = [
  {
    first_name: "It's around here somewhere",

    last_name: "C'mon Naomi",

    phone_number: 'My boss gonna fire me',

    email: 'salina@steuber.org',

    category: 'Client',

    interaction_history:
      'Always two there are, no more, no less. A master and an apprentice.',

    project_notes: 'Reckless he is. Matters are worse.',

    // type code here for "relation_many" field
  },

  {
    first_name: "That's messed up",

    last_name: "That's messed up",

    phone_number: 'Let me tell ya',

    email: 'billy@ledner.co',

    category: 'Subcontractor',

    interaction_history: 'Already know you that which you need.',

    project_notes:
      'Yes, a Jedi’s strength flows from the Force. But beware of the dark side. Anger, fear, aggression; the dark side of the Force are they. Easily they flow, quick to join you in a fight. If once you start down the dark path, forever will it dominate your destiny, consume you it will, as it did Obi-Wan’s apprentice.',

    // type code here for "relation_many" field
  },

  {
    first_name: 'That damn Bill Stull',

    last_name: 'That goddamn Datamate',

    phone_number: 'Reminds me of my old girlfriend Olga Goodntight',

    email: 'chester@pacocha.name',

    category: 'Client',

    interaction_history:
      'Much to learn you still have my old padawan. ... This is just the beginning!',

    project_notes: 'Ow, ow, OW! On my ear you are!',

    // type code here for "relation_many" field
  },

  {
    first_name: 'Got depression, Smith and Wessen',

    last_name: "C'mon Naomi",

    phone_number: 'My boss gonna fire me',

    email: 'harrison.morissette@okeefe.co',

    category: 'Supplier',

    interaction_history: 'You will find only what you bring in.',

    project_notes:
      'Ready are you? What know you of ready? For eight hundred years have I trained Jedi. My own counsel will I keep on who is to be trained. A Jedi must have the deepest commitment, the most serious mind. This one a long time have I watched. All his life has he looked away - to the future, to the horizon. Never his mind on where he was. Hmm? What he was doing. Hmph. Adventure. Heh. Excitement. Heh. A Jedi craves not these things. You are reckless.',

    // type code here for "relation_many" field
  },
];

const DocumentsData = [
  {
    title: 'Turd gone wrong',

    // type code here for "files" field

    // type code here for "relation_one" field
  },

  {
    title: "It's around here somewhere",

    // type code here for "files" field

    // type code here for "relation_one" field
  },

  {
    title: 'That damn diabetes',

    // type code here for "files" field

    // type code here for "relation_one" field
  },

  {
    title: "Goin' hog huntin'",

    // type code here for "files" field

    // type code here for "relation_one" field
  },
];

const EstimatesData = [
  {
    estimate_number: 'I got that scurvy',

    material_cost: 72.48,

    labor_cost: 17.34,

    total_cost: 19.51,

    profit_margin: 67.73,

    // type code here for "relation_one" field
  },

  {
    estimate_number: 'That damn diabetes',

    material_cost: 17.35,

    labor_cost: 20.01,

    total_cost: 46.17,

    profit_margin: 66.65,

    // type code here for "relation_one" field
  },

  {
    estimate_number: 'Might be DQ time',

    material_cost: 87.04,

    labor_cost: 94.76,

    total_cost: 79.08,

    profit_margin: 21.69,

    // type code here for "relation_one" field
  },

  {
    estimate_number: 'No one tells me shit',

    material_cost: 99.54,

    labor_cost: 69.67,

    total_cost: 66.22,

    profit_margin: 33.48,

    // type code here for "relation_one" field
  },
];

const InvoicesData = [
  {
    invoice_number: 'Like a red-headed stepchild',

    amount: 82.03,

    issue_date: new Date('2023-11-23'),

    status: 'Paid',

    // type code here for "relation_one" field
  },

  {
    invoice_number: 'That goddamn Datamate',

    amount: 67.85,

    issue_date: new Date('2023-11-10'),

    status: 'Draft',

    // type code here for "relation_one" field
  },

  {
    invoice_number: 'I tell you what',

    amount: 25.38,

    issue_date: new Date('2023-07-16'),

    status: 'Overdue',

    // type code here for "relation_one" field
  },

  {
    invoice_number: 'That damn gimble',

    amount: 22.66,

    issue_date: new Date('2023-12-28'),

    status: 'Overdue',

    // type code here for "relation_one" field
  },
];

const JobsData = [
  {
    title: "Goin' hog huntin'",

    status: 'Completed',

    task_assignments:
      'Yes, a Jedi’s strength flows from the Force. But beware of the dark side. Anger, fear, aggression; the dark side of the Force are they. Easily they flow, quick to join you in a fight. If once you start down the dark path, forever will it dominate your destiny, consume you it will, as it did Obi-Wan’s apprentice.',

    progress_updates:
      'Through the Force, things you will see. Other places. The future - the past. Old friends long gone.',

    communication_logs:
      'Adventure. Excitement. A Jedi craves not these things.',

    // type code here for "relation_many" field
  },

  {
    title: "C'mon Naomi",

    status: 'Initiation',

    task_assignments:
      'The dark side clouds everything. Impossible to see the future is.',

    progress_updates: 'Reckless he is. Matters are worse.',

    communication_logs:
      'Death is a natural part of life. Rejoice for those around you who transform into the Force. Mourn them do not. Miss them do not. Attachment leads to jealously. The shadow of greed, that is.',

    // type code here for "relation_many" field
  },

  {
    title: 'I got that scurvy',

    status: 'InProgress',

    task_assignments:
      'Strong is Vader. Mind what you have learned. Save you it can.',

    progress_updates: 'Adventure. Excitement. A Jedi craves not these things.',

    communication_logs: 'Reckless he is. Matters are worse.',

    // type code here for "relation_many" field
  },

  {
    title: 'I want my damn cart back',

    status: 'Completed',

    task_assignments:
      'Always two there are, no more, no less. A master and an apprentice.',

    progress_updates: 'Do. Or do not. There is no try.',

    communication_logs:
      'Strong is Vader. Mind what you have learned. Save you it can.',

    // type code here for "relation_many" field
  },
];

const ReportsData = [
  {
    title: 'I tell you what',

    date_generated: new Date('2023-09-25'),

    // type code here for "files" field
  },

  {
    title: 'Standby',

    date_generated: new Date('2023-09-18'),

    // type code here for "files" field
  },

  {
    title: 'That damn Bill Stull',

    date_generated: new Date('2024-03-17'),

    // type code here for "files" field
  },

  {
    title: 'That damn diabetes',

    date_generated: new Date('2023-04-09'),

    // type code here for "files" field
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
