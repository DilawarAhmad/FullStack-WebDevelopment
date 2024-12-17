import React from 'react';

function FormContainer({ children }) {
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}

export default FormContainer;



{/*import { Grid, Container } from "@mui/material";

function FormContainer({ children }) {
  return (
    <Container>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
}

export default FormContainer;*/}
