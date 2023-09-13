import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    sizes: {
      main: {
        width: {
          mobile: string;
          desktop: string;
        };
      };

      modal: {
        height: {
          mobile: string;
          desktop: string;
        };
      };
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    sizes: {
      main: {
        width: {
          mobile?: string;
          desktop?: string;
        };
      };
      modal: {
        height: {
          mobile?: string;
          desktop?: string;
        };
      };
    };
  }
}

const theme = createTheme({
  sizes: {
    main: {
      width: {
        mobile: "100%",
        desktop: "500px",
      },
    },

    modal: {
      height: {
        mobile: "300px",
        desktop: "300px",
      },
    },
  },
  palette: {
    primary: {
      main: "#006400",
    },
  },
});

export default theme;
