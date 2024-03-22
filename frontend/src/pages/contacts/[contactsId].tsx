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

import { update, fetch } from '../../stores/contacts/contactsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditContacts = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    first_name: '',

    last_name: '',

    phone_number: '',

    email: '',

    category: '',

    interaction_history: '',

    project_notes: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { contacts } = useAppSelector((state) => state.contacts);

  const { contactsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: contactsId }));
  }, [contactsId]);

  useEffect(() => {
    if (typeof contacts === 'object') {
      setInitialValues(contacts);
    }
  }, [contacts]);

  useEffect(() => {
    if (typeof contacts === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = contacts[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [contacts]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: contactsId, data }));
    await router.push('/contacts/contacts-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit contacts')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit contacts'}
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
              <FormField label='FirstName'>
                <Field name='first_name' placeholder='FirstName' />
              </FormField>

              <FormField label='LastName'>
                <Field name='last_name' placeholder='LastName' />
              </FormField>

              <FormField label='PhoneNumber'>
                <Field name='phone_number' placeholder='PhoneNumber' />
              </FormField>

              <FormField label='Email'>
                <Field name='email' placeholder='Email' />
              </FormField>

              <FormField label='Category' labelFor='category'>
                <Field name='Category' id='Category' component='select'>
                  <option value='Client'>Client</option>

                  <option value='Supplier'>Supplier</option>

                  <option value='Subcontractor'>Subcontractor</option>
                </Field>
              </FormField>

              <FormField label='InteractionHistory' hasTextareaHeight>
                <Field
                  name='interaction_history'
                  id='interaction_history'
                  component={RichTextField}
                ></Field>
              </FormField>

              <FormField label='ProjectNotes' hasTextareaHeight>
                <Field
                  name='project_notes'
                  id='project_notes'
                  component={RichTextField}
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
                  onClick={() => router.push('/contacts/contacts-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditContacts.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_CONTACTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditContacts;
