import React from 'react';
import CardBox from '../CardBox';
import ImageField from '../ImageField';
import dataFormatter from '../../helpers/dataFormatter';
import { saveFile } from '../../helpers/fileSaver';
import ListActionsPopover from '../ListActionsPopover';
import { useAppSelector } from '../../stores/hooks';
import { Pagination } from '../Pagination';

import { hasPermission } from '../../helpers/userPermissions';
import LoadingSpinner from '../LoadingSpinner';

type Props = {
  contacts: any[];
  loading: boolean;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  currentPage: number;
  numPages: number;
  onPageChange: (page: number) => void;
};

const ListContacts = ({
  contacts,
  loading,
  onEdit,
  onView,
  onDelete,
  currentPage,
  numPages,
  onPageChange,
}: Props) => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const hasUpdatePermission = hasPermission(currentUser, 'UPDATE_CONTACTS');

  return (
    <>
      <div className='relative overflow-x-auto p-4 space-y-4'>
        {loading && <LoadingSpinner />}
        {!loading &&
          contacts.map((item) => (
            <CardBox hasTable key={item.id} className={'rounded'}>
              <div className={'flex items-center overflow-hidden'}>
                <div
                  className={
                    'flex-1 px-4 py-6 h-24 flex items-stretch divide-x-2 dark:divide-dark-700 overflow-x-auto'
                  }
                  onClick={() => onView(item.id)}
                >
                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs text-gray-500'}>FirstName</p>
                    <p className={'line-clamp-2'}>{item.first_name}</p>
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs text-gray-500'}>LastName</p>
                    <p className={'line-clamp-2'}>{item.last_name}</p>
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs text-gray-500'}>PhoneNumber</p>
                    <p className={'line-clamp-2'}>{item.phone_number}</p>
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs text-gray-500'}>Email</p>
                    <p className={'line-clamp-2'}>{item.email}</p>
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs text-gray-500'}>Category</p>
                    <p className={'line-clamp-2'}>{item.category}</p>
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs text-gray-500'}>
                      InteractionHistory
                    </p>
                    <p className={'line-clamp-2'}>{item.interaction_history}</p>
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs text-gray-500'}>ProjectNotes</p>
                    <p className={'line-clamp-2'}>{item.project_notes}</p>
                  </div>
                </div>
                <ListActionsPopover
                  onDelete={onDelete}
                  onView={onView}
                  onEdit={onEdit}
                  itemId={item.id}
                  hasUpdatePermission={hasUpdatePermission}
                />
              </div>
            </CardBox>
          ))}
        {!loading && contacts.length === 0 && (
          <div className='col-span-full flex items-center justify-center h-40'>
            <p className=''>No data to display</p>
          </div>
        )}
      </div>
      <div className={'flex items-center justify-center my-6'}>
        <Pagination
          currentPage={currentPage}
          numPages={numPages}
          setCurrentPage={onPageChange}
        />
      </div>
    </>
  );
};

export default ListContacts;
