import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

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
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/jobs/jobsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditJobs = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    title: '',

    status: '',

    task_assignments: '',

    progress_updates: '',

    communication_logs: '',

    assigned_users: [],
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { jobs } = useAppSelector((state) => state.jobs);

  const { jobsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: jobsId }));
  }, [jobsId]);

  useEffect(() => {
    if (typeof jobs === 'object') {
      setInitialValues(jobs);
    }
  }, [jobs]);

  useEffect(() => {
    if (typeof jobs === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = jobs[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [jobs]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: jobsId, data }));
    await router.push('/jobs/jobs-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit jobs')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit jobs'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Title'>
                <Field name='title' placeholder='Title' />
              </FormField>

              <FormField label='Status' labelFor='status'>
                <Field name='Status' id='Status' component='select'>
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
                  component={SelectFieldMany}
                  options={initialValues.assigned_users}
                  itemRef={'users'}
                  showField={'firstName'}
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

EditJobs.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_JOBS'}>{page}</LayoutAuthenticated>
  );
};

export default EditJobs;
