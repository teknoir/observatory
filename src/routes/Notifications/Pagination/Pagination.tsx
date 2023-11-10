import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import APP_URLS from 'enums/urls';

interface PaginationComponentProps {
  page: number;
  count: number;
}

const PaginationComponent = ({ page, count }: PaginationComponentProps) => {
  return (
    <Pagination
      page={page}
      count={count}
      color="secondary"
      sx={{
        '& .MuiPagination-ul': {
          justifyContent: 'center',
        },
      }}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`${APP_URLS.notifications}${
            item.page === 1 ? '' : `?page=${item.page}`
          }`}
          sx={{
            '& .MuiButtonBase-root.MuiPaginationItem-root.Mui-selected ': {
              borderRadius: 0,
              backgroundColor: 'red',
            },
          }}
          {...item}
        />
      )}
    />
  );
};

export default PaginationComponent;
