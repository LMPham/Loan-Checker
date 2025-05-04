import { Container } from 'react-bootstrap';
import { PageTitleWrapper } from './styles';

function Tool() {
  return (
    <Container fluid className="p-0 mb-5">
      <PageTitleWrapper className="py-2 px-3 my-3">
        Loan Default Predictor Tool
      </PageTitleWrapper>
    </Container>
  );
}

export default Tool;
