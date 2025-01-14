import { useState } from 'react';

const usePaging = () => {
    const [currentpage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    return {
        currentPage,
        onPageChange: setCurrentPage,
        totalPages,
        setTotalPages,
    };
};

export default usePaging;
