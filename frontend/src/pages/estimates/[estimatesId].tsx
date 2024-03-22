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

import { update, fetch } from '../../stores/estimates/estimatesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditEstimates = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    estimate_number: '',

    material_cost: '',

    labor_cost: '',

    total_cost: '',

    profit_margin: '',

    job: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { estimates } = useAppSelector((state) => state.estimates);

  const { estimatesId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: estimatesId }));
  }, [estimatesId]);

  useEffect(() => {
    if (typeof estimates === 'object') {
      setInitialValues(estimates);
    }
  }, [estimates]);

  useEffect(() => {
    if (typeof estimates === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = estimates[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [estimates]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: estimatesId, data }));
    await router.push('/estimates/estimates-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit estimates')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit estimates'}
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
                  options={initialValues.job}
                  itemRef={'jobs'}
                  showField={'title'}
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

EditEstimates.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_ESTIMATES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditEstimates;
