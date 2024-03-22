import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/jobs/jobsSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

const JobsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { jobs } = useAppSelector((state) => state.jobs);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View jobs')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View jobs')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Title</p>
            <p>{jobs?.title}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Status</p>
            <p>{jobs?.status ?? 'No data'}</p>
          </div>

          <FormField label='Multi Text' hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={jobs?.task_assignments}
            />
          </FormField>

          <FormField label='Multi Text' hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={jobs?.progress_updates}
            />
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>CommunicationLogs</p>
            {jobs.communication_logs ? (
              <p
                dangerouslySetInnerHTML={{ __html: jobs.communication_logs }}
              />
            ) : (
              <p>No data</p>
            )}
          </div>

          <>
            <p className={'block font-bold mb-2'}>AssignedUsers</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>First Name</th>

                      <th>Last Name</th>

                      <th>Phone Number</th>

                      <th>E-Mail</th>

                      <th>Disabled</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.assigned_users &&
                      Array.isArray(jobs.assigned_users) &&
                      jobs.assigned_users.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/users/users-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='firstName'>{item.firstName}</td>

                          <td data-label='lastName'>{item.lastName}</td>

                          <td data-label='phoneNumber'>{item.phoneNumber}</td>

                          <td data-label='email'>{item.email}</td>

                          <td data-label='disabled'>
                            {dataFormatter.booleanFormatter(item.disabled)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!jobs?.assigned_users?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Documents RelatedJob</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.documents_job &&
                      Array.isArray(jobs.documents_job) &&
                      jobs.documents_job.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/documents/documents-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='title'>{item.title}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!jobs?.documents_job?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Estimates RelatedJob</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>EstimateNumber</th>

                      <th>MaterialCost</th>

                      <th>LaborCost</th>

                      <th>TotalCost</th>

                      <th>ProfitMargin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.estimates_job &&
                      Array.isArray(jobs.estimates_job) &&
                      jobs.estimates_job.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/estimates/estimates-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='estimate_number'>
                            {item.estimate_number}
                          </td>

                          <td data-label='material_cost'>
                            {item.material_cost}
                          </td>

                          <td data-label='labor_cost'>{item.labor_cost}</td>

                          <td data-label='total_cost'>{item.total_cost}</td>

                          <td data-label='profit_margin'>
                            {item.profit_margin}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!jobs?.estimates_job?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Invoices RelatedJob</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>InvoiceNumber</th>

                      <th>Amount</th>

                      <th>IssueDate</th>

                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.invoices_job &&
                      Array.isArray(jobs.invoices_job) &&
                      jobs.invoices_job.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/invoices/invoices-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='invoice_number'>
                            {item.invoice_number}
                          </td>

                          <td data-label='amount'>{item.amount}</td>

                          <td data-label='issue_date'>
                            {dataFormatter.dateTimeFormatter(item.issue_date)}
                          </td>

                          <td data-label='status'>{item.status}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!jobs?.invoices_job?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/jobs/jobs-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

JobsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_JOBS'}>{page}</LayoutAuthenticated>
  );
};

export default JobsView;
