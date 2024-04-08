import {
  mdiAccountCircle,
  mdiMonitor,
  mdiGithub,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiPalette,
  mdiVuejs,
} from '@mdi/js';
import { MenuAsideItem } from './interfaces';

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: mdiMonitor,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    icon: mdiTable,
    permissions: 'READ_USERS',
  },
  {
    href: '/appointments/appointments-list',
    label: 'Appointments',
    icon: mdiTable,
    permissions: 'READ_APPOINTMENTS',
  },
  {
    href: '/contacts/contacts-list',
    label: 'Contacts',
    icon: mdiTable,
    permissions: 'READ_CONTACTS',
  },
  {
    href: '/documents/documents-list',
    label: 'Documents',
    icon: mdiTable,
    permissions: 'READ_DOCUMENTS',
  },
  {
    href: '/estimates/estimates-list',
    label: 'Estimates',
    icon: mdiTable,
    permissions: 'READ_ESTIMATES',
  },
  {
    href: '/invoices/invoices-list',
    label: 'Invoices',
    icon: mdiTable,
    permissions: 'READ_INVOICES',
  },
  {
    href: '/jobs/jobs-list',
    label: 'Jobs',
    icon: mdiTable,
    permissions: 'READ_JOBS',
  },
  {
    href: '/reports/reports-list',
    label: 'Reports',
    icon: mdiTable,
    permissions: 'READ_REPORTS',
  },
  {
    href: '/roles/roles-list',
    label: 'Roles',
    icon: mdiTable,
    permissions: 'READ_ROLES',
  },
  {
    href: '/permissions/permissions-list',
    label: 'Permissions',
    icon: mdiTable,
    permissions: 'READ_PERMISSIONS',
  },
  {
    href: '/trades/trades-list',
    label: 'Trades',
    icon: mdiTable,
    permissions: 'READ_TRADES',
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: mdiAccountCircle,
  },
  {
    href: '/api-docs',
    label: 'Swagger API',
    icon: mdiAccountCircle,
    permissions: 'READ_API_DOCS',
  },
];

export default menuAside;
