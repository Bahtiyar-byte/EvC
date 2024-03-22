import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/documents/documentsSlice';
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

const DocumentsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { documents } = useAppSelector((state) => state.documents);

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
        <title>{getPageTitle('View documents')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View documents')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Title</p>
            <p>{documents?.title}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>File</p>
            {documents?.file?.length ? (
              dataFormatter.filesFormatter(documents.file).map((link) => (
                <button
                  key={link.publicUrl}
                  onClick={(e) => saveFile(e, link.publicUrl, link.name)}
                >
                  {link.name}
                </button>
              ))
            ) : (
              <p>No File</p>
            )}
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>RelatedJob</p>

            <p>{documents?.job?.title ?? 'No data'}</p>
          </div>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/documents/documents-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

DocumentsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_DOCUMENTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default DocumentsView;
