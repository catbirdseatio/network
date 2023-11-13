import React from 'react'

import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';

export default function Body({ sidebar, children }) {
  return (
    <Container fluid>
      <Stack direction="horizontal" className="Body">
        <Container fluid className="Content">
          {children}
        </Container>
      </Stack>
    </Container>
  );
}