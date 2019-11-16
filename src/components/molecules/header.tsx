import * as React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import HeaderTitle from '../atoms/headerTitle';
import '../../../node_modules/dark-mode-toggle';

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => {
  React.useEffect(() => {
    if (!document) return;

    const toggle = document.querySelector('dark-mode-toggle');
    if (!toggle) return;

    const { body } = document;

    if (toggle.mode === 'dark') {
      body.classList.add('dark');
      body.classList.remove('light');
    } else {
      body.classList.add('light');
      body.classList.remove('dark');
    }

    toggle.addEventListener('colorschemechange', () => {
      body.classList.toggle('dark', toggle.mode === 'dark');
      body.classList.toggle('light', toggle.mode === 'light');
    });
  }, []);

  return (
    <HeaderContainer>
      <StyledLink to="/">
        <HeaderTitle title={title} />
      </StyledLink>
      <ToggleWrapper
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
            <dark-mode-toggle
              id="dark-mode-toggle-1"
              appearance="toggle"
            />`,
        }}
      />
    </HeaderContainer>
  );
};
export default Header;

const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 30px 25px 10px 25px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
`;
const ToggleWrapper = styled.div`
  box-sizing: border-box;
  padding: 0 25px;
`;
