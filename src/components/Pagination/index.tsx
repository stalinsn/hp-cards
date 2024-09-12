import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];

    // Sempre mostra a primeira página
    pages.push(1);

    // Adiciona as páginas de duas para trás da atual, caso existam
    for (let i = Math.max(2, currentPage - 2); i < currentPage; i++) {
      pages.push(i);
    }

    // Adiciona a página atual
    if (currentPage > 1 && currentPage < totalPages) {
      pages.push(currentPage);
    }

    // Adiciona as páginas de duas para frente da atual, caso existam
    for (let i = currentPage + 1; i <= Math.min(totalPages - 1, currentPage + 2); i++) {
      pages.push(i);
    }

    // Sempre mostra a última página
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    // Remove duplicatas (caso a lógica adicione páginas repetidas)
    return Array.from(new Set(pages));
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number' && page !== currentPage) {
      onPageChange(page);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination">
  {/* Botão "Anterior" */}
  <button
    className="previous"
    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
    disabled={currentPage === 1}
  >
    Anterior
  </button>

  {/* Números de páginas */}
  {pageNumbers.map((page, index) => (
    <button
      key={index}
      onClick={() => handlePageClick(page)}
      className={page === currentPage ? 'active' : ''}
      disabled={typeof page === 'string'}
    >
      {page}
    </button>
  ))}

  {/* Botão "Próximo" */}
  <button
    className="next"
    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
    disabled={currentPage === totalPages}
  >
    Próximo
  </button>
</div>

  );
};

export default Pagination;
