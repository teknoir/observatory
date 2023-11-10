import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import styleVariables from 'enums/styleVariables.module.scss';

interface PaginationComponentProps {
  page: number;
  count: number;
  baseUrl: string;
}

const PaginationComponent = ({
  page,
  count,
  baseUrl,
}: PaginationComponentProps) => {
  return (
    <Pagination
      page={page}
      count={count}
      sx={{
        '& .MuiPagination-ul': {
          justifyContent: 'center',
        },
        '& ul > li:not(:first-child):not(:last-child) > .MuiButtonBase-root.MuiPaginationItem-root':
          {
            border: `1px solid ${styleVariables.white}`,
            borderRadius: 0,
          },
      }}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`${baseUrl}${item.page === 1 ? '' : `?page=${item.page}`}`}
          sx={{
            '&.MuiButtonBase-root.MuiPaginationItem-root.Mui-selected': {
              borderRadius: 0,
              backgroundColor: styleVariables.blue600,
              border: 'none!important',
            },
          }}
          {...item}
        />
      )}
    />
  );
};

export default PaginationComponent;
