import { GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const SearchToolbar = () => {
  return (
    <Box className="flex items-center gap-4 text-base m-2">
      <label htmlFor="">Fin kod üzrə axtar:</label>
      <GridToolbarQuickFilter />
    </Box>
  );
};

export default SearchToolbar;
