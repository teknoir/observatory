import Typography from '@mui/material/Typography';
import Button from "muiComponents/Button/Button";
import Select from "muiComponents/Select/Select";
import Box from "./Box";
import Buttons from "./Buttons";
import Menu from "./Menu";
import SelectMUI from "./Select";
import Tabs  from "./Tabs";
import Dialog  from "./Dialog";
import TypographyComponent  from "./Typography";

const DarkTheme = () => {
  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Dark Theme
      </Typography>

      <Typography variant="h4" gutterBottom>
        src/muiComponents
      </Typography>

      <Box>
        <Typography variant="h6" gutterBottom>
          Buttons
        </Typography>
        <Button onClick={() => {}}>
          Text
        </Button>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Select
        </Typography>
        <Select
          label="Select"
          value={10}
          options={[
            { value: 10, label: "Ten" },
            { value: 20, label: "Twenty" },
          ]}
          onChange={() => {}}
        />
      </Box>

      <Typography variant="h4" gutterBottom>
        @mui/material
      </Typography>

      <Box>
        <Typography variant="h6" gutterBottom>
          Buttons
        </Typography>
        <Buttons />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Menu
        </Typography>
        <Menu />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Select
        </Typography>
        <SelectMUI />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Tabs
        </Typography>
        <Tabs />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Dialog
        </Typography>
        <Dialog />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Typography
        </Typography>
        <TypographyComponent />
      </Box>

      {/*<Box>*/}
      {/*  <Typography variant="h6" gutterBottom>*/}
      {/*    PersistentDrawerLeft*/}
      {/*  </Typography>*/}
      {/*  <PersistentDrawerLeft />*/}
      {/*</Box>*/}
    </div>
  )
}

export default DarkTheme
