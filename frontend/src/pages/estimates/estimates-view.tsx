import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/estimates/estimatesSlice';
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

const EstimatesView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { estimates } = useAppSelector((state) => state.estimates);

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
        <title>{getPageTitle('View estimates')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View estimates')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>EstimateNumber</p>
            <p>{estimates?.estimate_number}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>MaterialCost</p>
            <p>{estimates?.material_cost || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>LaborCost</p>
            <p>{estimates?.labor_cost || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>TotalCost</p>
            <p>{estimates?.total_cost || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>ProfitMargin</p>
            <p>{estimates?.profit_margin || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>RelatedJob</p>

            <p>{estimates?.job?.title ?? 'No data'}</p>
          </div>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/estimates/estimates-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

EstimatesView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_ESTIMATES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EstimatesView;
