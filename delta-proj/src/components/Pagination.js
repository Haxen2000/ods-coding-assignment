import React from 'react';
const Pagination = (props) => {
    const currentPage = props.currentPage;
    const changePage = props.changePage;
    const totalPages = props.totalPages;
    const pages = props.pages;
    return (totalPages > 1 &&
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
            <li className={`page-item ${1 === currentPage ? `disabled` : ''}`}>
                <a className="page-link" href="#" onClick={(e) => changePage(currentPage - 1)}>Previous</a>
            </li>
            {pages.map(i => 
                <li className={`page-item ${i === currentPage ? `active` : ''}`}>
                <a className="page-link" href="#" onClick={(e) => changePage(parseInt(e.target.innerHTML))}>{i}</a>
                </li>
            )}
            <li className={`page-item ${currentPage === totalPages ? `disabled` : ''}`}>
                <a className="page-link" href="#" onClick={(e) => changePage(currentPage + 1)}>Next</a>
            </li>
            </ul>
        </nav>
)};

export default Pagination;