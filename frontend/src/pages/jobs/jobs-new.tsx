import {
  mdiAccount,
  mdiChartTimelineVariant,
  mdiMail,
  mdiUpload,
} from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SwitchField } from '../../components/SwitchField';

import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { RichTextField } from '../../components/RichTextField';

import { create } from '../../stores/jobs/jobsSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  title: '',

  status: 'Initiation',

  task_assignments: '',

  progress_updates: '',

  communication_logs: '',

  assigned_users: [],
};

const JobsNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/jobs/jobs-list');
  };
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='New Item'
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Title'>
                <Field name='title' placeholder='Title' />
              </FormField>

              <FormField label='Status' labelFor='status'>
                <Field name='status' id='status' component='select'>
                  <option value='Initiation'>Initiation</option>

                  <option value='InProgress'>InProgress</option>

                  <option value='Completed'>Completed</option>
                </Field>
              </FormField>

              <FormField label='TaskAssignments' hasTextareaHeight>
                <Field
                  name='task_assignments'
                  as='textarea'
                  placeholder='TaskAssignments'
                />
              </FormField>

              <FormField label='ProgressUpdates' hasTextareaHeight>
                <Field
                  name='progress_updates'
                  as='textarea'
                  placeholder='ProgressUpdates'
                />
              </FormField>

              <FormField label='CommunicationLogs' hasTextareaHeight>
                <Field
                  name='communication_logs'
                  id='communication_logs'
                  component={RichTextField}
                ></Field>
              </FormField>

              <FormField label='AssignedUsers' labelFor='assigned_users'>
                <Field
                  name='assigned_users'
                  id='assigned_users'
                  itemRef={'users'}
                  options={[]}
                  component={SelectFieldMany}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/jobs/jobs-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

JobsNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_JOBS'}>{page}</LayoutAuthenticated>
  );
};

export default JobsNew;
