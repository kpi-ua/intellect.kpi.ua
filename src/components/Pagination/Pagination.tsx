import type React from 'react';
import { useEffect, useMemo } from 'react';

import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import usePaging from '@/utils/hooks/usePaging';
import { PaginationModel } from '@/types/ecampus';

interface Props {
    pagination: PaginationModel;
    onChange: (currentPage: number) => void;
}

const Pagination: React.FC<Props> = ({ pagination, onChange }) => {
    const pagingMemo = useMemo(() => pagination, [pagination.pageCount, pagination.pageNumber]);
    const { currentPage, onPageChange, totalPages, setTotalPages } = usePaging();

    useEffect(() => {
        onPageChange(pagingMemo.pageNumber);
        setTotalPages(pagingMemo.pageCount);
    }, [pagingMemo]);

    const changePage = (newPage: number) => {
        onPageChange(newPage);
        onChange(newPage);
    };

    return (
        <div className={'flex items-center justify-center mt-6'}>
            {currentPage > 1 ? (
                <button onClick={() => changePage(currentPage - 1)}>
                    <FeatherIcon width={40} className="inline fill-none" icon="chevron-left" />
                    Назад
                </button>
            ) : null}
            <div className="mx-2">
                {currentPage} / {totalPages}
            </div>
            {currentPage < totalPages ? (
                <button onClick={() => changePage(currentPage + 1)}>
                    Далі
                    <FeatherIcon width={40} className="inline fill-none" icon="chevron-right" />
                </button>
            ) : null}
        </div>
    );
};

export default Pagination;
