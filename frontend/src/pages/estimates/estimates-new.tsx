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

import { create } from '../../stores/estimates/estimatesSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  estimate_number: '',

  material_cost: '',

  labor_cost: '',

  total_cost: '',

  profit_margin: '',

  job: '',
};

const EstimatesNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/estimates/estimates-list');
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
              <FormField label='EstimateNumber'>
                <Field name='estimate_number' placeholder='EstimateNumber' />
              </FormField>

              <FormField label='MaterialCost'>
                <Field
                  type='number'
                  name='material_cost'
                  placeholder='MaterialCost'
                />
              </FormField>

              <FormField label='LaborCost'>
                <Field
                  type='number'
                  name='labor_cost'
                  placeholder='LaborCost'
                />
              </FormField>

              <FormField label='TotalCost'>
                <Field
                  type='number'
                  name='total_cost'
                  placeholder='TotalCost'
                />
              </FormField>

              <FormField label='ProfitMargin'>
                <Field
                  type='number'
                  name='profit_margin'
                  placeholder='ProfitMargin'
                />
              </FormField>

              <FormField label='RelatedJob' labelFor='job'>
                <Field
                  name='job'
                  id='job'
                  component={SelectField}
                  options={[]}
                  itemRef={'jobs'}
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
                  onClick={() => router.push('/estimates/estimates-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EstimatesNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_ESTIMATES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EstimatesNew;
