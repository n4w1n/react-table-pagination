import React, { useState } from 'react';

const filterPages = (visiblePages, totalPages) => {
    return visiblePages.filter(page => page <= totalPages);
};

const getVisiblePages = (page, total) => {
    if (total < 7) {
        return filterPages([1, 2, 3, 4, 5, 6], total);
    } else {
        if (page % 5 >= 0 && page > 4 && page + 2 < total) {
            return [1, page - 1, page, page + 1, total];
        } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
            return [1, total - 3, total - 2, total - 1, total];
        } else {
            return [1, 2, 3, 4, 5, total];
        }
    }
};

const Pagination = ({ pages, page, onPageChange, previousText, nextText }) => {
    const [visiblePages, setVisiblePages] = useState(getVisiblePages(0, pages));
    const changePage = p => {
        if (p === page + 1) {
            return;
        }
        const vps = getVisiblePages(p, pages);
        setVisiblePages(filterPages(vps, pages));
        onPageChange(p - 1);
    };

    const activePage = page + 1;

    return (
        <div className="Table__pagination">
            <div className="Table__prevPageWrapper">
                <button
                    className="Table__pageButton"
                    onClick={() => {
                        if (activePage === 1) return;
                        changePage(activePage - 1);
                    }}
                    disabled={activePage === 1}
                >
                    {previousText}
                </button>
            </div>
            <div className="Table__visiblePagesWrapper">
                {visiblePages.map((p, index, array) => {
                    return (
                        <button
                            key={p}
                            className={
                                activePage === p
                                    ? 'Table__pageButton Table__pageButton--active'
                                    : 'Table__pageButton'
                            }
                            onClick={() => changePage(p)}
                        >
                            {array[index - 1] + 2 < p ? `...${p}` : p}
                        </button>
                    );
                })}
            </div>
            <div className="Table__nextPageWrapper">
                <button
                    className="Table__pageButton"
                    onClick={() => {
                        if (activePage === pages) return;
                        changePage(activePage + 1);
                    }}
                    disabled={activePage === pages}
                >
                    {nextText}
                </button>
            </div>
        </div>
    );
};

export default Pagination;
